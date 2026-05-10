"use client"

import { useActionState } from "react"
import { saveFriendsPreferenceCard } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { FriendsContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function FriendsPreferenceCardEditor({ friends }: { friends: FriendsContent }) {
  const [state, formAction] = useActionState(saveFriendsPreferenceCard, initialState)

  return (
    <AdminSectionCard title="偏好卡片" description="每行一个条目，适合维护你希望展示的友链偏好说明。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>眉标题</span>
            <input name="eyebrow" defaultValue={friends.preferenceCard.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>标题</span>
            <input name="title" defaultValue={friends.preferenceCard.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>条目</span>
          <textarea
            name="items"
            defaultValue={friends.preferenceCard.items.join("\n")}
            rows={5}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存偏好卡片" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
