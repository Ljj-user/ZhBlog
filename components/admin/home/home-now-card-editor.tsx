"use client"

import { useActionState } from "react"
import { saveHomeNowCard } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { HomeContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function HomeNowCardEditor({ home }: { home: HomeContent }) {
  const [state, formAction] = useActionState(saveHomeNowCard, initialState)

  return (
    <AdminSectionCard title="Now 卡片" description="负责首页当前在做卡片，内容项按每行一条维护。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>眉标题</span>
            <input name="eyebrow" defaultValue={home.nowCard.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>卡片标题</span>
            <input name="title" defaultValue={home.nowCard.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>条目列表</span>
          <textarea name="items" defaultValue={home.nowCard.items.join("\n")} rows={7} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存 Now 卡片" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
