import Link from "next/link"
import type { Metadata } from "next"
import { getAllCategories, getAllPosts, getPostsByCategory } from "@/lib/posts"
import { PageCanvas, PillLink, PostPreviewCard, SectionHeader, SurfaceCard } from "@/components/site/cards"

export const metadata: Metadata = {
  title: "文章",
  description: "技术教程、学习笔记、生活观察与阶段记录。",
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const params = await searchParams
  const category = typeof params?.category === "string" ? params.category.trim() : undefined
  const posts = category ? getPostsByCategory(category) : getAllPosts()
  const categories = getAllCategories()

  return (
    <PageCanvas>
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow="WRITING NOTES"
            title="文章"
            description={`这里收纳技术、学习和生活观察，现在一共 ${posts.length} 篇。适合按主题进入，再慢慢往下读。`}
            action={<PillLink href="/archive">查看时间归档</PillLink>}
          />

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/posts"
              className={
                category
                  ? "rounded-full border border-stone-200 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
                  : "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
              }
            >
              全部
            </Link>
            {categories.map((item) => {
              const isActive = item === category
              return (
                <Link
                  key={item}
                  href={`/posts?category=${encodeURIComponent(item)}`}
                  className={
                    isActive
                      ? "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                      : "rounded-full border border-stone-200 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
                  }
                >
                  {item}
                </Link>
              )
            })}
          </div>
          {category && posts.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
              当前分类「{category}」暂无文章，试试其它分类或返回 <Link href="/posts" className="underline">全部</Link>。
            </div>
          ) : null}
        </SurfaceCard>

        <div className="grid gap-5 xl:grid-cols-2">
          {posts.map((post) => (
            <PostPreviewCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="text-center text-sm text-slate-400 dark:text-slate-500">
          <Link href="/archive" className="transition-colors hover:text-slate-700 dark:hover:text-slate-300">
            想按时间线浏览的话，可以直接去归档页。
          </Link>
        </div>
    </PageCanvas>
  )
}
