import Link from "next/link"
import type { Metadata } from "next"
import { getAllCategories, getAllPosts } from "@/lib/posts"
import { PillLink, PostPreviewCard, SectionHeader, SurfaceCard } from "@/components/site/cards"

export const metadata: Metadata = {
  title: "文章",
  description: "技术教程、学习笔记、生活观察与阶段记录。",
}

export default function PostsPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow="WRITING NOTES"
            title="文章"
            description={`这里收纳技术、学习和生活观察，现在一共 ${posts.length} 篇。适合按主题进入，再慢慢往下读。`}
            action={<PillLink href="/archive">查看时间归档</PillLink>}
          />

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs tracking-[0.16em] text-white dark:bg-white dark:text-slate-900">
              全部
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-slate-200 bg-white/75 px-3 py-1 text-xs tracking-[0.12em] text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
              >
                {category}
              </span>
            ))}
          </div>
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
      </div>
    </section>
  )
}
