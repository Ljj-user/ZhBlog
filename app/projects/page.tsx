import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, FolderKanban, Github } from "lucide-react"
import { PillLink, ProjectPreviewCard, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { getProjectsContent } from "@/lib/content"
import {
  getContributionIntensity,
  getFallbackContributionCalendar,
  getGithubContributionCalendar,
} from "@/lib/github-contributions"

export const metadata: Metadata = {
  title: "项目",
  description: "项目与工具集合页，展示近期作品和持续实践。",
}

export const revalidate = 3600

function getContributionClass(level: "none" | "low" | "mid" | "high") {
  if (level === "high") return "border-[#216e39]/20 bg-[#216e39] dark:border-[#39d353]/20 dark:bg-[#39d353]"
  if (level === "mid") return "border-[#40c463]/20 bg-[#40c463] dark:border-[#26a641]/20 dark:bg-[#26a641]"
  if (level === "low") return "border-[#9be9a8]/20 bg-[#9be9a8] dark:border-[#0e4429]/20 dark:bg-[#0e4429]"
  return "border-[#ebedf0]/20 bg-[#ebedf0] dark:border-[#161b22]/20 dark:bg-[#161b22]"
}

export default async function ProjectsPage() {
  const projectsContent = getProjectsContent()
  const { githubProfile, hero, items: projects } = projectsContent

  let contributionCalendar = getFallbackContributionCalendar()
  let usingFallback = true

  try {
    contributionCalendar = await getGithubContributionCalendar(githubProfile.username)
    usingFallback = false
  } catch {
    usingFallback = true
  }

  const allDays = contributionCalendar.weeks.flatMap((week) => week.contributionDays)
  const maxContributionCount = allDays.reduce((max, day) => Math.max(max, day.contributionCount), 0)
  const monthLabels = contributionCalendar.months.slice(0, 12)

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            action={
              <PillLink href={githubProfile.url} external>
                <Github className="h-4 w-4" />
                @{githubProfile.username}
              </PillLink>
            }
          />
        </SurfaceCard>

        <SurfaceCard className="p-5 sm:p-7">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Github className="h-4 w-4" />
            <span>GitHub Contributions</span>
          </div>

          <Link
            href={githubProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 block rounded-[1.6rem] border border-black/8 bg-white/72 p-4 transition-colors hover:bg-white/88 dark:border-white/8 dark:bg-white/[0.04] dark:hover:bg-white/[0.06] sm:p-6"
          >
            <div className="pl-10 sm:pl-14">
              <div className="grid grid-cols-6 gap-y-2 text-[0.72rem] text-slate-400 sm:grid-cols-12 dark:text-slate-500">
                {monthLabels.map((month) => (
                  <span key={`${month.year}-${month.name}-${month.firstDay}`}>{month.name}</span>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-[2rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4">
              <div className="grid grid-rows-7 items-center text-[0.72rem] text-slate-400 dark:text-slate-500">
                {["", "Mon", "", "Wed", "", "Fri", ""].map((label, index) => (
                  <span key={`${label}-${index}`}>{label}</span>
                ))}
              </div>

              <div
                className="grid gap-[4px]"
                style={{
                  gridAutoFlow: "column",
                  gridTemplateColumns: `repeat(${contributionCalendar.weeks.length}, minmax(0, 1fr))`,
                  gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                }}
              >
                {contributionCalendar.weeks.map((week) =>
                  week.contributionDays.map((day) => {
                    const level = getContributionIntensity(day.contributionCount, maxContributionCount)

                    return (
                      <span
                        key={day.date}
                        title={`${day.date.slice(0, 10)} / ${day.contributionCount} contributions`}
                        aria-label={`${day.date.slice(0, 10)} ${day.contributionCount} contributions`}
                        className={`aspect-square min-h-2 rounded-[3px] border ${getContributionClass(level)}`}
                      />
                    )
                  }),
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
              <span>
                近一年共 {contributionCalendar.totalContributions} 次贡献
                {usingFallback ? "，当前展示的是占位数据，配置 token 后会切换为真实记录。" : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                查看 GitHub 记录
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </SurfaceCard>

        <section className="border-t border-dashed border-black/10 pt-6 dark:border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <FolderKanban className="h-4 w-4" />
            <span>{projectsContent.listHeading}</span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectPreviewCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
