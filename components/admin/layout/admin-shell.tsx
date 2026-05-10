import type { ReactNode } from "react"
import { AdminContentLayout } from "@/components/admin/layout/admin-content-layout"
import { AdminSidebar } from "@/components/admin/layout/admin-sidebar"
import { AdminTopbar } from "@/components/admin/layout/admin-topbar"

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1880px] gap-4 px-4 pb-8 pt-4 sm:px-6 lg:px-8 2xl:px-10">
      <AdminSidebar />
      <div className="min-w-0 flex-1">
        <AdminTopbar />
        <AdminContentLayout>{children}</AdminContentLayout>
      </div>
    </div>
  )
}
