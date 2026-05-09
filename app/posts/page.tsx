import Link from "next/link"
import type { Metadata } from "next"
import { Calendar, Tag } from "lucide-react"
import { getAllPosts, getAllCategories } from "@/lib/posts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "文章",
  description: "技术教程、学习笔记、生活随想与阶段性记录。",
}

export default function PostsPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm tracking-[0.28em] text-slate-400 dark:text-slate-500">WRITING NOTES</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-[2.2rem] dark:text-slate-100">
              文章
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              技术教程、学习笔记、生活随想，共 {posts.length} 篇文章。这里更适合一篇篇浏览、按主题进入阅读。
            </p>
          </div>

          <Link
            href="/archive"
            className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-sm text-slate-600 transition-colors hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
          >
            查看时间归档
          </Link>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            全部
          </Badge>
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="rounded-full px-3 py-1">
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
              <Card className="h-full rounded-[1.6rem] border border-slate-200/80 bg-white/78 transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/15">
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant={index % 3 === 1 ? "default" : "secondary"}>{post.category}</Badge>
                    <span className="flex items-center text-slate-400 dark:text-slate-500">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="mt-4 text-xl leading-8 text-slate-800 transition-colors group-hover:text-slate-950 dark:text-slate-100 dark:group-hover:text-white">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3 text-sm leading-7 text-slate-500 dark:text-slate-400">
                    {post.description}
                  </CardDescription>
                  {post.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <Tag className="h-3.5 w-3.5" />
                      {post.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
