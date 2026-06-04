import { BriefcaseBusiness } from "lucide-react"
import { SectionHeader, SurfaceCard } from "@/components/site/cards"
import type { ExperienceItem } from "@/lib/content"

export function AboutExperienceSection({ items }: { items: ExperienceItem[] }) {
  return (
    <SurfaceCard className="p-6 sm:p-7">
      <SectionHeader
        eyebrow="Timeline"
        title="Work that shaped how I build"
        description="A small timeline of the projects and roles that pushed me toward product thinking, frontend craft, and long-term systems."
      />

      <div className="mt-8 space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.period}-${item.title}`}
            className="grid gap-4 rounded-[1.55rem] border border-stone-200/70 bg-white/65 p-5 dark:border-white/10 dark:bg-white/[0.04] lg:grid-cols-[120px_minmax(0,1fr)]"
          >
            <div className="flex items-center gap-3 lg:block">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/82 text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-300">
                <BriefcaseBusiness className="h-4 w-4" />
              </span>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500 lg:mt-4">{item.period}</p>
            </div>

            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-stone-400">{item.org}</p>
                </div>
                <span className="rounded-full border border-stone-200 bg-white/78 px-3 py-1 text-[0.68rem] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400">
                  Step {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-stone-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SurfaceCard>
  )
}
