import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { MDXContent } from "@/components/mdx-content"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "文章未找到" }
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 返回按钮 */}
      <Button variant="ghost" size="sm" className="mb-8" asChild>
        <Link href="/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回文章列表
        </Link>
      </Button>

      {/* 文章头部 */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-3.5 w-3.5" />
            {post.date}
          </span>
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground">{post.description}</p>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* 分隔线 */}
      <hr className="mb-8" />

      {/* 文章内容 */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXContent content={post.content} />
      </div>
    </article>
  )
}
