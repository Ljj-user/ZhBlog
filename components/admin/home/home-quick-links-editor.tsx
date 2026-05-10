"use client"

import { useActionState } from "react"
import { saveHomeQuickLinks } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { HomeContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

function serializeQuickLinks(value: HomeContent["quickLinks"]) {
  return value.map((item) => `${item.label} | ${item.description} | ${item.href}`).join("\n")
}

export function HomeQuickLinksEditor({ home }: { home: HomeContent }) {
  const [state, formAction] = useActionState(saveHomeQuickLinks, initialState)

  return (
    <AdminSectionCard title="快捷入口" description="每行一条，格式为：标题 | 描述 | 链接">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>快捷入口列表</span>
          <textarea name="quickLinks" defaultValue={serializeQuickLinks(home.quickLinks)} rows={8} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存快捷入口" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
