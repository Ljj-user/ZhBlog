import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, FolderKanban, Github } from "lucide-react"
import {
  getContributionIntensity,
  getFallbackContributionCalendar,
  getGithubContributionCalendar,
} from "@/lib/github-contributions"

export const metadata: Metadata = {
  title: "项目",
  description: "项目与工具集合页，展示近期作品和实践。",
}

export const revalidate = 3600

const githubProfile = {
  username: "Ljj-user",
  url: "https://github.com/Ljj-user",
}

const projects = [
  {
    slug: "cryptobacktest-learn",
    title: "Cryptobacktest-learn",
    tags: ["GitHub", "Backtest"],
    description: "回测方向的实验仓库，记录策略研究、练习和相关开发过程。",
    href: "https://github.com/Ljj-user/Cryptobacktest-learn",
  },
  {
    slug: "crypto-sentinel",
    title: "Crypto-sentinel",
    tags: ["GitHub", "Monitor"],
    description: "加密资产监控相关项目，用来沉淀预警、观察与自动化实践。",
    href: "https://github.com/Ljj-user/Crypto-sentinel",
  },
  {
    slug: "rare-earth-nuggets",
    title: "Rare-earth-Nuggets",
    tags: ["GitHub", "Collection"],
    description: "用于整理想法、资料或项目碎片的仓库，偏向持续积累与迭代。",
    href: "https://github.com/Ljj-user/Rare-earth-Nuggets",
  },
  {
    slug: "zhblog",
    title: "ZhBlog",
    tags: ["GitHub", "Blog"],
    description: "当前博客项目的源码仓库，包含页面搭建、样式调整与内容组织。",
    href: "https://github.com/Ljj-user/ZhBlog",
  },
  {
    slug: "community-service",
    title: "community-service",
    tags: ["GitHub", "Full Stack"],
    description: "社区服务方向的项目仓库，承载完整功能实现与产品化尝试。",
    href: "https://github.com/Ljj-user/community-service",
  },
]

function getContributionClass(level: "none" | "low" | "mid" | "high") {
  if (level === "high") {
    return "border-[#216e39]/20 bg-[#216e39] dark:border-[#39d353]/20 dark:bg-[#39d353]"
  }

  if (level === "mid") {
    return "border-[#40c463]/20 bg-[#40c463] dark:border-[#26a641]/20 dark:bg-[#26a641]"
  }

  if (level === "low") {
    return "border-[#9be9a8]/20 bg-[#9be9a8] dark:border-[#0e4429]/20 dark:bg-[#0e4429]"
  }

  return "border-[#ebedf0]/20 bg-[#ebedf0] dark:border-[#161b22]/20 dark:bg-[#161b22]"
}

export default async function ProjectsPage() {
  let contributionCalendar = getFallbackContributionCalendar()
  let usingFallback = true

  try {
    contributionCalendar = await getGithubContributionCalendar(githubProfile.username)
    usingFallback = !process.env.GITHUB_TOKEN
  } catch {
    usingFallback = true
  }

  const allDays = contributionCalendar.weeks.flatMap((week) => week.contributionDays)
  const maxContributionCount = allDays.reduce((max, day) => Math.max(max, day.contributionCount), 0)
  const monthLabels = contributionCalendar.months.slice(0, 12)

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2.4rem] border border-black/10 bg-white/68 p-6 shadow-[0_28px_90px_rgba(30,23,15,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:shadow-none sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm tracking-[0.28em] text-slate-400 dark:text-slate-500">PROJECTS & TOOLS</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-[2.2rem] dark:text-slate-100">
                项目
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400">
                保留你参考图里的布局关系：上方是 GitHub 贡献区，下方是双列项目卡片；视觉语言继续沿用站内这套更克制、偏内容型的表达。
              </p>
            </div>

            <Link
              href={githubProfile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white/80 px-4 py-2.5 text-sm text-slate-600 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
            >
              <Github className="h-4 w-4" />
              @{githubProfile.username}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="rounded-[2.1rem] border border-black/10 bg-white/62 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 sm:p-7">
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
                style={{ gridTemplateColumns: `repeat(${contributionCalendar.weeks.length}, minmax(0, 1fr))` }}
              >
                {contributionCalendar.weeks.map((week) =>
                  week.contributionDays.map((day) => {
                    const level = getContributionIntensity(day.contributionCount, maxContributionCount)

                    return (
                      <span
                        key={day.date}
                        title={`${day.date.slice(0, 10)} · ${day.contributionCount} contributions`}
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
                {usingFallback ? " · 当前显示占位数据，配置 token 后会切换为真实记录" : ""}
              </span>
              <span className="inline-flex items-center gap-1">
                查看 GitHub 记录
                <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        </section>

        <section className="border-t border-dashed border-black/10 pt-6 dark:border-white/10">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <FolderKanban className="h-4 w-4" />
            <span>Projects &amp; Tools</span>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.slug}
                className="rounded-[1.9rem] border border-black/10 bg-white/62 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/78 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/[0.08]"
              >
                <div className="flex h-full flex-col">
                  <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-800 dark:text-slate-100">
                    {project.title}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 px-3 py-1 text-xs tracking-[0.06em] text-slate-500 dark:border-white/10 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-sm leading-8 text-slate-500 dark:text-slate-400">{project.description}</p>

                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  >
                    查看详情
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
