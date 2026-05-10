import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { ProfileBasicForm } from "@/components/admin/profile/profile-basic-form"
import { ProfileContactForm } from "@/components/admin/profile/profile-contact-form"
import { ProfileTagsEditor } from "@/components/admin/profile/profile-tags-editor"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getSiteProfile } from "@/lib/content"

export function ProfileAdminPage() {
  const profile = getSiteProfile()

  return (
    <div className="space-y-4">
      <AdminPageHeader eyebrow="SITE PROFILE" title="站点资料" description="这里维护站点资料的真实保存链路，并按独立区块组织，而不是整页一个大表单。" />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <ProfileBasicForm profile={profile} />
          <ProfileContactForm profile={profile} />
          <ProfileTagsEditor profile={profile} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="当前页面只管理站点资料相关内容，保存时只写这一份内容文件。">
            <AdminFileList files={["content/site/profile.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="快速确认资料体量，避免改动时丢掉标签和聚焦信息。">
            <AdminMetricGrid
              items={[
                { label: "PROFILE TAGS", value: profile.profileTags.length },
                { label: "ABOUT TAGS", value: profile.aboutTags.length },
                { label: "FOCUS AREAS", value: profile.focusAreas.length },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
