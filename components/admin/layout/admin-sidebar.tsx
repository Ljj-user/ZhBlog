"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { House, ImageIcon, LayoutDashboard, Link2, NotebookTabs, PanelsTopLeft, ScrollText, UserRound } from "lucide-react"
import { adminNavItems, isAdminNavActive } from "@/lib/admin-nav"
import { cn } from "@/lib/utils"

const iconMap = {
  "/admin": LayoutDashboard,
  "/admin/profile": UserRound,
  "/admin/home": House,
  "/admin/navigation": PanelsTopLeft,
  "/admin/friends": Link2,
  "/admin/projects": NotebookTabs,
  "/admin/albums": ScrollText,
  "/admin/photos": ImageIcon,
  "/admin/posts": ScrollText,
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-[280px] shrink-0 overflow-hidden rounded-[2rem] border border-black/10 bg-white/72 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] lg:block">
      <div className="flex h-full flex-col">
        <div className="rounded-[1.5rem] border border-black/8 bg-[linear-gradient(135deg,rgba(255,247,239,0.96),rgba(237,245,248,0.92))] p-4 dark:border-white/8 dark:bg-[linear-gradient(135deg,rgba(109,82,63,0.14),rgba(64,90,103,0.14))]">
          <p className="text-[0.72rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">CONTENT ADMIN</p>
          <h2 className="mt-3 font-display text-2xl tracking-[-0.04em] text-slate-900 dark:text-white">内容后台</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">内容域独立维护、独立保存，前台只负责读取与渲染，方便后续平滑升级数据层。</p>
        </div>

        <nav className="mt-4 flex-1 space-y-1.5 overflow-y-auto pr-1">
          {adminNavItems.map((item) => {
            const active = isAdminNavActive(pathname, item.href)
            const Icon = iconMap[item.href as keyof typeof iconMap]

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative block overflow-hidden rounded-[1.35rem] border px-4 py-3 transition-all",
                  active
                    ? "border-slate-900 bg-slate-900 text-white shadow-[0_14px_34px_rgba(15,23,42,0.24)] dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-transparent bg-transparent text-slate-600 hover:border-black/8 hover:bg-white/70 dark:text-slate-300 dark:hover:border-white/10 dark:hover:bg-white/[0.06]",
                )}
              >
                <span
                  className={cn(
                    "absolute inset-y-3 left-0 w-1 rounded-r-full transition-colors",
                    active ? "bg-amber-300 dark:bg-slate-900" : "bg-transparent",
                  )}
                />
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 rounded-full p-2",
                      active ? "bg-white/16 text-white dark:bg-slate-900/10 dark:text-slate-900" : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className={cn("mt-1 text-xs leading-5", active ? "text-white/70 dark:text-slate-700" : "text-slate-500 dark:text-slate-400")}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
