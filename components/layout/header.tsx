"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { navigationItems } from "@/components/site/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-[1.9rem] border border-black/10 bg-white/76 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-black/24 sm:px-5">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="font-display text-2xl leading-none tracking-[0.04em] text-slate-900 dark:text-white">
            ZH_Blog
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navigationItems.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-[0.78rem] tracking-[0.16em] transition-all",
                    active
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-500 hover:bg-black/5 hover:text-slate-900 dark:text-white/62 dark:hover:bg-white/10 dark:hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className="hidden rounded-full border border-black/12 bg-white/80 px-5 py-2.5 text-[0.78rem] tracking-[0.16em] text-slate-800 transition-colors hover:bg-white sm:inline-flex dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/16"
          >
            关于我
          </Link>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="打开菜单"
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen ? (
        <div className="mx-auto mt-3 max-w-[1400px] rounded-[1.7rem] border border-black/10 bg-white/88 px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-black/70 md:hidden">
          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                  pathname === item.href ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-600 dark:text-slate-300",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
