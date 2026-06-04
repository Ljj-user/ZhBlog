import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Code2, Leaf, Mail, NotebookPen, Sprout } from "lucide-react"
import { PageCanvas, PillLink, SurfaceCard } from "@/components/site/cards"
import { AboutContactSection } from "./about-contact-section"
import { AboutExperienceSection } from "./about-experience-section"
import { AboutFocusSection } from "./about-focus-section"
import { AboutFootprints } from "./about-footprints"
import { AboutStackSection } from "./about-stack-section"
import type { AboutPageViewProps } from "./types"

const topTraits = [
  {
    icon: NotebookPen,
    label: "Content",
    text: "Turn research, judgement, and lived experience into durable public writing.",
  },
  {
    icon: Code2,
    label: "AI",
    text: "Build AI Agents, workflows, and digital products around real use cases.",
  },
  {
    icon: Sprout,
    label: "Compounding",
    text: "Play long games in trading, learning, and personal brand building.",
  },
]

const currentTracks = [
  {
    icon: Sprout,
    title: "AI Agent",
    text: "Designing agent workflows, small automations, and experiments that reduce repeated work.",
  },
  {
    icon: Code2,
    title: "Trading system",
    text: "Refining research, journaling, and review loops so judgement depends less on emotion.",
  },
  {
    icon: NotebookPen,
    title: "Content engine",
    text: "Writing posts, operating niche content accounts, and turning output into long-term leverage.",
  },
]

const stackItems = ["AI", "Product", "Writing", "Crypto", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Git", "Notion", "Figma"]

function FeaturePill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-stone-200 bg-white/82 px-3 py-1.5 text-xs text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-300">
      {text}
    </span>
  )
}

