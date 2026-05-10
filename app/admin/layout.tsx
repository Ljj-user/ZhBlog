import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { AdminShell } from "@/components/admin/layout/admin-shell"
import { isAdminEnabled } from "@/lib/admin-access"

export default function AdminLayout({ children }: { children: ReactNode }) {
  if (!isAdminEnabled()) {
    notFound()
  }

  return <AdminShell>{children}</AdminShell>
}
