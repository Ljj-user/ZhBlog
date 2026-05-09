import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react"

function SocialIcon({ kind }: { kind: string }) {
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.58 2.35 1.12 2.92.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.09 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.84c.85 0 1.71.12 2.51.36 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.96-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.25 10.25 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
      </svg>
    )
  }

  if (kind === "linktree") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18" />
        <path d="M7 8l5-5 5 5" />
        <path d="M7 16l5 5 5-5" />
        <path d="M5 12h14" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M21.54 7.2c.02.22.02.45.02.67 0 6.83-5.11 14.71-14.46 14.71-2.87 0-5.54-.86-7.79-2.35.4.05.79.07 1.21.07 2.38 0 4.56-.83 6.3-2.25-2.22-.05-4.1-1.54-4.75-3.6.31.06.62.1.95.1.45 0 .9-.06 1.32-.18-2.32-.48-4.07-2.58-4.07-5.06v-.06c.68.39 1.46.63 2.29.66A5.19 5.19 0 0 1 .96 5.58c0-.96.25-1.84.69-2.6a14.3 14.3 0 0 0 10.48 5.44 5.35 5.35 0 0 1-.13-1.19c0-2.89 2.3-5.23 5.14-5.23 1.48 0 2.82.64 3.76 1.66a10.07 10.07 0 0 0 3.27-1.28 5.32 5.32 0 0 1-2.26 2.93 10.14 10.14 0 0 0 2.95-.83 10.8 10.8 0 0 1-2.57 2.72Z" />
    </svg>
  )
}

export const metadata = {
  title: "关于",
  description: "认识 ZH_Blog 背后的作者与正在进行的事",
}

const profile = {
  name: "正豪",
  role: "Agent 全栈开发工程师",
  avatar: "https://i.111666.best/image/Tddzv0tWETjSjAcJORc6fE.png",
  intro:
    "我更想把这里做成一个带作者气质的空间，而不只是简历或信息卡。它会展示我的项目、技术与写作，也会保留生活观察、审美偏好和长期积累的痕迹。",
  summary:
    "偏爱能被长期维护的系统，也在练习把复杂问题讲得更清楚。最近主要在做 Web 体验、前端工程、内容型产品和个人表达相关的事情。",
  location: "北京",
  email: "2694569918@qq.com",
}

const focusAreas = [
  "把博客做成可持续生长的个人主页，而不是一次性的展示页。",
  "持续写技术、项目复盘和生活观察，让内容慢慢长出自己的纹理。",
  "打磨兼具秩序感和作者气质的 Web 体验，保留表达里的温度。",
]

const skillGroups = [
  {
    title: "前端 / 体验",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Design Sense"],
  },
  {
    title: "后端 / 工程",
    items: ["Node.js", "Python", "PostgreSQL", "Redis", "Automation"],
  },
  {
    title: "表达 / 兴趣",
    items: ["Writing", "Photography", "Travel", "Curation", "Reflection"],
  },
]

const experience = [
  {
    period: "2025 - 至今",
    title: "前端开发工程师",
    org: "互联网团队",
    description: "参与 Web 产品建设，负责页面体验、交互落地与项目推进中的工程细节。",
  },
  {
    period: "2023 - 2024",
    title: "开发工程师（实习）",
    org: "创业项目组",
    description: "从真实项目里补足前端开发方法，参与官网和后台系统实现。",
  },
]

