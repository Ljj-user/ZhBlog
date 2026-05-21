"use client"

import { useActionState } from "react"
import { saveProfileExperience } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { SiteProfile } from "@/lib/content"

const initialState = { ok: false, message: "" }

function joinExperienceLines(profile: SiteProfile) {
  return profile.experience.map((item) => [item.period, item.title, item.org, item.description].join(" | ")).join("\n")
}

export function ProfileExperienceEditor({ profile }: { profile: SiteProfile }) {
  const [state, formAction] = useActionState(saveProfileExperience, initialState)

  return (
    <AdminSectionCard
      title="经历模板"
      description="每行一段经历，格式固定为：时间 | 职位 | 组织/团队 | 描述。这样可以直接改文字，不需要改页面结构。"
    >
      <form action={formAction} className="space-y-4">
        <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <span>Experience</span>
          <textarea
            name="experience"
            defaultValue={joinExperienceLines(profile)}
            rows={8}
            className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 font-mono text-sm dark:border-white/10 dark:bg-white/[0.05]"
          />
        </label>
        <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
          示例：`2025 - 至今 | 前端开发工程师 | 互联网团队 | 参与 Web 产品建设，负责页面体验、交互落地与项目推进中的工程细节。`
        </p>
        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存经历内容" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
