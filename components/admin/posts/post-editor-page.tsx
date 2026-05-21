"use client"

import { useActionState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { savePostDraft } from "@/app/admin/actions"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import type { Post } from "@/lib/posts"

const initialState = { ok: false, message: "" }

export function PostEditorPage({
  post,
  mode,
  existingSlugs,
  existingCategories,
}: {
  post: Post | null
  mode: "create" | "edit"
  existingSlugs: string[]
  existingCategories: string[]
}) {
  const [state, formAction] = useActionState(savePostDraft, initialState)

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="POST EDITOR"
        title={mode === "create" ? "新建文章" : "编辑文章"}
        description="直接保存为真实的 MDX 文件。frontmatter 和正文都在这里维护。"
        action={
          <Link
            href="/admin/posts"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/86 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
          >
            <ArrowLeft className="h-4 w-4" />
            返回文章列表
          </Link>
        }
      />

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />

        <AdminSectionCard title="基础信息" description="这些字段会写进文章的 frontmatter。Slug 和分类支持点击选择已有项，也可以直接输入新值。">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>Slug</span>
              <input
                name="slug"
                list="post-slug-options"
                defaultValue={post?.slug ?? ""}
                placeholder="my-first-post"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
              />
              <datalist id="post-slug-options">
                {existingSlugs.map((slug) => (
                  <option key={slug} value={slug} />
                ))}
              </datalist>
            </label>
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>标题</span>
              <input
                name="title"
                defaultValue={post?.title ?? ""}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>日期</span>
              <input
                name="date"
                type="date"
                defaultValue={post?.date ?? new Date().toISOString().slice(0, 10)}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>分类</span>
              <input
                name="category"
                list="post-category-options"
                defaultValue={post?.category ?? ""}
                placeholder="学习笔记"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
              />
              <datalist id="post-category-options">
                {existingCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_160px]">
            <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <span>摘要</span>
              <textarea
                name="description"
                defaultValue={post?.description ?? ""}
                rows={3}
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
              />
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
              <input type="checkbox" name="draft" defaultChecked={post?.draft ?? true} />
              <span>保存为草稿</span>
            </label>
          </div>

          <label className="mt-4 block space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <span>标签</span>
            <input
              name="tags"
              defaultValue={post?.tags.join(", ") ?? ""}
              placeholder="MDX, Blog, Notes"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
            />
          </label>
        </AdminSectionCard>

        <AdminSectionCard title="正文内容" description="这里直接编辑 MDX 正文源码。">
          <textarea
            name="content"
            defaultValue={post?.content ?? ""}
            rows={22}
            className="min-h-[520px] w-full rounded-[1.2rem] border border-black/10 bg-white px-4 py-3 font-mono text-sm leading-7 dark:border-white/10 dark:bg-white/[0.05]"
          />
        </AdminSectionCard>

        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存文章" />
        </div>
      </form>
    </div>
  )
}
