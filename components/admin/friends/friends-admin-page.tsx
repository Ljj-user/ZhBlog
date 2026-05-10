import { FriendsExchangeCardEditor } from "@/components/admin/friends/friends-exchange-card-editor"
import { FriendsHeroEditor } from "@/components/admin/friends/friends-hero-editor"
import { FriendsLinksEditor } from "@/components/admin/friends/friends-links-editor"
import { FriendsPreferenceCardEditor } from "@/components/admin/friends/friends-preference-card-editor"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getFriendsContent } from "@/lib/content"

export function FriendsAdminPage() {
  const friends = getFriendsContent()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="FRIENDS"
        title="友链"
        description="友链页已经拆成文案区块与列表区块，各自独立保存。后面你继续优化前端时，不需要再回头改这些数据结构。"
      />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <FriendsHeroEditor friends={friends} />
          <FriendsPreferenceCardEditor friends={friends} />
          <FriendsExchangeCardEditor friends={friends} />
          <FriendsLinksEditor items={friends.items} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="当前友链页所有内容统一来自 friends.json，但编辑器内部按区块拆分保存。">
            <AdminFileList files={["content/site/friends.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="快速看一下友链页的文案和链接规模。">
            <AdminMetricGrid
              items={[
                { label: "FRIEND LINKS", value: friends.items.length },
                { label: "PREFERENCE ITEMS", value: friends.preferenceCard.items.length },
                { label: "CTA", value: 1 },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
