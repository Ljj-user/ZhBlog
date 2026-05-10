"use client"

import { useActionState } from "react"
import { saveNavigationItems } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { NavigationItem } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function NavigationMenuEditor({ items }: { items: NavigationItem[] }) {
  const [state, formAction] = useActionState(saveNavigationItems, initialState)

  return (
    <AdminSectionCard title="导航菜单" description="每行一条，格式：名称 | 链接。保存后会直接写入 navigation.json。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>菜单项</span>
          <textarea
            name="items"
            defaultValue={items.map((item) => `${item.name} | ${item.href}`).join("\n")}
            rows={8}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">示例：文章 | /posts</p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存导航菜单" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
