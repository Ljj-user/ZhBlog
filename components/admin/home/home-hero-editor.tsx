"use client"

import { useActionState } from "react"
import { saveHomeHero } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { HomeContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function HomeHeroEditor({ home }: { home: HomeContent }) {
  const [state, formAction] = useActionState(saveHomeHero, initialState)

  return (
    <AdminSectionCard title="Hero 区" description="负责首页 Hero 的眉标题、主标题和描述。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>眉标题</span>
            <input name="eyebrow" defaultValue={home.hero.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>标题第一行</span>
            <input name="titleLine1" defaultValue={home.hero.titleLine1} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>标题第二行</span>
            <input name="titleLine2" defaultValue={home.hero.titleLine2} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>描述</span>
          <textarea name="description" defaultValue={home.hero.description} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存 Hero" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
