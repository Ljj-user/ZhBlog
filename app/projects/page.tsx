import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export const metadata = {
  title: "项目",
  description: "个人项目与作品展示",
}

// 示例项目数据
const projects = [
  {
    slug: "personal-blog",
    title: "个人博客",
    description: "使用 Next.js + MDX 搭建的个人博客网站，支持文章管理、照片展示、项目介绍等功能。采用现代化技术栈，具有良好的性能和用户体验。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    slug: "task-manager",
    title: "任务管理工具",
    description: "简洁高效的任务管理应用，支持任务分类、优先级设置、截止日期提醒等功能。帮助用户更好地规划和跟踪日常任务。",
    tags: ["React", "Node.js", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: true,
  },
  {
    slug: "weather-app",
    title: "天气预报应用",
    description: "基于天气 API 的天气预报应用，支持实时天气查询、未来七天预报、空气质量指数等功能。",
    tags: ["Vue.js", "TypeScript", "Weather API"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
    github: "https://github.com",
    featured: false,
  },
  {
    slug: "markdown-editor",
    title: "Markdown 编辑器",
    description: "一个在线 Markdown 编辑器，支持实时预览、语法高亮、导出 PDF 等功能。",
    tags: ["React", "CodeMirror", "Markdown"],
    image: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
  {
    slug: "cli-tool",
    title: "命令行工具集",
    description: "一套实用的命令行工具，包括文件批量重命名、图片压缩、JSON 格式化等常用功能。",
    tags: ["Node.js", "Commander", "CLI"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    github: "https://github.com",
    featured: false,
  },
  {
    slug: "portfolio-template",
    title: "作品集模板",
    description: "一个简洁美观的作品集网站模板，适合设计师和开发者展示个人作品。",
    tags: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    github: "https://github.com",
    demo: "https://demo.com",
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">项目</h1>
        <p className="text-muted-foreground">
          个人项目与作品展示，共 {projects.length} 个项目
        </p>
      </div>

      {/* 精选项目 */}
      {featuredProjects.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-xl font-semibold">精选项目</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          源码
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button size="sm" asChild>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          演示
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 其他项目 */}
      {otherProjects.length > 0 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold">更多项目</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <Card key={project.slug} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-3 line-clamp-2 text-sm">
                    {project.description}
                  </CardDescription>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          <span className="sr-only">GitHub</span>
                        </Link>
                      </Button>
                    )}
                    {project.demo && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">演示</span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
