import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  coverImage?: string
  draft?: boolean
}

export interface Post extends PostMeta {
  content: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): PostMeta[] {
  // 如果目录不存在，返回示例数据
  if (!fs.existsSync(postsDirectory)) {
    return getSamplePosts()
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        description: data.description || '',
        date: data.date || new Date().toISOString().split('T')[0],
        category: data.category || '未分类',
        tags: data.tags || [],
        coverImage: data.coverImage,
        draft: data.draft || false,
      } as PostMeta
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return allPosts.length > 0 ? allPosts : getSamplePosts()
}

export function getPostBySlug(slug: string): Post | null {
  // 先尝试从示例数据查找
  const samplePosts = getSamplePostsWithContent()
  const samplePost = samplePosts.find((p) => p.slug === slug)
  if (samplePost) return samplePost

  // 再尝试从文件系统读取
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  const mdPath = path.join(postsDirectory, `${slug}.md`)

  let fullPath = ''
  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath
  } else {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || '未分类',
    tags: data.tags || [],
    coverImage: data.coverImage,
    content,
  }
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map((post) => post.category))
  return Array.from(categories)
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set(allPosts.flatMap((post) => post.tags))
  return Array.from(tags)
}

// 示例数据，用于演示
function getSamplePosts(): PostMeta[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Next.js 入门指南',
      description: '从零开始学习 Next.js，包含路由、数据获取、服务端渲染等核心概念。',
      date: '2024-01-15',
      category: '技术教程',
      tags: ['Next.js', 'React', '前端'],
    },
    {
      slug: 'my-2024-goals',
      title: '2024 年度计划与展望',
      description: '新的一年，新的开始。记录一下我的年度目标和想要实现的事情。',
      date: '2024-01-10',
      category: '生活随想',
      tags: ['年度总结', '个人成长'],
    },
    {
      slug: 'vscode-productivity-tips',
      title: 'VS Code 提效技巧分享',
      description: '分享一些我常用的 VS Code 快捷键和插件，帮助提升开发效率。',
      date: '2024-01-05',
      category: '软件教程',
      tags: ['VS Code', '效率', '工具'],
    },
    {
      slug: 'learning-typescript',
      title: 'TypeScript 学习笔记',
      description: '记录学习 TypeScript 过程中的心得体会和常用技巧。',
      date: '2024-01-01',
      category: '学习笔记',
      tags: ['TypeScript', '前端', '编程'],
    },
    {
      slug: 'weekend-trip',
      title: '周末郊游记',
      description: '记录一次愉快的周末郊游，感受大自然的美好。',
      date: '2023-12-28',
      category: '生活随想',
      tags: ['生活', '旅行'],
    },
  ]
}

