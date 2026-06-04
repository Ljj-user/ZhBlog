"use client"

import { useDeferredValue, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { PostPreviewCard, SectionHeader, SurfaceCard } from "@/components/site/cards"
import type { PostMeta } from "@/lib/posts"

export function PostsPageClient({
  posts,
  categories,
  tags,
}: {
  posts: PostMeta[]
  categories: string[]
  tags: string[]
}) {
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const deferredQuery = useDeferredValue(query.trim().toLowerCase())

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      post.title.toLowerCase().includes(deferredQuery) ||
      post.description.toLowerCase().includes(deferredQuery) ||
      post.aiQuote?.toLowerCase().includes(deferredQuery)

    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)

    return matchesQuery && matchesCategory && matchesTag
  })

  return (
    <>
      <SurfaceCard className="p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="WRITING NOTES"
          title="文章"
          description={`这里收纳技术、学习和生活观察，现在一共 ${posts.length} 篇。支持按标题、摘要、标签和分类慢慢筛出你想读的内容。`}
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <label className="block">
            <span className="mb-2 block text-sm text-slate-500 dark:text-stone-400">站内搜索</span>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white/72 px-4 py-3 dark:border-zinc-800 dark:bg-white/[0.04]">
              <Search className="h-4 w-4 text-stone-400 dark:text-stone-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索标题、摘要或 AI 导读金句"
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-stone-400 dark:text-stone-200 dark:placeholder:text-stone-500"
              />
            </div>
          </label>

          <div className="text-sm text-slate-500 dark:text-stone-400">
            当前结果 <span className="font-medium text-slate-900 dark:text-stone-100">{filteredPosts.length}</span> / {posts.length}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="mb-2 text-sm text-slate-500 dark:text-stone-400">分类</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={
                  selectedCategory === null
                    ? "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                    : "rounded-full border border-zinc-100 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-zinc-800 dark:bg-white/[0.04] dark:text-stone-400"
                }
              >
                全部
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory((current) => (current === category ? null : category))}
                  className={
                    selectedCategory === category
                      ? "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                      : "rounded-full border border-zinc-100 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-zinc-800 dark:bg-white/[0.04] dark:text-stone-400"
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-500 dark:text-stone-400">标签</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className={
                  selectedTag === null
                    ? "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                    : "rounded-full border border-zinc-100 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-zinc-800 dark:bg-white/[0.04] dark:text-stone-400"
                }
              >
                全部标签
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag((current) => (current === tag ? null : tag))}
                  className={
                    selectedTag === tag
                      ? "rounded-full bg-[#17211d] px-3 py-1 text-xs tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                      : "rounded-full border border-zinc-100 bg-white/72 px-3 py-1 text-xs tracking-[0.12em] text-stone-500 dark:border-zinc-800 dark:bg-white/[0.04] dark:text-stone-400"
                  }
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </SurfaceCard>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostPreviewCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <SurfaceCard className="p-8 text-center">
          <p className="text-lg text-slate-900 dark:text-stone-100">没找到符合条件的文章</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-stone-400">可以试试换个关键词，或者取消当前的分类 / 标签筛选。</p>
        </SurfaceCard>
      )}

      <div className="text-center text-sm text-slate-400 dark:text-slate-500">
        <Link href="/archive" className="transition-colors hover:text-slate-700 dark:hover:text-slate-300">
          想按时间线浏览的话，可以直接去归档页。
        </Link>
      </div>
    </>
  )
}
