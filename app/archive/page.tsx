import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import { PageCanvas } from "@/components/site/cards"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "归档",
  description: "按时间整理的写作归档与成长记录。",
}

function parseDate(dateString: string): Date | null {
  const date = new Date(dateString)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatMonthDay(dateString: string) {
  const date = parseDate(dateString)

  if (!date) {
    return dateString.slice(5).replace("-", "-")
  }

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}-${day}`
}

export default function ArchivePage() {
  const posts = getAllPosts()

  const groupedPosts = posts.reduce<Record<string, typeof posts>>((groups, post) => {
    const parsed = parseDate(post.date)
    const year = parsed ? String(parsed.getFullYear()) : post.date.match(/\d{4}/)?.[0] ?? post.date.slice(0, 4)
    groups[year] ??= []
    groups[year].push(post)
    return groups
  }, {})

  Object.values(groupedPosts).forEach((group) =>
    group.sort((a, b) => {
      const aDate = parseDate(a.date)?.getTime() ?? 0
      const bDate = parseDate(b.date)?.getTime() ?? 0
      return bDate - aDate
    }),
  )

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  return (
    <PageCanvas>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[1.65rem] border border-stone-200/80 bg-[#fbfaf6]/88 shadow-[0_18px_55px_rgba(47,55,48,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#141816]/88 dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <header className="mb-10 sm:mb-12">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">ARCHIVE LOG</p>
              <h1 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-900 sm:text-[2.1rem] dark:text-stone-100">
                共计 {posts.length} 篇文章
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                把写下来的内容按时间排开，像翻一册日志，能直接看到那段时间我在学什么、想什么、记录了什么。
              </p>
              <p className="mt-5 inline-flex rounded-full border border-stone-200 bg-white/62 px-4 py-2 font-mono text-[0.68rem] tracking-[0.2em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400">
                坚持是最好的天赋
              </p>
            </header>

            <div className="space-y-10 sm:space-y-12">
              {years.map((year) => (
                <section key={year}>
                  <h2 className="font-display text-2xl font-medium tracking-[-0.04em] text-slate-900 dark:text-stone-100">{year}</h2>
                  <ul className="mt-5 space-y-1">
                    {groupedPosts[year].map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/posts/${post.slug}`}
                          className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 rounded-[1rem] border border-transparent px-3 py-3 transition-all duration-200 hover:border-stone-200 hover:bg-white/70 hover:pl-4 dark:hover:border-white/10 dark:hover:bg-white/[0.05]"
                        >
                          <span className="font-mono text-sm tracking-[0.08em] text-slate-400 dark:text-slate-500">
                            {formatMonthDay(post.date)}
                          </span>
                          <span className="text-base text-slate-600 transition-colors duration-200 group-hover:text-slate-900 dark:text-stone-300 dark:group-hover:text-white">
                            {post.title}
                          </span>
                          <ChevronRight className="h-4 w-4 -translate-x-1 text-slate-300 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:text-slate-600" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageCanvas>
  )
}
