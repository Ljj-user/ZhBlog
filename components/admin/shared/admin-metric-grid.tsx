export interface AdminMetricItem {
  label: string
  value: string | number
}

export function AdminMetricGrid({ items }: { items: AdminMetricItem[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
      {items.map((item) => (
        <div key={item.label} className="rounded-[1.2rem] border border-black/8 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="text-xs tracking-[0.2em] text-slate-400 dark:text-slate-500">{item.label}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
        </div>
      ))}
    </div>
  )
}
