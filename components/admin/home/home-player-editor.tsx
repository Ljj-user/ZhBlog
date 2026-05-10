"use client"

import { useActionState } from "react"
import { saveHomePlayer } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { HomeContent } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function HomePlayerEditor({ home }: { home: HomeContent }) {
  const [state, formAction] = useActionState(saveHomePlayer, initialState)

  return (
    <AdminSectionCard title="Player" description="Edit the player placeholder card copy and keep it on its own save boundary.">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Eyebrow</span>
            <input name="eyebrow" defaultValue={home.player.eyebrow} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>Title</span>
            <input name="title" defaultValue={home.player.title} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="Save Player" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
