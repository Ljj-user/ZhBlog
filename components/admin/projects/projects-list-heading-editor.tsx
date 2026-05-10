"use client"

import { useActionState } from "react"
import { saveProjectsListHeading } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { ProjectsContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function ProjectsListHeadingEditor({ projects }: { projects: ProjectsContent }) {
  const [state, formAction] = useActionState(saveProjectsListHeading, initialState)

  return (
    <AdminSectionCard title="列表标题" description="独立维护项目卡片列表的区块标题。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>列表标题</span>
          <input name="listHeading" defaultValue={projects.listHeading} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存列表标题" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
