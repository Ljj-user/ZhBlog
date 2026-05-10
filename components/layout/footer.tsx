import Link from "next/link"
import { socialItems } from "@/components/site/navigation"
import { getSiteProfile } from "@/lib/content"

export function Footer() {
  const profile = getSiteProfile()

  return (
    <footer className="px-4 pb-6 pt-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 rounded-[1.9rem] border border-black/10 bg-white/64 px-5 py-5 text-sm text-slate-500 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {profile.siteTitle}. 记录长期写作、项目和生活切片。</p>
        <div className="flex flex-wrap items-center gap-2">
          {socialItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-full border border-black/10 bg-white/82 px-3 py-1.5 text-xs tracking-[0.14em] text-slate-600 transition-colors hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300 dark:hover:bg-white/[0.1] dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
