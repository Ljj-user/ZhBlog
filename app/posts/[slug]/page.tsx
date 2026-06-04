import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react"
import { MDXContent } from "@/components/mdx-content"
import { PageCanvas, PostPreviewCard, SurfaceCard } from "@/components/site/cards"
import { Badge } from "@/components/ui/badge"
import { getAdjacentPosts, getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts"

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

function AdjacentPostCard({
  label,
  href,
  title,
  description,
  align = "left",
}: {
  label: string
  href: string
  title: string
  description: string
  align?: "left" | "right"
}) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-zinc-100 bg-[#fbfaf6]/78 p-5 transition-all hover:-translate-y-1 hover:border-stone-300 hover:bg-white dark:border-zinc-800 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
    >
      <div className={`flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500 ${align === "right" ? "justify-end" : ""}`}>
        {align === "left" ? <ArrowLeft className="h-3.5 w-3.5" /> : null}
        <span>{label}</span>
        {align === "right" ? <ArrowRight className="h-3.5 w-3.5" /> : null}
      </div>
      <h3 className={`mt-4 text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100 ${align === "right" ? "text-right" : ""}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-7 text-slate-500 dark:text-stone-400 ${align === "right" ? "text-right" : ""}`}>{description}</p>
    </Link>
  )
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { previous, next } = getAdjacentPosts(slug)
  const relatedPosts = getRelatedPosts(slug, 3)

  return (
    <PageCanvas className="max-w-[980px]">
      <SurfaceCard className="p-6 sm:p-8 lg:p-10">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-white/78 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-white dark:border-zinc-800 dark:bg-white/[0.04] dark:text-stone-200 dark:hover:bg-white/[0.08]"
        >
          <ArrowLeft className="h-4 w-4" />
          返回文章列表
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-3.5 w-3.5" />
              {post.date}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-stone-100">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </header>

        <hr className="my-8 border-stone-200 dark:border-zinc-800" />

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent content={post.content} />
        </div>
      </SurfaceCard>

      {previous || next ? (
        <section className="space-y-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">POST FLOW</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">上一篇 / 下一篇</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {previous ? (
              <AdjacentPostCard
                label="上一篇"
                href={`/posts/${previous.slug}`}
                title={previous.title}
                description={previous.description || previous.aiQuote || "继续回看上一段记录。"}
              />
            ) : (
              <div />
            )}
            {next ? (
              <AdjacentPostCard
                label="下一篇"
                href={`/posts/${next.slug}`}
                title={next.title}
                description={next.description || next.aiQuote || "继续读下一篇内容。"}
                align="right"
              />
            ) : null}
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="space-y-4">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">RELATED NOTES</p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">相关文章推荐</h2>
          </div>
          <div className="grid gap-4">
            {relatedPosts.map((relatedPost) => (
              <PostPreviewCard key={relatedPost.slug} post={relatedPost} compact />
            ))}
          </div>
        </section>
      ) : null}
    </PageCanvas>
  )
}