const education = {
  period: "2022 - 2026",
  school: "天津商业大学",
  degree: "计算机科学与技术",
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 lg:px-10">
      <section className="rounded-[2.6rem] border border-black/10 bg-white/64 p-6 shadow-[0_28px_90px_rgba(30,23,15,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:shadow-none sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[120px_minmax(0,1fr)_280px] lg:items-start">
          <div className="flex flex-col items-start gap-4">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-[2rem] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.14)] sm:h-30 sm:w-30"
            />
            <div className="flex flex-wrap gap-2">
              {["长期主义", "Web 体验", "内容表达"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/10 bg-white/76 px-3 py-1 text-xs text-black/56 dark:border-white/10 dark:bg-white/[0.05] dark:text-white/56"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-black/40 dark:text-white/40">About The Author</p>
            <h1 className="mt-4 font-display text-4xl leading-none tracking-[-0.05em] text-black sm:text-6xl dark:text-white">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg text-black/60 dark:text-white/58">{profile.role}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-black/56 dark:text-white/56">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/56 px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
                <MapPin className="h-4 w-4" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/56 px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
                <Mail className="h-4 w-4" />
                {profile.email}
              </span>
            </div>

            <div className="mt-8 max-w-3xl space-y-5">
              <p className="text-lg leading-9 text-black/72 dark:text-white/68">{profile.intro}</p>
              <p className="text-base leading-8 text-black/58 dark:text-white/58">{profile.summary}</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,251,246,0.94),rgba(248,242,236,0.92))] p-5 text-slate-800 shadow-[0_18px_50px_rgba(148,163,184,0.12)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] dark:text-white dark:shadow-none">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/64">
              <Sparkles className="h-4 w-4" />
              <span>Now</span>
            </div>
            <div className="mt-5 space-y-3">
              {focusAreas.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.35rem] border border-black/8 bg-white/72 px-4 py-4 text-sm leading-7 text-slate-600 shadow-[0_10px_24px_rgba(148,163,184,0.08)] dark:border-white/8 dark:bg-white/5 dark:text-white/66 dark:shadow-none"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { label: "GitHub", href: "https://github.com/Ljj-user", icon: "github" },
            { label: "Linktree", href: "https://linktr.ee/XuYao.eth", icon: "linktree" },
            { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white/76 px-4 py-2.5 text-sm text-black transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1]"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/[0.04] text-black/72 dark:bg-white/[0.06] dark:text-white/72">
                <SocialIcon kind={item.icon} />
              </span>
              {item.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <section className="h-fit self-start rounded-[2.3rem] border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 lg:col-start-1">
          <div className="flex items-center gap-2 text-sm text-black/62 dark:text-white/62">
            <BriefcaseBusiness className="h-4 w-4" />
            <span>Experience</span>
          </div>
          <div className="mt-6 space-y-4">
            {experience.map((item) => (
              <div
                key={`${item.period}-${item.title}`}
                className="rounded-[1.7rem] border border-black/8 bg-white/46 p-5 dark:border-white/8 dark:bg-white/[0.03]"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-medium tracking-[-0.03em] text-black dark:text-white">{item.title}</h2>
                    <p className="mt-2 text-sm text-black/52 dark:text-white/52">{item.org}</p>
                  </div>
                  <span className="text-sm text-black/42 dark:text-white/42">{item.period}</span>
                </div>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-black/62 dark:text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="h-fit self-start rounded-[2.3rem] border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/6 lg:col-start-2 lg:row-span-2">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Skill Stack</p>
          <div className="mt-6 space-y-4">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.7rem] border border-black/8 bg-white/42 p-4 dark:border-white/8 dark:bg-white/[0.03]"
              >
                <h2 className="text-base font-medium text-black dark:text-white">{group.title}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/10 px-3 py-1 text-xs text-black/58 dark:border-white/10 dark:text-white/58"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="h-fit self-start rounded-[2.3rem] border border-[rgba(64,45,28,0.12)] bg-[linear-gradient(180deg,rgba(251,247,242,0.94),rgba(243,235,227,0.9))] p-6 text-slate-800 shadow-[0_22px_55px_rgba(58,38,19,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] dark:text-white dark:shadow-none lg:col-start-1">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/64">
            <GraduationCap className="h-4 w-4" />
            <span>Education & Contact</span>
          </div>

          <div className="mt-5 rounded-[1.7rem] border border-[rgba(64,45,28,0.1)] bg-white/62 p-5 shadow-[0_10px_28px_rgba(87,62,38,0.06)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-white/40">{education.period}</p>
            <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-slate-900 dark:text-white">{education.school}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/62">{education.degree}</p>
          </div>

          <div className="mt-5 rounded-[1.7rem] border border-[rgba(64,45,28,0.1)] bg-white/58 p-5 shadow-[0_10px_28px_rgba(87,62,38,0.06)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none">
            <p className="text-sm leading-7 text-slate-600 dark:text-white/64">
              如果你也在做内容型产品、个人博客、前端体验优化，或者只是想交流一下正在推进的东西，都欢迎通过邮件联系我。
            </p>
            <Link
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(64,45,28,0.12)] bg-[#f7f2eb] px-5 py-3 text-sm text-slate-900 transition-colors hover:bg-[#f1e9df] dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.12]"
            >
              写封邮件
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
