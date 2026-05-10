"use client"

import { useActionState } from "react"
import { saveSocialLinks } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { SocialLink } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function SocialLinksEditor({ items }: { items: SocialLink[] }) {
  const [state, formAction] = useActionState(saveSocialLinks, initialState)

  return (
    <AdminSectionCard title="社媒链接" description="每行一条，格式：名称 | 链接。这里维护页脚和站点社媒入口。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>社媒项</span>
          <textarea
            name="items"
            defaultValue={items.map((item) => `${item.name} | ${item.href}`).join("\n")}
            rows={8}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">示例：GitHub | https://github.com/your-name</p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存社媒链接" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
