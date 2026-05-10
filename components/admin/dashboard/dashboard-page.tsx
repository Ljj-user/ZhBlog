import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { ContentChecklist } from "@/components/admin/dashboard/content-checklist"
import { ContentEntryGrid } from "@/components/admin/dashboard/content-entry-grid"
import { ContentStatsCards } from "@/components/admin/dashboard/content-stats-cards"
import { RecentChangesPanel } from "@/components/admin/dashboard/recent-changes-panel"
import { getAdminSections, type AdminChecklistItem, type AdminStat } from "@/lib/admin-content"

export function DashboardPage({
  stats,
  checklist,
  recentChanges,
}: {
  stats: AdminStat[]
  checklist: AdminChecklistItem[]
  recentChanges: string[]
}) {
  const sections = getAdminSections()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="ADMIN DASHBOARD"
        title="内容管理台"
        description="这一版先完成后台骨架、内容域入口和页面边界，后续逐步接上真实保存、局部状态和文件写入。"
      />
      <ContentStatsCards stats={stats} />
      <ContentEntryGrid sections={sections} />
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <ContentChecklist items={checklist} />
        <RecentChangesPanel items={recentChanges} />
      </div>
    </div>
  )
}
