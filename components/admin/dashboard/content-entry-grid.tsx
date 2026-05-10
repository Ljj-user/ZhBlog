import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import type { AdminSection } from "@/lib/admin-content"

export function ContentEntryGrid({ sections }: { sections: AdminSection[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {sections.map((section) => (
        <Link
          key={section.href}
          href={section.href}
          className="group rounded-[1.6rem] border border-black/10 bg-white/72 p-5 shadow-[0_14px_34px_rgba(15,23,42,0.05)] transition-all hover:-translate-y-1 hover:bg-white/86 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]"
        >
          <p className="text-[0.7rem] tracking-[0.24em] text-slate-400 dark:text-slate-500">{section.eyebrow}</p>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-white">{section.label}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{section.description}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            进入该内容域
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      ))}
    </div>
  )
}
