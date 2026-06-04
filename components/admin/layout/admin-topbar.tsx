"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight } from "lucide-react"
import { AdminMobileNav } from "@/components/admin/layout/admin-mobile-nav"
import { AdminStatusBadge } from "@/components/admin/shared/admin-status-badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { getCurrentAdminNavItem } from "@/lib/admin-nav"

export function AdminTopbar() {
  const pathname = usePathname()
  const currentItem = getCurrentAdminNavItem(pathname)

  return (
    <div className="mb-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.7rem] border border-black/10 bg-white/72 px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex items-center gap-3">
          <AdminStatusBadge label="Live Save" tone="green" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            当前所在：<span className="font-medium text-slate-700 dark:text-slate-200">{currentItem.label}</span>。Profile、Home、Navigation、Friends、Projects、Albums、Photos 已支持独立保存。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/86 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
          >
            查看前台
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <AdminMobileNav />
    </div>
  )
}
