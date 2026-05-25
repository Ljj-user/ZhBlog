import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const projectRoot = process.cwd()
const defaultPostOutputDir = path.join(projectRoot, "content", "posts")
const defaultImageOutputDir = path.join(projectRoot, "public", "images", "posts")
const configPath = path.join(projectRoot, "obsidian-sync.config.json")

async function main() {
  const config = await readConfig()
  const notesRoot = path.resolve(config.vaultPath, config.notesDir)
  const attachmentsRoot = config.attachmentsDir
    ? path.resolve(config.vaultPath, config.attachmentsDir)
    : notesRoot
  const postOutputDir = config.postOutputDir && path.isAbsolute(config.postOutputDir)
    ? config.postOutputDir
    : path.resolve(projectRoot, config.postOutputDir ?? defaultPostOutputDir)
  const imageOutputDir = config.imageOutputDir && path.isAbsolute(config.imageOutputDir)
    ? config.imageOutputDir
    : path.resolve(projectRoot, config.imageOutputDir ?? defaultImageOutputDir)
  const cleanImages = config.cleanImages ?? true

  const notePaths = await findMarkdownFiles(notesRoot)
  const publishedNotes = (
    await Promise.all(notePaths.map((notePath) => loadPublishNote(notePath)))
  ).filter((note) => note !== null)

  const slugToPost = new Map(publishedNotes.map((note) => [note.slug, note]))

  await fs.mkdir(postOutputDir, { recursive: true })
  await fs.mkdir(imageOutputDir, { recursive: true })

  for (const note of publishedNotes) {
    const postImageDir = path.join(imageOutputDir, note.slug)
    if (cleanImages) {
      await fs.rm(postImageDir, { recursive: true, force: true })
    }
    await fs.mkdir(postImageDir, { recursive: true })

    const transformed = await transformBody({
      note,
      slugToPost,
      attachmentsRoot,
      postImageDir,
    })

    const fileContent = matter.stringify(transformed.content.trimEnd(), {
      title: note.frontmatter.title,
      description: note.frontmatter.description,
      date: note.frontmatter.date,
      category: note.frontmatter.category,
      tags: note.frontmatter.tags,
      draft: note.frontmatter.draft,
      ...(note.frontmatter.coverImage ? { coverImage: note.frontmatter.coverImage } : {}),
    })

    const outputPath = path.join(postOutputDir, `${note.slug}.mdx`)
    await fs.writeFile(outputPath, `${fileContent}\n`, "utf8")
  }

  console.log(`Synced ${publishedNotes.length} published note(s) from Obsidian.`)
}

async function readConfig() {
  const raw = await fs.readFile(configPath, "utf8")
  return JSON.parse(raw)
}

async function findMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        return findMarkdownFiles(fullPath)
      }
      if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
        return [fullPath]
      }
      return []
    }),
  )

  return results.flat()
}

async function loadPublishNote(filePath) {
  const raw = await fs.readFile(filePath, "utf8")
  const frontmatterBlock = readFrontmatterBlock(raw)

  if (!frontmatterBlock) {
    return null
  }

  let parsed
  try {
    parsed = matter(raw)
  } catch (error) {
    throw new Error(`Failed to parse frontmatter in "${filePath}": ${error instanceof Error ? error.message : String(error)}`)
  }

  const { data, content } = parsed

  if (!data.publish) {
    return null
  }

  const slug = normalizeSlug(data.slug || data.title || path.basename(filePath, path.extname(filePath)))
  if (!slug) {
    throw new Error(`Unable to derive slug for ${filePath}`)
  }

  return {
    sourcePath: filePath,
    slug,
    frontmatter: {
      title: String(data.title || slug),
      description: String(data.description || ""),
      date: String(data.date || new Date().toISOString().slice(0, 10)),
      category: String(data.category || "未分类"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      draft: Boolean(data.draft),
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
    },
    body: content,
  }
}

function readFrontmatterBlock(raw) {
  if (!raw.startsWith("---")) {
    return null
  }

  const lines = raw.split(/\r?\n/)
  if (lines.length < 3) {
    return null
  }

  const endIndex = lines.slice(1).findIndex((line) => line.trim() === "---")
  if (endIndex === -1) {
    return null
  }

  return lines.slice(1, endIndex + 1).join("\n")
}

async function transformBody({ note, slugToPost, attachmentsRoot, postImageDir }) {
  let content = stripPrivateBlocks(note.body)
  content = await replaceEmbedImages(content, { note, attachmentsRoot, postImageDir })
  content = replaceWikiLinks(content, slugToPost)
  return { content }
}

function stripPrivateBlocks(content) {
  return content.replace(/%%\s*private\s*%%[\s\S]*?%%\s*endprivate\s*%%/gi, "").trim()
}

async function replaceEmbedImages(content, { note, attachmentsRoot, postImageDir }) {
  const matches = Array.from(content.matchAll(/!\[\[([^[\]]+)\]\]/g))
  let nextContent = content

  for (const match of matches) {
    const original = match[0]
    const target = match[1].split("|")[0].trim()
    const sourcePath = await resolveAttachmentPath(target, note.sourcePath, attachmentsRoot)

    if (!sourcePath) {
      continue
    }

    const fileName = path.basename(sourcePath)
    const destinationPath = path.join(postImageDir, fileName)
    await fs.copyFile(sourcePath, destinationPath)

    const publicSrc = `/images/posts/${note.slug}/${fileName}`
    const altText = path.parse(fileName).name
    nextContent = nextContent.replace(original, `![${altText}](${publicSrc})`)
  }

  return nextContent
}

async function resolveAttachmentPath(target, notePath, attachmentsRoot) {
  const directCandidate = path.resolve(path.dirname(notePath), target)
  if (await exists(directCandidate)) {
    return directCandidate
  }

  const vaultCandidate = path.resolve(attachmentsRoot, target)
  if (await exists(vaultCandidate)) {
    return vaultCandidate
  }

  return findByFileName(attachmentsRoot, path.basename(target))
}

async function findByFileName(dir, fileName) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await findByFileName(fullPath, fileName)
      if (nested) {
        return nested
      }
    } else if (entry.isFile() && entry.name === fileName) {
      return fullPath
    }
  }

  return null
}

function replaceWikiLinks(content, slugToPost) {
  return content.replace(/\[\[([^[\]]+)\]\]/g, (_, rawTarget) => {
    const [targetPart, aliasPart] = rawTarget.split("|")
    const target = targetPart.trim()
    const alias = aliasPart?.trim()
    const normalized = normalizeSlug(target)
    const linkedPost = slugToPost.get(normalized)
    const label = alias || target

    if (!linkedPost) {
      return label
    }

    return `[${label}](/posts/${linkedPost.slug})`
  })
}

function normalizeSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function exists(targetPath) {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

main().catch((error) => {
  console.error("Obsidian sync failed.")
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
