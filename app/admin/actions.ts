"use server"

import { revalidatePath } from "next/cache"
import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import {
  albumItemsSchema,
  designMediaSchema,
  exchangeCardSchema,
  friendsHeroSchema,
  friendsLinksSchema,
  githubProfileSchema,
  homeHeroSchema,
  navigationItemsSchema,
  nowCardSchema,
  noticeCardSchema,
  photoItemsSchema,
  playerSchema,
  profileBasicSchema,
  profileContactSchema,
  profileExperienceSchema,
  profileTagsSchema,
  projectItemsSchema,
  projectListHeadingSchema,
  projectsHeroSchema,
  quickLinksSchema,
  socialLinksSchema,
  type AdminActionState,
} from "@/lib/admin-content-schemas"
import { assertAdminEnabled } from "@/lib/admin-access"
import { getFriendsContent, getHomeContent, getPhotoAlbums, getProjectsContent, getSiteProfile } from "@/lib/content"
import { getPostBySlugForAdmin, getPostsDirectory } from "@/lib/posts"

const profileFilePath = path.join(process.cwd(), "content", "site", "profile.json")
const homeFilePath = path.join(process.cwd(), "content", "site", "home.json")
const navigationFilePath = path.join(process.cwd(), "content", "site", "navigation.json")
const socialLinksFilePath = path.join(process.cwd(), "content", "site", "social-links.json")
const friendsFilePath = path.join(process.cwd(), "content", "site", "friends.json")
const projectsFilePath = path.join(process.cwd(), "content", "site", "projects.json")
const albumsFilePath = path.join(process.cwd(), "content", "photos", "albums.json")
const photosFilePath = path.join(process.cwd(), "content", "photos", "photos.json")

function parseLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseQuickLinks(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, description, href] = line.split("|").map((item) => item.trim())
      return { label: label ?? "", description: description ?? "", href: href ?? "" }
    })
}

function parseLinkItems(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, href] = line.split("|").map((item) => item.trim())
      return { name: name ?? "", href: href ?? "" }
    })
}

function parseFriendLinks(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, url, tag, description] = line.split("|").map((item) => item.trim())
      return { name: name ?? "", url: url ?? "", tag: tag ?? "", description: description ?? "" }
    })
}

function parseProjectItems(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [slug, title, href, tags, featured, description, pain, result, lesson, developmentVibe] = line
        .split("|")
        .map((item) => item.trim())

      return {
        slug: slug ?? "",
        title: title ?? "",
        href: href ?? "",
        tags:
          tags?.split(",")
            .map((item) => item.trim())
            .filter(Boolean) ?? [],
        featured: parseBoolean(featured ?? ""),
        description: description ?? "",
        pain: pain ?? "",
        result: result ?? "",
        lesson: lesson ?? "",
        developmentVibe: developmentVibe ?? "",
      }
    })
}

function parseExperienceItems(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [period, title, org, description] = line.split("|").map((item) => item.trim())
      return {
        period: period ?? "",
        title: title ?? "",
        org: org ?? "",
        description: description ?? "",
      }
    })
}

function parseAlbumItems(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [id, name, description] = line.split("|").map((item) => item.trim())
      return { id: id ?? "", name: name ?? "", description: description ?? "" }
    })
}

function parseBoolean(value: string) {
  const normalized = value.trim().toLowerCase()
  return normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "y"
}

function parseInteger(value: string) {
  return Number.parseInt(value.trim(), 10)
}

function parseTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parsePhotoItems(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [
        id,
        src,
        alt,
        width,
        height,
        albumId,
        date,
        category,
        featured,
        sortOrder,
        tags,
        caption,
        location,
        exifCamera,
        exifFocalLength,
        exifAperture,
        exifShutterSpeed,
        exifIso,
      ] = line.split("|").map((item) => item.trim())

      return {
        id: id ?? "",
        src: src ?? "",
        alt: alt ?? "",
        width: parseInteger(width ?? ""),
        height: parseInteger(height ?? ""),
        albumId: albumId ?? "",
        date: date ?? "",
        category: category ?? "",
        featured: parseBoolean(featured ?? ""),
        sortOrder: parseInteger(sortOrder ?? ""),
        tags:
          tags?.split(",")
            .map((item) => item.trim())
            .filter(Boolean) ?? [],
        caption: caption ?? "",
        location: location ?? "",
        exifCamera: exifCamera ?? "",
        exifFocalLength: exifFocalLength ?? "",
        exifAperture: exifAperture ?? "",
        exifShutterSpeed: exifShutterSpeed ?? "",
        exifIso: exifIso ?? "",
      }
    })
}

