"use client"

import { useActionState } from "react"
import { saveFriendsExchangeCard } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { FriendsContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function FriendsExchangeCardEditor({ friends }: { friends: FriendsContent }) {
  const [state, formAction] = useActionState(saveFriendsExchangeCard, initialState)

  return (
    <AdminSectionCard title="交换说明卡片" description="维护友链交换说明，以及前往联系方式页面的按钮文案与链接。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>标题</span>
            <input name="title" defaultValue={friends.exchangeCard.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>按钮文案</span>
            <input name="ctaLabel" defaultValue={friends.exchangeCard.ctaLabel} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>说明文案</span>
          <textarea name="description" defaultValue={friends.exchangeCard.description} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>按钮链接</span>
          <input name="ctaHref" defaultValue={friends.exchangeCard.ctaHref} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存交换说明" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
