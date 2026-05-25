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
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between rounded-[1.35rem] border border-stone-200/80 bg-[#fbfaf6]/84 px-4 py-3 shadow-[0_14px_38px_rgba(47,55,48,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#141816]/82 sm:px-5">
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="font-display text-2xl leading-none tracking-[0.04em] text-slate-900 dark:text-stone-100">
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
                    "rounded-full border border-transparent px-4 py-2 text-[0.78rem] tracking-[0.16em] transition-all",
                    active
                      ? "border-stone-200 bg-white/72 text-slate-900 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white"
                      : "text-stone-500 hover:bg-white/58 hover:text-slate-900 dark:text-white/62 dark:hover:bg-white/10 dark:hover:text-white",
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
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
        <div className="mx-auto mt-3 max-w-[1400px] rounded-[1.25rem] border border-stone-200/80 bg-[#fbfaf6]/90 px-4 py-3 shadow-[0_18px_45px_rgba(47,55,48,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#141816]/92 md:hidden">
          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                  pathname === item.href
                    ? "border border-stone-200 bg-white/72 text-slate-900 dark:border-white/10 dark:bg-white/10 dark:text-white"
                    : "text-stone-600 dark:text-stone-300",
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
