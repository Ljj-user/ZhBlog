"use client"

import { useActionState } from "react"
import { saveProfileBasic } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { SiteProfile } from "@/lib/content"

const initialState = { ok: false, message: "" }

export function ProfileBasicForm({ profile }: { profile: SiteProfile }) {
  const [state, formAction] = useActionState(saveProfileBasic, initialState)

  return (
    <AdminSectionCard title="基础资料" description="这一块负责站点标题、头像、封面图和基础身份信息。">
      <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>站点标题</span>
            <input name="siteTitle" defaultValue={profile.siteTitle} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>姓名</span>
            <input name="name" defaultValue={profile.name} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>身份标题</span>
            <input name="role" defaultValue={profile.role} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>在线状态标签</span>
            <input name="availabilityLabel" defaultValue={profile.availabilityLabel} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>头像 URL</span>
            <input name="avatar" defaultValue={profile.avatar} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>封面图 URL</span>
            <input name="coverImage" defaultValue={profile.coverImage} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>首页位置文案</span>
            <input name="location" defaultValue={profile.location} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
          <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>关于页位置</span>
            <input name="aboutLocation" defaultValue={profile.aboutLocation} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
          </label>
        </div>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>个人简介</span>
          <textarea name="bio" defaultValue={profile.bio} rows={4} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>首页关注摘要</span>
          <input name="focusSummary" defaultValue={profile.focusSummary} className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]" />
        </label>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存基础资料" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