async function writeJsonFile(filePath: string, nextValue: unknown) {
  assertAdminEnabled()
  await fs.writeFile(filePath, `${JSON.stringify(nextValue, null, 2)}\n`, "utf8")
}

function success(message: string): AdminActionState {
  return { ok: true, message }
}

function failure(message: string): AdminActionState {
  return { ok: false, message }
}

function revalidateSiteLayout() {
  revalidatePath("/", "layout")
}

function revalidatePhotoSurfaces() {
  revalidatePath("/")
  revalidatePath("/photos")
  revalidatePath("/admin/albums")
  revalidatePath("/admin/photos")
}

function validatePhotoAlbumReferences(albumIds: string[], photoAlbumIds: string[]) {
  const validAlbumIds = new Set(albumIds)
  const missingAlbumIds = Array.from(new Set(photoAlbumIds.filter((albumId) => !validAlbumIds.has(albumId))))

  if (missingAlbumIds.length > 0) {
    return failure(`Unknown album id: ${missingAlbumIds.join(", ")}`)
  }

  return null
}

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

async function ensurePostsDirectory() {
  await fs.mkdir(getPostsDirectory(), { recursive: true })
}

async function writePostFile(input: {
  slug: string
  title: string
  description: string
  aiQuote: string
  date: string
  category: string
  tags: string[]
  draft: boolean
  content: string
}) {
  assertAdminEnabled()
  await ensurePostsDirectory()

  const filePath = path.join(getPostsDirectory(), `${input.slug}.mdx`)
  const fileContent = matter.stringify(input.content.trimEnd(), {
    title: input.title,
    description: input.description,
    aiQuote: input.aiQuote,
    date: input.date,
    category: input.category,
    tags: input.tags,
    draft: input.draft,
  })

  await fs.writeFile(filePath, `${fileContent}\n`, "utf8")
}

