"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { adminNavItems, getCurrentAdminNavItem, isAdminNavActive } from "@/lib/admin-nav"
import { cn } from "@/lib/utils"

export function AdminMobileNav() {
  const pathname = usePathname()
  const currentItem = getCurrentAdminNavItem(pathname)

  return (
    <div className="lg:hidden">
      <div className="rounded-[1.35rem] border border-black/10 bg-white/84 p-3 shadow-[0_14px_36px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05]">
        <div className="mb-3">
          <p className="text-[0.68rem] tracking-[0.24em] text-slate-400 dark:text-slate-500">CURRENT SECTION</p>
          <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{currentItem.label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{currentItem.description}</p>
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {adminNavItems.map((item) => {
            const active = isAdminNavActive(pathname, item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-slate-900 bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] dark:border-white dark:bg-white dark:text-slate-900"
                    : "border-black/10 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