export function AboutPageView({ profile, socialItems }: AboutPageViewProps) {
  const contactCards = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: socialItems.find((item) => item.name === "GitHub")?.href ?? "github.com", href: socialItems.find((item) => item.name === "GitHub")?.href ?? "#" },
    { label: "X", value: socialItems.find((item) => item.name === "X")?.href ?? "@yourname", href: socialItems.find((item) => item.name === "X")?.href ?? "#" },
    { label: "Linktree", value: socialItems.find((item) => item.name === "Linktree")?.href ?? "linktr.ee/yourname", href: socialItems.find((item) => item.name === "Linktree")?.href ?? "#" },
    { label: "Douyin", value: socialItems.find((item) => item.name === "抖音")?.href ?? "@yourname", href: socialItems.find((item) => item.name === "抖音")?.href ?? "#" },
  ]

  return (
    <PageCanvas className="max-w-[1380px] space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-[linear-gradient(180deg,#fcfaf5_0%,#f5f0e6_100%)] shadow-[0_22px_60px_rgba(47,55,48,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,#121917_0%,#18211f_100%)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-0 h-full w-full lg:w-[62%]">
            <Image
              src={profile.coverImage}
              alt={`${profile.name} cover`}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 62vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(252,250,245,0.95)_0%,rgba(252,250,245,0.8)_30%,rgba(252,250,245,0.08)_72%)] dark:bg-[linear-gradient(90deg,rgba(18,25,23,0.96)_0%,rgba(18,25,23,0.84)_30%,rgba(18,25,23,0.18)_72%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(157,176,140,0.24),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(157,176,140,0.12),transparent_30%)]" />
          </div>
        </div>

        <div className="relative px-6 pb-8 pt-6 sm:px-8 lg:px-12 lg:pb-12 lg:pt-10">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-stone-500 dark:text-stone-400">
              <Leaf className="h-4 w-4" />
              <span>Personal operating system</span>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              {socialItems.slice(0, 4).map((item) => (
                <PillLink
                  key={item.name}
                  href={item.href}
                  external={item.href.startsWith("http")}
                  className="border-transparent bg-white/70 text-slate-600 shadow-none hover:border-stone-200 dark:bg-white/[0.06] dark:text-stone-300"
                >
                  {item.name}
                </PillLink>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
            <div className="max-w-[34rem]">
              <h1 className="text-[3rem] font-medium leading-[0.96] tracking-[-0.08em] text-slate-900 dark:text-stone-100 sm:text-[4rem] lg:text-[4.65rem]">
                Building my own
                <span className="mt-1 block font-serif italic text-[#87a675] dark:text-[#99b786]">life operating system.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-[1.02rem] leading-9 text-slate-600 dark:text-stone-300">
                I use this blog as a personal brand homepage, project archive, technical notebook, growth record, photo log, and AI lab, all in one place.
              </p>

              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {topTraits.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="space-y-3">
                      <div className="flex items-center gap-2 text-[#87a675] dark:text-[#99b786]">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <p className="text-sm leading-7 text-slate-600 dark:text-stone-300">{item.text}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="hidden min-h-[23rem] lg:block">
              <div className="ml-auto max-w-[21rem] rounded-[1.6rem] border border-white/45 bg-white/46 p-5 text-right shadow-[0_14px_40px_rgba(47,55,48,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[rgba(18,25,23,0.4)] dark:shadow-none">
                <p className="text-[1.2rem] leading-10 tracking-[0.04em] text-slate-700 dark:text-stone-200">
                  Build slowly, compound deeply;
                  <br />
                  small systems become long leverage.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10 lg:mt-14">
            <SurfaceCard className="rounded-[2rem] border border-stone-200/80 bg-white/82 p-5 shadow-[0_20px_48px_rgba(47,55,48,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(18,25,23,0.72)] sm:p-6 lg:p-8">
              <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr_0.92fr]">
                <div className="space-y-5">
                  <div className="rounded-[1.65rem] border border-stone-200/70 bg-[#fffdf8] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#87a675] dark:text-[#99b786]">Hello, I&apos;m</p>
                        <h2 className="mt-2 text-[2rem] font-medium tracking-[-0.05em] text-slate-900 dark:text-stone-100">{profile.name}</h2>
                        <p className="mt-2 text-lg text-[#6f9460] dark:text-[#99b786]">Computer science undergraduate · AI Builder · Trader · Creator</p>
                      </div>
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-white shadow-[0_14px_28px_rgba(47,55,48,0.08)] dark:border-white/10 dark:bg-white/[0.06]">
                        <Image src={profile.avatar} alt={profile.name} fill sizes="96px" className="object-cover" />
                      </div>
                    </div>

                    <p className="mt-5 text-[0.98rem] leading-8 text-slate-600 dark:text-stone-300">
                      I like researching new technologies, new concepts, and new business opportunities, then turning them into products, systems, and public thinking.
                    </p>

                    <div className="mt-5">
                      <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition-all hover:-translate-y-0.5 hover:border-stone-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200"
                      >
                        View projects
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[1.65rem] border border-stone-200/70 bg-[linear-gradient(180deg,#fbfaf5_0%,#f4efe2_100%)] p-5 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
                    <div className="flex items-center gap-2 text-[#87a675] dark:text-[#99b786]">
                      <Leaf className="h-4 w-4" />
                      <span className="text-sm font-medium">Current status</span>
                    </div>
                    <p className="mt-4 text-[0.98rem] leading-8 text-slate-600 dark:text-stone-300">
                      Working across AI Agents, trading reviews, blog building, and content creation with a strong preference for long-term systems over short-term noise.
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.65rem] border border-stone-200/70 bg-[#fffdf8] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-stone-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white dark:border-white/10 dark:bg-white/[0.06]">
                        <Sprout className="h-4 w-4 text-[#87a675] dark:text-[#99b786]" />
                      </div>
                      <span className="text-[1.55rem] font-medium tracking-[-0.04em]">What I&apos;m doing</span>
                    </div>
                    <Link href="/projects" className="text-sm text-[#87a675] transition-colors hover:text-[#6f9460] dark:text-[#99b786]">
                      More →
                    </Link>
                  </div>

                  <div className="mt-6 space-y-5">
                    {currentTracks.map((item) => {
                      const Icon = item.icon
                      return (
                        <div key={item.title} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded-[1.2rem] border border-stone-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
                            <Icon className="h-7 w-7 text-slate-800 dark:text-stone-100" />
                          </div>
                          <div>
                            <h3 className="text-[1.15rem] font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-stone-300">{item.text}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="rounded-[1.65rem] border border-stone-200/70 bg-[#fffdf8] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-stone-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 bg-white dark:border-white/10 dark:bg-white/[0.06]">
                        <Code2 className="h-4 w-4 text-[#87a675] dark:text-[#99b786]" />
                      </div>
                      <span className="text-[1.55rem] font-medium tracking-[-0.04em]">Stack & tools</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2.5">
                      {stackItems.map((item) => (
                        <FeaturePill key={item} text={item} />
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.65rem] border border-stone-200/70 bg-[#fffdf8] p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-4xl leading-none text-stone-300 dark:text-stone-600">“</p>
                    <p className="mt-3 text-[1rem] leading-8 text-slate-700 dark:text-stone-200">
                      Tools should serve ideas,
                      <br />
                      and ideas should become something people can actually use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                {contactCards.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="rounded-[1.2rem] border border-stone-200 bg-white/78 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-stone-300 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2 text-slate-800 dark:text-stone-100">
                      {item.label === "Email" ? <Mail className="h-4 w-4" /> : item.label === "GitHub" ? <Code2 className="h-4 w-4" /> : item.label === "Linktree" ? <Leaf className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <p className="mt-2 truncate text-sm text-slate-500 dark:text-stone-400">{item.value}</p>
                  </Link>
                ))}
              </div>
            </SurfaceCard>
          </div>
        </div>
      </section>

      <AboutFootprints />
      <AboutFocusSection items={profile.focusAreas} />
      <AboutExperienceSection items={profile.experience} />
      <AboutStackSection skillGroups={profile.skillGroups} education={profile.education} />
      <AboutContactSection email={profile.email} copy={profile.contactCopy} socialItems={socialItems} />
    </PageCanvas>
  )
}
