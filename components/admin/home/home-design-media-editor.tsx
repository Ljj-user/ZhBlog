"use client"

import { useActionState } from "react"
import { saveHomeDesignMedia } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { HomeContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function HomeDesignMediaEditor({ home }: { home: HomeContent }) {
  const [state, formAction] = useActionState(saveHomeDesignMedia, initialState)

  return (
    <AdminSectionCard title="Design Media" description="Edit the left-side visual reference card copy and background image.">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Eyebrow</span>
            <input name="eyebrow" defaultValue={home.designMedia.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Title</span>
            <input name="title" defaultValue={home.designMedia.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>Description</span>
          <textarea name="description" defaultValue={home.designMedia.description} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>Background Image URL</span>
          <input
            name="backgroundImage"
            defaultValue={home.designMedia.backgroundImage}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="Save Design Media" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
