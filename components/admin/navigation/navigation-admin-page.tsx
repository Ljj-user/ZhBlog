import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { NavigationMenuEditor } from "@/components/admin/navigation/navigation-menu-editor"
import { SocialLinksEditor } from "@/components/admin/navigation/social-links-editor"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getNavigationItems, getSocialItems } from "@/lib/content"

export function NavigationAdminPage() {
  const navigationItems = getNavigationItems()
  const socialItems = getSocialItems()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="NAVIGATION & SOCIAL"
        title="导航与社媒"
        description="导航菜单和社媒入口已经接入真实保存。两个区域分别维护各自的局部状态，互不影响。"
      />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <NavigationMenuEditor items={navigationItems} />
          <SocialLinksEditor items={socialItems} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="这一页会分别写入两个内容文件，保持导航结构与社媒入口独立。">
            <AdminFileList files={["content/site/navigation.json", "content/site/social-links.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="快速确认主导航和社媒入口的数量。">
            <AdminMetricGrid
              items={[
                { label: "NAV ITEMS", value: navigationItems.length },
                { label: "SOCIAL LINKS", value: socialItems.length },
                { label: "FILES", value: 2 },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
