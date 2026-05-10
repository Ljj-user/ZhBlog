import { DashboardPage } from "@/components/admin/dashboard/dashboard-page"
import { getAdminChecklist, getAdminRecentChanges, getAdminStats } from "@/lib/admin-content"

export default function AdminDashboardRoute() {
  const stats = getAdminStats()
  const checklist = getAdminChecklist()
  const recentChanges = getAdminRecentChanges()

  return <DashboardPage stats={stats} checklist={checklist} recentChanges={recentChanges} />
}
