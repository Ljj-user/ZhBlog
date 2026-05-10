"use client"

import { useActionState } from "react"
import { saveProjectsHero } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { ProjectsContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function ProjectsHeroEditor({ projects }: { projects: ProjectsContent }) {
  const [state, formAction] = useActionState(saveProjectsHero, initialState)

  return (
    <AdminSectionCard title="页面头部" description="维护项目页的眉标题、主标题和说明文案。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>眉标题</span>
            <input name="eyebrow" defaultValue={projects.hero.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>主标题</span>
            <input name="title" defaultValue={projects.hero.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>说明文案</span>
          <textarea name="description" defaultValue={projects.hero.description} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存页面头部" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
