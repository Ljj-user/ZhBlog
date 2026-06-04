import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export interface PostMeta {
  slug: string
  title: string
  description: string
  aiQuote?: string
  date: string
  category: string
  tags: string[]
  coverImage?: string
  draft?: boolean
}

export interface Post extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), "content", "posts")

function normalizeDate(value: unknown): string {
  if (!value) {
    return new Date().toISOString().split("T")[0]
  }

  const date = value instanceof Date ? value : new Date(String(value))
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString().split("T")[0]
  }

  if (typeof value === "string") {
    const match = value.match(/(\d{4})-(\d{2})-(\d{2})/)
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`
    }
  }

  return new Date().toISOString().split("T")[0]
}

function parsePostFile(fileName: string): PostMeta {
  const slug = fileName.replace(/\.mdx?$/, "")
  const fullPath = path.join(postsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    aiQuote: data.aiQuote || data.description || data.title || slug,
    date: normalizeDate(data.date),
    category: data.category || "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage,
    draft: Boolean(data.draft),
  }
}

function getRealPosts(options?: { includeDrafts?: boolean }) {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName)
      const stats = fs.statSync(fullPath)
      return {
        post: parsePostFile(fileName),
        modifiedTime: stats.mtimeMs,
      }
    })

  const visiblePosts = options?.includeDrafts ? allPosts : allPosts.filter(({ post }) => !post.draft)

  return visiblePosts
    .sort((a, b) => {
      const dateDiff = new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      if (dateDiff !== 0) return dateDiff
      return b.modifiedTime - a.modifiedTime
    })
    .map(({ post }) => post)
}

export function getPostsDirectory() {
  return postsDirectory
}

export function getAllPosts(): PostMeta[] {
  const realPosts = getRealPosts()
  return realPosts.length > 0 ? realPosts : getSamplePosts()
}

export function getAllPostsForAdmin(): PostMeta[] {
  return getRealPosts({ includeDrafts: true })
}

function readPostFile(fullPath: string, slug: string): Post {
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    aiQuote: data.aiQuote || data.description || data.title || slug,
    date: normalizeDate(data.date),
    category: data.category || "未分类",
    tags: Array.isArray(data.tags) ? data.tags : [],
    coverImage: data.coverImage,
    draft: Boolean(data.draft),
    content,
  }
}

export function getPostBySlug(slug: string, options?: { includeDrafts?: boolean }): Post | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const mdPath = path.join(postsDirectory, `${slug}.md`)

  let fullPath = ""
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    if (!fs.existsSync(postsDirectory)) {
      const samplePost = getSamplePostsWithContent().find((post) => post.slug === slug)
      return samplePost ?? null
    }

    return null
  }

  const post = readPostFile(fullPath, slug)
  if (post.draft && !options?.includeDrafts) {
    return null
  }

  return post
}

export function getPostBySlugForAdmin(slug: string): Post | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const mdPath = path.join(postsDirectory, `${slug}.md`)

  let fullPath = ""
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  return readPostFile(fullPath, slug)
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map((post) => post.category))
  return Array.from(categories).sort((a, b) => a.localeCompare(b, "zh-CN"))
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set(allPosts.flatMap((post) => post.tags))
  return Array.from(tags).sort((a, b) => a.localeCompare(b, "zh-CN"))
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const allPosts = getAllPosts()
  const currentPost = allPosts.find((post) => post.slug === slug)
  if (!currentPost) return []

  return allPosts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
    })
    .slice(0, limit)
    .map(({ post }) => post)
}

export function getAdjacentPosts(slug: string): { previous: PostMeta | null; next: PostMeta | null } {
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((post) => post.slug === slug)

  if (currentIndex === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: allPosts[currentIndex + 1] ?? null,
    next: allPosts[currentIndex - 1] ?? null,
  }
}

function getSamplePosts(): PostMeta[] {
  return [
    {
      slug: "getting-started-with-nextjs",
      title: "Next.js 入门指南",
      description: "从零开始学习 Next.js，包含路由、数据获取、服务端渲染等核心概念。",
      aiQuote: "把脚手架跑通只是起点，真正的门槛是理解页面为什么会更快抵达用户。",
      date: "2024-01-15",
      category: "技术教程",
      tags: ["Next.js", "React", "前端"],
    },
    {
      slug: "my-2024-goals",
      title: "2024 年度计划与展望",
      description: "新的一年，新的开始。记录一下我的年度目标和想要实现的事情。",
      aiQuote: "计划不是许愿单，而是给一年后的自己留下一条可追踪的路线。",
      date: "2024-01-10",
      category: "生活随想",
      tags: ["年度总结", "个人成长"],
    },
    {
      slug: "vscode-productivity-tips",
      title: "VS Code 提效技巧分享",
      description: "分享一些我常用的 VS Code 快捷键和插件，帮助提升开发效率。",
      aiQuote: "效率感往往不是更忙，而是把重复动作一点点消音。",
      date: "2024-01-05",
      category: "软件教程",
      tags: ["VS Code", "效率", "工具"],
    },
    {
      slug: "learning-typescript",
      title: "TypeScript 学习笔记",
      description: "记录学习 TypeScript 过程中的心得体会和常用技巧。",
      aiQuote: "类型系统像护栏，刚开始嫌麻烦，后来才发现它在替你挡掉很多弯路。",
      date: "2024-01-01",
      category: "学习笔记",
      tags: ["TypeScript", "前端", "编程"],
    },
    {
      slug: "weekend-trip",
      title: "周末郊游记",
      description: "记录一次愉快的周末郊游，感受大自然的美好。",
      aiQuote: "有些恢复不是停下来，而是离城市远一点、离自己近一点。",
      date: "2023-12-28",
      category: "生活随想",
      tags: ["生活", "旅行"],
    },
  ]
}

function getSamplePostsWithContent(): Post[] {
  return [
    {
      slug: "getting-started-with-nextjs",
      title: "Next.js 入门指南",
      description: "从零开始学习 Next.js，包含路由、数据获取、服务端渲染等核心概念。",
      aiQuote: "把脚手架跑通只是起点，真正的门槛是理解页面为什么会更快抵达用户。",
      date: "2024-01-15",
      category: "技术教程",
      tags: ["Next.js", "React", "前端"],
      content: `
## 什么是 Next.js？
Next.js 是一个基于 React 的全栈框架，它提供了许多开箱即用的功能：

- **文件系统路由** - 基于文件结构自动生成路由
- **服务端渲染（SSR）** - 提升首屏加载速度和 SEO
- **静态站点生成（SSG）** - 预渲染页面以获得最佳性能
- **API 路由** - 轻松创建后端 API

## 快速开始

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`
`,
    },
    {
      slug: "my-2024-goals",
      title: "2024 年度计划与展望",
      description: "新的一年，新的开始。记录一下我的年度目标和想要实现的事情。",
      aiQuote: "计划不是许愿单，而是给一年后的自己留下一条可追踪的路线。",
      date: "2024-01-10",
      category: "生活随想",
      tags: ["年度总结", "个人成长"],
      content: `
## 技术成长

- 深入学习 Next.js 与 React Server Components
- 探索 AI 和大语言模型相关技术
- 为开源项目贡献代码
`,
    },
    {
      slug: "vscode-productivity-tips",
      title: "VS Code 提效技巧分享",
      description: "分享一些我常用的 VS Code 快捷键和插件，帮助提升开发效率。",
      aiQuote: "效率感往往不是更忙，而是把重复动作一点点消音。",
      date: "2024-01-05",
      category: "软件教程",
      tags: ["VS Code", "效率", "工具"],
      content: `
## 必备快捷键

- \`Cmd/Ctrl + P\`：快速打开文件
- \`Cmd/Ctrl + Shift + P\`：命令面板
`,
    },
    {
      slug: "learning-typescript",
      title: "TypeScript 学习笔记",
      description: "记录学习 TypeScript 过程中的心得体会和常用技巧。",
      aiQuote: "类型系统像护栏，刚开始嫌麻烦，后来才发现它在替你挡掉很多弯路。",
      date: "2024-01-01",
      category: "学习笔记",
      tags: ["TypeScript", "前端", "编程"],
      content: `
## 基础类型

\`\`\`ts
let name: string = "张三"
let age: number = 25
\`\`\`
`,
    },
    {
      slug: "weekend-trip",
      title: "周末郊游记",
      description: "记录一次愉快的周末郊游，感受大自然的美好。",
      aiQuote: "有些恢复不是停下来，而是离城市远一点、离自己近一点。",
      date: "2023-12-28",
      category: "生活随想",
      tags: ["生活", "旅行"],
      content: `
周末和朋友们一起去了郊外，远离城市喧嚣，感受大自然的宁静。
`,
    },
  ]
}
