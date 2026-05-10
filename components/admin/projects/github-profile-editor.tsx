"use client"

import { useActionState } from "react"
import { saveProjectsGithubProfile } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { ProjectsContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function GithubProfileEditor({ projects }: { projects: ProjectsContent }) {
  const [state, formAction] = useActionState(saveProjectsGithubProfile, initialState)

  return (
    <AdminSectionCard title="GitHub 资料" description="这里维护项目页顶部使用的 GitHub 用户信息。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>用户名</span>
            <input name="username" defaultValue={projects.githubProfile.username} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>资料链接</span>
            <input name="url" defaultValue={projects.githubProfile.url} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存 GitHub 资料" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
