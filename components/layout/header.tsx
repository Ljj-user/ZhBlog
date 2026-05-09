"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/posts" },
  { name: "归档", href: "/archive" },
  { name: "照片", href: "/photos" },
  { name: "项目", href: "/projects" },
  { name: "友链", href: "/friends" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "top-0 z-50 w-full",
        isHome
          ? "absolute left-0 right-0"
          : "sticky border-b border-black/10 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-black/20",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10",
          isHome ? "max-w-[1440px] py-5" : "h-16 max-w-[1400px]",
        )}
      >
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "transition-colors",
              isHome
                ? "font-display text-3xl leading-none tracking-[0.02em] text-black dark:text-white"
                : "font-display text-xl tracking-[0.06em] text-foreground",
            )}
          >
            ZH_Blog
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  isHome
                    ? "rounded-full px-4 py-2 text-[0.78rem] tracking-[0.16em] transition-all hover:bg-black/5 dark:hover:bg-white/10"
                    : "rounded-full px-3 py-2 text-[0.72rem] tracking-[0.18em] transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                  pathname === item.href
                    ? "text-foreground"
                    : isHome
                      ? "text-black/58 dark:text-white/62"
                      : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className={cn(
              "hidden rounded-full transition-colors sm:inline-flex",
              isHome
                ? "border border-black/15 bg-white/72 px-5 py-2.5 text-[0.78rem] tracking-[0.16em] text-black backdrop-blur-md hover:bg-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/16"
                : "border border-black/15 px-4 py-2 text-[0.72rem] tracking-[0.18em] hover:bg-black hover:text-white dark:border-white/15 dark:hover:bg-white dark:hover:text-black",
            )}
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

      {mobileMenuOpen && (
        <div
          className={cn(
            "px-4 py-3 backdrop-blur-xl md:hidden",
            isHome
              ? "mx-4 rounded-3xl border border-black/10 bg-white/88 shadow-[0_20px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-black/70"
              : "border-t border-black/10 bg-white/90 dark:border-white/10 dark:bg-black/50",
          )}
        >
          <div className="grid gap-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
