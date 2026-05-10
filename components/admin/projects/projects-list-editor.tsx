"use client"

import { useActionState } from "react"
import { saveProjectItems } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { ProjectItem } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function ProjectsListEditor({ items }: { items: ProjectItem[] }) {
  const [state, formAction] = useActionState(saveProjectItems, initialState)

  return (
    <AdminSectionCard title="项目列表" description="每行一条，格式：slug | 标题 | 链接 | 标签1, 标签2 | 描述。列表独立保存。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>项目项</span>
          <textarea
            name="items"
            defaultValue={items.map((item) => `${item.slug} | ${item.title} | ${item.href} | ${item.tags.join(", ")} | ${item.description}`).join("\n")}
            rows={12}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">示例：zhblog | ZhBlog | https://github.com/name/repo | GitHub, Blog | 当前博客项目源码仓库</p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存项目列表" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