export async function saveProfileBasic(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = profileBasicSchema.safeParse({
    siteTitle: formData.get("siteTitle"),
    name: formData.get("name"),
    role: formData.get("role"),
    avatar: formData.get("avatar"),
    coverImage: formData.get("coverImage"),
    bio: formData.get("bio"),
    location: formData.get("location"),
    aboutLocation: formData.get("aboutLocation"),
    focusSummary: formData.get("focusSummary"),
    availabilityLabel: formData.get("availabilityLabel"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save profile basics")

  const profile = getSiteProfile()
  await writeJsonFile(profileFilePath, { ...profile, ...parsed.data })
  revalidateSiteLayout()
  revalidatePath("/about")
  revalidatePath("/admin/profile")
  return success("Profile basics saved")
}

export async function saveProfileContact(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = profileContactSchema.safeParse({
    email: formData.get("email"),
    intro: formData.get("intro"),
    summary: formData.get("summary"),
    contactCopy: formData.get("contactCopy"),
    homeSidebarEmailLabel: formData.get("homeSidebarEmailLabel"),
    homeSidebarEmailDescription: formData.get("homeSidebarEmailDescription"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save contact content")

  const profile = getSiteProfile()
  await writeJsonFile(profileFilePath, { ...profile, ...parsed.data })
  revalidateSiteLayout()
  revalidatePath("/about")
  revalidatePath("/admin/profile")
  return success("Contact content saved")
}

export async function saveProfileTags(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = profileTagsSchema.safeParse({
    profileTags: parseLines(String(formData.get("profileTags") ?? "")),
    aboutTags: parseLines(String(formData.get("aboutTags") ?? "")),
    focusAreas: parseLines(String(formData.get("focusAreas") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save tags")

  const profile = getSiteProfile()
  await writeJsonFile(profileFilePath, { ...profile, ...parsed.data })
  revalidateSiteLayout()
  revalidatePath("/about")
  revalidatePath("/admin/profile")
  return success("Tags saved")
}

export async function saveProfileExperience(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = profileExperienceSchema.safeParse({
    experience: parseExperienceItems(String(formData.get("experience") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save experience")

  const profile = getSiteProfile()
  await writeJsonFile(profileFilePath, { ...profile, experience: parsed.data.experience })
  revalidatePath("/about")
  revalidatePath("/admin/profile")
  return success("Experience saved")
}

export async function saveHomeHero(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = homeHeroSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    titleLine1: formData.get("titleLine1"),
    titleLine2: formData.get("titleLine2"),
    description: formData.get("description"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save hero")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, hero: parsed.data })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Hero saved")
}

export async function saveHomeQuickLinks(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = quickLinksSchema.safeParse({
    quickLinks: parseQuickLinks(String(formData.get("quickLinks") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save quick links")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, quickLinks: parsed.data.quickLinks })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Quick links saved")
}

export async function saveHomeNowCard(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = nowCardSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    items: parseLines(String(formData.get("items") ?? "")),
    updatedAt: formData.get("updatedAt"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save now card")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, nowCard: parsed.data })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Now card saved")
}

export async function saveHomeNoticeCard(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = noticeCardSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    items: parseLines(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save notice card")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, noticeCard: parsed.data })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Notice card saved")
}

export async function saveHomeDesignMedia(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = designMediaSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    description: formData.get("description"),
    backgroundImage: formData.get("backgroundImage"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save design media")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, designMedia: parsed.data })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Design media saved")
}

export async function saveHomePlayer(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = playerSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save player")

  const home = getHomeContent()
  await writeJsonFile(homeFilePath, { ...home, player: parsed.data })
  revalidatePath("/")
  revalidatePath("/admin/home")
  return success("Player saved")
}

export async function saveNavigationItems(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = navigationItemsSchema.safeParse({
    items: parseLinkItems(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save navigation items")

  await writeJsonFile(navigationFilePath, { items: parsed.data.items })
  revalidateSiteLayout()
  revalidatePath("/admin/navigation")
  return success("Navigation items saved")
}

export async function saveSocialLinks(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = socialLinksSchema.safeParse({
    items: parseLinkItems(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save social links")

  await writeJsonFile(socialLinksFilePath, { items: parsed.data.items })
  revalidateSiteLayout()
  revalidatePath("/admin/navigation")
  return success("Social links saved")
}

export async function saveFriendsHero(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = friendsHeroSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    description: formData.get("description"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save friends hero")

  const friends = getFriendsContent()
  await writeJsonFile(friendsFilePath, { ...friends, hero: parsed.data })
  revalidatePath("/friends")
  revalidatePath("/admin/friends")
  return success("Friends hero saved")
}

export async function saveFriendsPreferenceCard(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = noticeCardSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    items: parseLines(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save preference card")

  const friends = getFriendsContent()
  await writeJsonFile(friendsFilePath, { ...friends, preferenceCard: parsed.data })
  revalidatePath("/friends")
  revalidatePath("/admin/friends")
  return success("Preference card saved")
}

export async function saveFriendsExchangeCard(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = exchangeCardSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    ctaLabel: formData.get("ctaLabel"),
    ctaHref: formData.get("ctaHref"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save exchange card")

  const friends = getFriendsContent()
  await writeJsonFile(friendsFilePath, { ...friends, exchangeCard: parsed.data })
  revalidatePath("/friends")
  revalidatePath("/admin/friends")
  return success("Exchange card saved")
}

export async function saveFriendsLinks(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = friendsLinksSchema.safeParse({
    items: parseFriendLinks(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save friend links")

  const friends = getFriendsContent()
  await writeJsonFile(friendsFilePath, { ...friends, items: parsed.data.items })
  revalidatePath("/friends")
  revalidatePath("/admin/friends")
  return success("Friend links saved")
}

export async function saveProjectsGithubProfile(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = githubProfileSchema.safeParse({
    username: formData.get("username"),
    url: formData.get("url"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save GitHub profile")

  const projects = getProjectsContent()
  await writeJsonFile(projectsFilePath, { ...projects, githubProfile: parsed.data })
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return success("GitHub profile saved")
}

export async function saveProjectsHero(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = projectsHeroSchema.safeParse({
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    description: formData.get("description"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save projects hero")

  const projects = getProjectsContent()
  await writeJsonFile(projectsFilePath, { ...projects, hero: parsed.data })
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return success("Projects hero saved")
}

export async function saveProjectsListHeading(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = projectListHeadingSchema.safeParse({
    listHeading: formData.get("listHeading"),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save list heading")

  const projects = getProjectsContent()
  await writeJsonFile(projectsFilePath, { ...projects, listHeading: parsed.data.listHeading })
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return success("List heading saved")
}

export async function saveProjectItems(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = projectItemsSchema.safeParse({
    items: parseProjectItems(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save project items")

  const projects = getProjectsContent()
  await writeJsonFile(projectsFilePath, { ...projects, items: parsed.data.items })
  revalidatePath("/projects")
  revalidatePath("/admin/projects")
  return success("Project items saved")
}

export async function saveAlbumItems(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = albumItemsSchema.safeParse({
    items: parseAlbumItems(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save albums")

  const currentPhotoAlbumIds = JSON.parse(await fs.readFile(photosFilePath, "utf8")).items.map((photo: { albumId: string }) => photo.albumId)
  const photoAlbumValidation = validatePhotoAlbumReferences(
    parsed.data.items.map((album) => album.id),
    currentPhotoAlbumIds,
  )
  if (photoAlbumValidation) return photoAlbumValidation

  await writeJsonFile(albumsFilePath, { items: parsed.data.items })
  revalidatePhotoSurfaces()
  return success("Albums saved")
}

export async function savePhotoItems(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  const parsed = photoItemsSchema.safeParse({
    items: parsePhotoItems(String(formData.get("items") ?? "")),
  })

  if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? "Failed to save photos")

  const photoAlbumValidation = validatePhotoAlbumReferences(
    getPhotoAlbums().map((album) => album.id),
    parsed.data.items.map((photo) => photo.albumId),
  )
  if (photoAlbumValidation) return photoAlbumValidation

  await writeJsonFile(photosFilePath, { items: parsed.data.items })
  revalidatePhotoSurfaces()
  return success("Photos saved")
}

export async function savePostDraft(_: AdminActionState, formData: FormData): Promise<AdminActionState> {
  assertAdminEnabled()

  const originalSlug = String(formData.get("originalSlug") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  const slug = normalizeSlug(slugInput)
  const title = String(formData.get("title") ?? "").trim()
  const description = String(formData.get("description") ?? "").trim()
  const aiQuote = String(formData.get("aiQuote") ?? "").trim()
  const date = String(formData.get("date") ?? "").trim()
  const category = String(formData.get("category") ?? "").trim()
  const tags = parseTags(String(formData.get("tags") ?? ""))
  const content = String(formData.get("content") ?? "")
  const draft = String(formData.get("draft") ?? "") === "on"

  if (!slug) return failure("Slug is required")
  if (!title) return failure("Title is required")
  if (!date) return failure("Date is required")
  if (!category) return failure("Category is required")
  if (!content.trim()) return failure("Content is required")

  const existingPost = getPostBySlugForAdmin(slug)
  if (existingPost && originalSlug !== slug) {
    return failure("Slug already exists")
  }

  await writePostFile({
    slug,
    title,
    description,
    aiQuote,
    date,
    category,
    tags,
    draft,
    content,
  })

  if (originalSlug && originalSlug !== slug) {
    const oldPath = path.join(getPostsDirectory(), `${originalSlug}.mdx`)
    try {
      await fs.unlink(oldPath)
    } catch {}
  }

  revalidatePath("/posts")
  revalidatePath(`/posts/${slug}`)
  revalidatePath("/archive")
  revalidatePath("/admin/posts")
  revalidatePath(`/admin/posts/${slug}`)
  return success("Post saved")
}
