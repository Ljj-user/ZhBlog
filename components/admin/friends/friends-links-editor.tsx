"use client"

import { useActionState } from "react"
import { saveFriendsLinks } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { FriendLink } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function FriendsLinksEditor({ items }: { items: FriendLink[] }) {
  const [state, formAction] = useActionState(saveFriendsLinks, initialState)

  return (
    <AdminSectionCard title="友链列表" description="每行一条，格式：名称 | 链接 | 标签 | 描述。列表独立保存，不会影响上面的文案区块。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>友链项</span>
          <textarea
            name="items"
            defaultValue={items.map((item) => `${item.name} | ${item.url} | ${item.tag} | ${item.description}`).join("\n")}
            rows={10}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">示例：留白日志 | https://example.com | Design / Writing | 记录设计与写作的个人空间</p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存友链列表" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
