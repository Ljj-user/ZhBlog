import { CheckCircle2, Circle } from "lucide-react"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import type { AdminChecklistItem } from "@/lib/admin-content"

export function ContentChecklist({ items }: { items: AdminChecklistItem[] }) {
  return (
    <AdminSectionCard title="后台施工清单" description="先把骨架和数据边界打稳，再往里面接真实写入。">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-3 rounded-[1.2rem] border border-black/8 bg-white/80 px-4 py-3 dark:border-white/8 dark:bg-white/[0.04]"
          >
            {item.done ? <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" /> : <Circle className="mt-0.5 h-4 w-4 text-slate-300 dark:text-slate-600" />}
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminSectionCard>
  )
}
