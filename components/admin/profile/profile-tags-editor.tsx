"use client"

import { useActionState } from "react"
import { saveProfileTags } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { SiteProfile } from "@/lib/content"

const initialState = { ok: false, message: "" }

function joinLines(items: string[]) {
  return items.join("\n")
}

export function ProfileTagsEditor({ profile }: { profile: SiteProfile }) {
  const [state, formAction] = useActionState(saveProfileTags, initialState)

  return (
    <AdminSectionCard
      title="标签与当前关注"
      description="每行一个条目。这里统一维护首页标签、关于页标签，以及右侧 Now 区块里的当前关注内容。"
    >
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>首页标签</span>
            <textarea
              name="profileTags"
              defaultValue={joinLines(profile.profileTags)}
              rows={6}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>关于页标签</span>
            <textarea
              name="aboutTags"
              defaultValue={joinLines(profile.aboutTags)}
              rows={6}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>当前关注</span>
            <textarea
              name="focusAreas"
              defaultValue={joinLines(profile.focusAreas)}
              rows={6}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
            />
          </label>
        </div>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存标签与关注项" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
