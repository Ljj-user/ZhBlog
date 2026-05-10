import { HomeDesignMediaEditor } from "@/components/admin/home/home-design-media-editor"
import { HomeHeroEditor } from "@/components/admin/home/home-hero-editor"
import { HomeNoticeCardEditor } from "@/components/admin/home/home-notice-card-editor"
import { HomeNowCardEditor } from "@/components/admin/home/home-now-card-editor"
import { HomePlayerEditor } from "@/components/admin/home/home-player-editor"
import { HomeQuickLinksEditor } from "@/components/admin/home/home-quick-links-editor"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getHomeContent } from "@/lib/content"

export function HomeAdminPage() {
  const home = getHomeContent()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="HOME CONTENT"
        title="首页内容"
        description="这个页面负责首页区块的独立维护，每个区块单独保存，只写入 home.json。"
      />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <HomeHeroEditor home={home} />
          <HomeQuickLinksEditor home={home} />
          <HomeNowCardEditor home={home} />
          <HomeNoticeCardEditor home={home} />
          <HomeDesignMediaEditor home={home} />
          <HomePlayerEditor home={home} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="首页内容当前只写入 content/site/home.json，不和其他内容域混写。">
            <AdminFileList files={["content/site/home.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="这里快速确认首页内容规模，方便后面继续迭代前台编排。">
            <AdminMetricGrid
              items={[
                { label: "QUICK LINKS", value: home.quickLinks.length },
                { label: "NOW ITEMS", value: home.nowCard.items.length },
                { label: "NOTICE ITEMS", value: home.noticeCard.items.length },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
