"use client"

import { useActionState } from "react"
import { saveProfileContact } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { SiteProfile } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function ProfileContactForm({ profile }: { profile: SiteProfile }) {
  const [state, formAction] = useActionState(saveProfileContact, initialState)

  return (
    <AdminSectionCard title="介绍与联系" description="这一块负责长介绍、总结、邮箱和首页邮件入口文案。">
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>邮箱</span>
          <input name="email" defaultValue={profile.email} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>长介绍</span>
          <textarea name="intro" defaultValue={profile.intro} rows={5} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>简短总结</span>
          <textarea name="summary" defaultValue={profile.summary} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>联系文案</span>
          <textarea name="contactCopy" defaultValue={profile.contactCopy} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>首页邮件按钮标题</span>
            <input name="homeSidebarEmailLabel" defaultValue={profile.homeSidebarEmailLabel} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>首页邮件按钮描述</span>
            <input name="homeSidebarEmailDescription" defaultValue={profile.homeSidebarEmailDescription} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存介绍与联系" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
