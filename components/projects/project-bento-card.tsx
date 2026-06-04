import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProjectItem } from "@/lib/content"
import { cn } from "@/lib/utils"

export function ProjectBentoCard({ project }: { project: ProjectItem }) {
  return (
    <article
      className={cn(
        "page-enter group rounded-[1.8rem] border border-zinc-100 bg-[#fbfaf6]/82 p-5 shadow-[0_14px_36px_rgba(47,55,48,0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:bg-white dark:border-zinc-800 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] sm:p-6",
        project.featured && "md:col-span-2 sm:p-7",
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">
              {project.featured ? "Featured build" : "Toolbox"}
            </p>
            <h3
              className={cn(
                "mt-3 font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100",
                project.featured ? "text-[1.8rem] leading-[1.02] sm:text-[2.25rem]" : "text-xl",
              )}
            >
              {project.title}
            </h3>
          </div>

          <span className="self-start rounded-full border border-stone-200 bg-white/72 px-3 py-1 text-[0.68rem] text-stone-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-400">
            {project.developmentVibe}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 bg-white/54 px-3 py-1 text-xs tracking-[0.06em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-500 dark:text-stone-400">{project.description}</p>

        <div className={cn("mt-5 grid gap-3", project.featured ? "md:grid-cols-3" : "sm:grid-cols-3 md:grid-cols-1")}>
          <div className="card-shell rounded-[1.2rem] bg-white/68 p-4 dark:bg-white/[0.05]">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Pain</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-stone-300">{project.pain}</p>
          </div>
          <div className="card-shell rounded-[1.2rem] bg-white/68 p-4 dark:bg-white/[0.05]">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Result</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-stone-300">{project.result}</p>
          </div>
          <div className="card-shell rounded-[1.2rem] bg-white/68 p-4 dark:bg-white/[0.05]">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Lesson</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-stone-300">{project.lesson}</p>
          </div>
        </div>

        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 pt-6 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-stone-300 dark:hover:text-white"
        >
          Open project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
