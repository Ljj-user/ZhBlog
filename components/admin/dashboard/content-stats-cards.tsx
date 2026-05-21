import type { AdminStat } from "@/lib/admin-content"

export function ContentStatsCards({ stats }: { stats: AdminStat[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <article
          key={stat.label}
          className="rounded-[1.7rem] border border-black/10 bg-white/76 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]"
        >
          <p className="text-[0.7rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">{stat.label}</p>
          <h3 className="mt-4 font-display text-[2rem] leading-none tracking-[-0.06em] text-slate-900 dark:text-white">{stat.value}</h3>
          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">{stat.description}</p>
        </article>
      ))}
    </div>
  )
}
