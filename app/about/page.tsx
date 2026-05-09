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

export const metadata = {
  title: "关于",
  description: "认识 ZH_Blog 背后的作者与正在进行的事",
}

const profile = {
  name: "正豪",
  role: "Agent 全栈开发工程师",
  avatar: "https://i.111666.best/image/Tddzv0tWETjSjAcJORc6fE.png",
  intro:
    "我更想把这里做成一个带作者气质的空间，而不只是简历或信息卡。它会展示我的项目、技术、写作，也保留生活观察、审美偏好与长期积累的痕迹。",
  summary:
    "偏爱能被长期维护的系统，也在练习把复杂问题讲得更清楚。最近主要在做 Web 体验、前端工程、内容型产品和个人表达相关的事情。",
  location: "北京",
  email: "2694569918@qq.com",
  social: [
    { label: "GitHub", href: "https://github.com/Ljj-user" },
    { label: "Linktree", href: "https://linktr.ee/XuYao.eth" },
    { label: "Twitter", href: "https://twitter.com" },
  ],
}

const focusAreas = [
  "把博客做成可持续生长的个人主页，而不是一次性的展示页。",
  "持续写技术、项目复盘和生活观察，让内容逐渐长出自己的纹理。",
  "打磨兼具秩序感和作者气质的 Web 体验，保留表达的温度。",
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
          <div className="flex justify-start">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-[2rem] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.14)] sm:h-30 sm:w-30"
            />
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

          <div className="rounded-[2rem] border border-black/10 bg-[#181716] p-5 text-white dark:border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/64">
              <Sparkles className="h-4 w-4" />
              <span>Now</span>
            </div>
            <div className="mt-5 space-y-3">
              {focusAreas.map((item) => (
                <div key={item} className="rounded-[1.35rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-white/66">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {profile.social.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm text-black transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.1]"
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[2.3rem] border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
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
                <p className="mt-5 max-w-2xl text-sm leading-7 text-black/62 dark:text-white/6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[2.3rem] border border-black/10 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Skill Stack</p>
            <div className="mt-6 space-y-4">
              {skillGroups.map((group) => (
                <div key={group.title} className="rounded-[1.7rem] border border-black/8 bg-white/42 p-4 dark:border-white/8 dark:bg-white/[0.03]">
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

          <section className="rounded-[2.3rem] border border-black/10 bg-[#181716] p-6 text-white dark:border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/64">
              <GraduationCap className="h-4 w-4" />
              <span>Education & Contact</span>
            </div>
            <div className="mt-5 rounded-[1.7rem] border border-white/8 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-white/40">{education.period}</p>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-white">{education.school}</h2>
              <p className="mt-2 text-sm leading-7 text-white/62">{education.degree}</p>
            </div>

            <div className="mt-5 rounded-[1.7rem] border border-white/8 bg-white/5 p-5">
              <p className="text-sm leading-7 text-white/64">
                如果你也在做内容型产品、个人博客、前端体验优化，或者只是想交流一下正在推进的东西，都欢迎通过邮件联系我。
              </p>
              <Link
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-black transition-transform hover:scale-[1.02]"
              >
                写封邮件
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