function getSamplePostsWithContent(): Post[] {
  return [
    {
      slug: 'getting-started-with-nextjs',
      title: 'Next.js 入门指南',
      description: '从零开始学习 Next.js，包含路由、数据获取、服务端渲染等核心概念。',
      date: '2024-01-15',
      category: '技术教程',
      tags: ['Next.js', 'React', '前端'],
      content: `
## 什么是 Next.js？

Next.js 是一个基于 React 的全栈框架，它提供了许多开箱即用的功能：

- **文件系统路由** - 基于文件结构自动生成路由
- **服务端渲染 (SSR)** - 提升首屏加载速度和 SEO
- **静态站点生成 (SSG)** - 预渲染页面以获得最佳性能
- **API 路由** - 轻松创建后端 API

## 快速开始

首先，创建一个新的 Next.js 项目：

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## 页面和路由

在 Next.js 13+ 的 App Router 中，页面是通过 \`app\` 目录下的文件结构来定义的：

\`\`\`
app/
├── page.tsx          # 首页 (/)
├── about/
│   └── page.tsx      # 关于页 (/about)
└── posts/
    ├── page.tsx      # 文章列表 (/posts)
    └── [slug]/
        └── page.tsx  # 文章详情 (/posts/xxx)
\`\`\`

## 数据获取

Next.js 支持多种数据获取方式：

### 服务端组件中直接 fetch

\`\`\`tsx
async function PostList() {
  const posts = await fetch('https://api.example.com/posts')
  return <ul>{posts.map(post => <li>{post.title}</li>)}</ul>
}
\`\`\`

## 总结

Next.js 是一个功能强大且易于使用的框架，非常适合构建现代 Web 应用。希望这篇入门指南能帮助你快速上手！
`,
    },
    {
      slug: 'my-2024-goals',
      title: '2024 年度计划与展望',
      description: '新的一年，新的开始。记录一下我的年度目标和想要实现的事情。',
      date: '2024-01-10',
      category: '生活随想',
      tags: ['年度总结', '个人成长'],
      content: `
新的一年开始了，我想花点时间思考和规划一下接下来的方向。

## 技术成长

- 深入学习 Next.js 和 React Server Components
- 探索 AI 和大语言模型相关技术
- 为开源项目贡献代码

## 个人生活

- 保持运动习惯，每周至少跑步 3 次
- 读完 12 本书
- 学习一门新的乐器

## 写作输出

- 每月至少发布 2 篇技术文章
- 记录更多生活点滴
- 整理并分享学习笔记

希望年末回顾时，能够完成大部分目标。加油！
`,
    },
    {
      slug: 'vscode-productivity-tips',
      title: 'VS Code 提效技巧分享',
      description: '分享一些我常用的 VS Code 快捷键和插件，帮助提升开发效率。',
      date: '2024-01-05',
      category: '软件教程',
      tags: ['VS Code', '效率', '工具'],
      content: `
作为一名开发者，VS Code 是我每天使用最多的工具。这里分享一些提升效率的技巧。

## 必备快捷键

| 快捷键 | 功能 |
|--------|------|
| \`Cmd/Ctrl + P\` | 快速打开文件 |
| \`Cmd/Ctrl + Shift + P\` | 命令面板 |
| \`Cmd/Ctrl + D\` | 选中下一个相同内容 |
| \`Alt + 上/下\` | 移动当前行 |
| \`Cmd/Ctrl + /\` | 注释/取消注释 |

## 推荐插件

1. **GitLens** - 强大的 Git 增强工具
2. **Prettier** - 代码格式化
3. **ESLint** - 代码质量检查
4. **Auto Rename Tag** - 自动重命名配对的标签
5. **Thunder Client** - 轻量级 API 测试工具

## 自定义设置

在 \`settings.json\` 中添加这些配置：

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontSize": 14,
  "editor.lineHeight": 1.6
}
\`\`\`

掌握这些技巧后，你的开发效率一定会有显著提升！
`,
    },
    {
      slug: 'learning-typescript',
      title: 'TypeScript 学习笔记',
      description: '记录学习 TypeScript 过程中的心得体会和常用技巧。',
      date: '2024-01-01',
      category: '学习笔记',
      tags: ['TypeScript', '前端', '编程'],
      content: `
TypeScript 是 JavaScript 的超集，添加了静态类型检查，能帮助我们在编译时发现错误。

## 基础类型

\`\`\`typescript
// 基本类型
let name: string = "张三"
let age: number = 25
let isStudent: boolean = false

// 数组
let numbers: number[] = [1, 2, 3]
let names: Array<string> = ["张三", "李四"]

// 对象
interface User {
  name: string
  age: number
  email?: string // 可选属性
}
\`\`\`

## 常用技巧

### 类型推断

TypeScript 会自动推断类型，不需要处处标注：

\`\`\`typescript
const message = "Hello" // 自动推断为 string
\`\`\`

### 联合类型

\`\`\`typescript
type Status = "pending" | "success" | "error"
\`\`\`

### 泛型

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg
}
\`\`\`

TypeScript 让代码更加健壮，值得投入时间学习！
`,
    },
    {
      slug: 'weekend-trip',
      title: '周末郊游记',
      description: '记录一次愉快的周末郊游，感受大自然的美好。',
      date: '2023-12-28',
      category: '生活随想',
      tags: ['生活', '旅行'],
      content: `
周末和朋友们一起去了郊外，远离城市的喧嚣，感受大自然的宁静。

## 行程安排

早上 7 点出发，经过两个小时的车程，我们到达了目的地——一个风景秀丽的山谷。

## 收获

- 呼吸到了新鲜的空气
- 拍摄了许多美丽的照片
- 和朋友们增进了感情
- 身心得到了放松

## 感想

在繁忙的工作之余，偶尔出去走走真的很有必要。大自然有一种神奇的力量，能让人放下焦虑，重新充满能量。

下次还要再来！
`,
    },
  ]
}
