import Link from "next/link"
import { ArrowRight, FilePenLine, Plus } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getAllPostsForAdmin } from "@/lib/posts"

export function PostsAdminPage() {
  const posts = getAllPostsForAdmin()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="POSTS"
        title="文章"
        description="现在可以直接在后台维护 MDX 文件文章：新建、编辑标题与 frontmatter，并保存正文源码。"
        action={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/86 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
          >
            <Plus className="h-4 w-4" />
            新建文章
          </Link>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <AdminSectionCard title="文章列表" description="这里展示当前真实的 MDX 文章文件，草稿和已发布内容都会显示。">
          <div className="space-y-3">
            {posts.length === 0 ? (
              <div className="rounded-[1.2rem] border border-dashed border-black/10 px-4 py-6 text-sm leading-6 text-slate-500 dark:border-white/10 dark:text-slate-400">
                还没有真实文章文件。可以先创建第一篇 MDX 文章试试保存链路。
              </div>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/admin/posts/${post.slug}`}
                  className="flex items-start justify-between gap-4 rounded-[1.2rem] border border-black/8 bg-white/68 px-4 py-4 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-medium text-slate-900 dark:text-white">{post.title}</h2>
                      {post.draft ? (
                        <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300">
                          草稿
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{post.description || "暂无摘要"}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400 dark:text-slate-500">
                      <span>{post.slug}</span>
                      <span>{post.date}</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <FilePenLine className="mt-1 h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" />
                </Link>
              ))
            )}
          </div>
        </AdminSectionCard>

        <div className="space-y-4">
          <AdminSectionCard title="当前策略" description="这一版不是重型富文本，而是直接维护真实的 MDX 文件，先验证好不好用。">
            <div className="rounded-[1.2rem] border border-dashed border-black/10 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
              适合先完成标题、摘要、分类、标签、草稿状态和正文源码编辑。等实际使用一段时间后，再决定是否升级成更重的写作系统。
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="前台入口" description="保存后可以直接去前台文章页确认展示效果。">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/86 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
            >
              前往文章页
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
