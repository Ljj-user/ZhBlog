import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import { getAllPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "归档",
  description: "按时间整理的写作归档与成长记录。",
}

function formatMonthDay(dateString: string) {
  const date = new Date(dateString)

  if (Number.isNaN(date.getTime())) {
    return dateString.slice(5).replace("-", "-")
  }

  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${month}-${day}`
}

export default function ArchivePage() {
  const posts = getAllPosts()

  const groupedPosts = posts.reduce<Record<string, typeof posts>>((groups, post) => {
    const year = post.date.slice(0, 4)
    groups[year] ??= []
    groups[year].push(post)
    return groups
  }, {})

  const years = Object.keys(groupedPosts).sort((a, b) => Number(b) - Number(a))

  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-56 bg-[radial-gradient(circle_at_top,rgba(65,92,125,0.22),transparent_62%)] dark:bg-[radial-gradient(circle_at_top,rgba(110,150,190,0.16),transparent_62%)]" />

      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/65 bg-white/88 shadow-[0_32px_90px_rgba(31,41,55,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/72 dark:shadow-[0_32px_90px_rgba(0,0,0,0.34)]">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
            <header className="mb-10 sm:mb-12">
              <p className="text-sm tracking-[0.28em] text-slate-400 dark:text-slate-500">ARCHIVE LOG</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-700 sm:text-[2.1rem] dark:text-slate-100">
                共计 {posts.length} 篇文章
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                把写下来的内容按时间排开，像翻一册日志，能直接看到那段时间我在学什么、想什么、记录了什么。
              </p>
            </header>

            <div className="space-y-10 sm:space-y-12">
              {years.map((year) => (
                <section key={year}>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-700 dark:text-slate-100">{year}</h2>
                  <ul className="mt-5 space-y-1">
                    {groupedPosts[year].map((post) => (
                      <li key={post.slug}>
                        <Link
                          href={`/posts/${post.slug}`}
                          className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-x-4 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-slate-100/80 hover:pl-4 dark:hover:bg-white/5"
                        >
                          <span className="font-mono text-sm tracking-[0.08em] text-slate-400 dark:text-slate-500">
                            {formatMonthDay(post.date)}
                          </span>
                          <span className="text-base text-slate-600 transition-colors duration-200 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
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
    </section>
  )
}
