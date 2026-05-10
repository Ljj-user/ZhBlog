import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { GithubProfileEditor } from "@/components/admin/projects/github-profile-editor"
import { ProjectsHeroEditor } from "@/components/admin/projects/projects-hero-editor"
import { ProjectsListEditor } from "@/components/admin/projects/projects-list-editor"
import { ProjectsListHeadingEditor } from "@/components/admin/projects/projects-list-heading-editor"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getProjectsContent } from "@/lib/content"

export function ProjectsAdminPage() {
  const projects = getProjectsContent()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="PROJECTS"
        title="项目"
        description="项目页也已经进入真实保存阶段。GitHub 资料、页面头部、列表标题和项目卡片列表都可以各自独立修改。"
      />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <GithubProfileEditor projects={projects} />
          <ProjectsHeroEditor projects={projects} />
          <ProjectsListHeadingEditor projects={projects} />
          <ProjectsListEditor items={projects.items} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="当前项目页仍统一写入 projects.json，但编辑器按职责拆分，后续迁移到数据库时也更容易映射。">
            <AdminFileList files={["content/site/projects.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="这里快速确认项目页的内容规模。">
            <AdminMetricGrid
              items={[
                { label: "PROJECTS", value: projects.items.length },
                { label: "HERO", value: 1 },
                { label: "GITHUB", value: 1 },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
