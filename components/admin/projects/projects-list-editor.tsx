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
  const serializedItems = items
    .map((item) =>
      [
        item.slug,
        item.title,
        item.href,
        item.tags.join(", "),
        item.featured ? "true" : "false",
        item.description,
        item.pain,
        item.result,
        item.lesson,
        item.developmentVibe,
      ].join(" | "),
    )
    .join("\n")

  return (
    <AdminSectionCard
      title="Project List"
      description="One item per line: slug | title | href | tag1, tag2 | featured(true/false) | description | pain | result | lesson | developmentVibe."
    >
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>Project Items</span>
          <textarea
            name="items"
            defaultValue={serializedItems}
            rows={12}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
          Example: zhblog | ZhBlog | https://github.com/name/repo | GitHub, Blog | true | A blog system built around content and design | Wanted a personal site that felt richer than a repo index | Next.js + MDX + admin editing | Unified visual language and mobile polish | AI felt like a steady pair-programming partner
        </p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="Save Project List" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
