import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AdminSectionCard({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn("rounded-[1.75rem] border border-black/10 bg-white/72 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-white">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
