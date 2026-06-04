import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import { PageCanvas, SurfaceCard } from "@/components/site/cards"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "归档",
  description: "按时间整理的写作归档与成长记录。",
}

function parseDate(dateString: string): Date | null {
  const date = new Date(dateString)
  return Number.isNaN(date.getTime()) ? null : date
}

function getYear(dateString: string) {
  const date = parseDate(dateString)
  return date ? String(date.getFullYear()) : dateString.match(/\d{4}/)?.[0] ?? dateString.slice(0, 4)
}

function getMonth(dateString: string) {
  const date = parseDate(dateString)
  if (!date) return dateString.slice(5, 7) || "00"
  return String(date.getMonth() + 1).padStart(2, "0")
}

function formatMonthLabel(month: string) {
  return `${Number(month)} 月`
}

function formatMonthDay(dateString: string) {
  const date = parseDate(dateString)

  if (!date) {
    return dateString.slice(5).replace("-", ".")
  }

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}.${day}`
}

export default function ArchivePage() {
  const posts = getAllPosts()

  const groupedPosts = posts.reduce<Record<string, Record<string, typeof posts>>>((groups, post) => {
    const year = getYear(post.date)
    const month = getMonth(post.date)

    groups[year] ??= {}
    groups[year][month] ??= []
    groups[year][month].push(post)

    return groups
  }, {})

  Object.values(groupedPosts).forEach((months) => {
    Object.values(months).forEach((monthPosts) => {
      monthPosts.sort((a, b) => {
        const aDate = parseDate(a.date)?.getTime() ?? 0
        const bDate = parseDate(b.date)?.getTime() ?? 0
        return bDate - aDate
      })
    })
  })

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  return (
    <PageCanvas>
      <div className="mx-auto max-w-5xl space-y-8">
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <header>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">ARCHIVE LOG</p>
            <h1 className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-900 sm:text-[2.1rem] dark:text-stone-100">
              共计 {posts.length} 篇文章
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
              把写下来的内容按时间排开，像翻一册日志。先看到年份，再看到月份，最后落到那一天写下来的标题。
            </p>
          </header>
        </SurfaceCard>

        <div className="space-y-10">
          {years.map((year) => {
            const months = Object.keys(groupedPosts[year]).sort((a, b) => Number(b) - Number(a))

            return (
              <section key={year} className="grid gap-5 lg:grid-cols-[92px_minmax(0,1fr)] lg:gap-8">
                <div className="lg:pt-1">
                  <h2 className="font-display text-3xl font-medium tracking-[-0.05em] text-slate-900 dark:text-stone-100">{year}</h2>
                </div>

                <div className="relative pl-6 sm:pl-8">
                  <div className="absolute bottom-0 left-2 top-0 w-px bg-stone-200 dark:bg-zinc-800 sm:left-3" />

                  <div className="space-y-8">
                    {months.map((month) => (
                      <div key={`${year}-${month}`} className="relative">
                        <div className="absolute left-[-1.1rem] top-2 h-2.5 w-2.5 rounded-full border border-stone-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 sm:left-[-1.45rem]" />

                        <div className="mb-3 flex items-center gap-3">
                          <span className="font-mono text-xs tracking-[0.18em] text-stone-400 dark:text-stone-500">{formatMonthLabel(month)}</span>
                          <span className="h-px flex-1 bg-stone-200/80 dark:bg-zinc-800" />
                        </div>

                        <ul className="space-y-1">
                          {groupedPosts[year][month].map((post) => (
                            <li key={post.slug}>
                              <Link
                                href={`/posts/${post.slug}`}
                                className="group animate-fade-in-up grid gap-1 rounded-xl px-3 py-3 transition-colors hover:bg-white/70 dark:hover:bg-white/[0.05] sm:grid-cols-[4.25rem_minmax(0,1fr)_auto] sm:items-center sm:gap-x-4"
                              >
                                <span className="font-mono text-xs tracking-[0.08em] text-stone-400 dark:text-stone-500">{formatMonthDay(post.date)}</span>
                                <span className="text-sm leading-6 text-slate-700 transition-colors group-hover:text-slate-950 dark:text-stone-300 dark:group-hover:text-white sm:text-base">
                                  {post.title}
                                </span>
                                <ChevronRight className="hidden h-4 w-4 text-slate-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-slate-600 sm:block" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </PageCanvas>
  )
}
