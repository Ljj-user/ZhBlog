import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"

export function RecentChangesPanel({ items }: { items: string[] }) {
  return (
    <AdminSectionCard title="近期动作建议" description="这一块先作为施工提示，后续可以替换成真实修改历史。">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-[1.15rem] border border-dashed border-black/10 px-4 py-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </AdminSectionCard>
  )
}
