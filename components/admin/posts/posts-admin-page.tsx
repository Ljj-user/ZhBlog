import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"

export function PostsAdminPage() {
  return (
    <div className="space-y-4">
      <AdminPageHeader eyebrow="POSTS" title="文章" description="当前阶段文章仍以 MDX 维护为主，这一页先作为维护入口和后续扩展位。" />
      <div className="grid gap-4 xl:grid-cols-2">
        <AdminSectionCard title="当前策略" description="文章内容继续使用 MDX。后台第一期不先阻塞在富文本编辑器上，而是先把其他结构化内容域做稳。">
          <div className="rounded-[1.2rem] border border-dashed border-black/10 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
            等结构化内容后台稳定后，再决定是否为文章增加专门的后台编辑能力。
          </div>
        </AdminSectionCard>
        <AdminSectionCard title="前台入口" description="可以先通过前台文章列表页确认当前 MDX 内容。">
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
  )
}
