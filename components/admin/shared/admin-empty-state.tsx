import type { ReactNode } from "react"

export function AdminEmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="rounded-[1.4rem] border border-dashed border-black/10 bg-[linear-gradient(135deg,rgba(255,247,239,0.96),rgba(240,246,248,0.92))] p-5 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(109,82,63,0.14),rgba(64,90,103,0.14))]">
      <h3 className="text-base font-medium text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  )
}
