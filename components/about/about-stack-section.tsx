import { GraduationCap } from "lucide-react"
import { SectionHeader, SurfaceCard } from "@/components/site/cards"
import type { EducationInfo, SkillGroup } from "@/lib/content"

export function AboutStackSection({
  skillGroups,
  education,
}: {
  skillGroups: SkillGroup[]
  education: EducationInfo
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <SurfaceCard className="p-6 sm:p-7">
        <SectionHeader
          eyebrow="Stack"
          title="Tools, mediums, and recurring interests"
          description="Not just a skill matrix, but the mediums I keep coming back to when building, writing, and curating."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[1.45rem] border border-stone-200/70 bg-white/65 p-5 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="text-base font-medium tracking-[-0.02em] text-slate-900 dark:text-stone-100">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-200 bg-white/85 px-3 py-1 text-[0.74rem] text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SurfaceCard>

      <SurfaceCard className="p-6 sm:p-7">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
          <GraduationCap className="h-4 w-4" />
          <span>Education</span>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-stone-200/70 bg-white/65 p-5 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">{education.period}</p>
          <h3 className="mt-3 text-2xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{education.school}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-stone-300">{education.degree}</p>
        </div>
      </SurfaceCard>
    </div>
  )
}
