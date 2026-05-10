import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-[2rem] border border-black/10 bg-white/76 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <p className="text-[0.72rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">{eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl tracking-[-0.05em] text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
