"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"

export function SiteFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  if (isAdminRoute) {
    return <div className="min-h-screen">{children}</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
