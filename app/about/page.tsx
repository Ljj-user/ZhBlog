import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, MapPin } from "lucide-react"
import { NoticeCard, PillLink, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { getSiteProfile, getSocialItems } from "@/lib/content"

export const metadata = {
  title: "关于",
  description: "认识 ZH_Blog 背后的作者与正在推进的事情。",
}

export default function AboutPage() {
  const profile = getSiteProfile()
  const socialItems = getSocialItems()

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">
      <SurfaceCard className="p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[120px_minmax(0,1fr)_320px] lg:items-start">
          <div className="flex flex-col items-start gap-4">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={120}
              height={120}
              className="h-28 w-28 rounded-[2rem] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.14)] sm:h-30 sm:w-30"
            />
            <div className="flex flex-wrap gap-2">
              {profile.aboutTags.map((item) => (
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
            <SectionHeader eyebrow="ABOUT THE AUTHOR" title={profile.name} />
            <p className="mt-3 text-lg text-black/60 dark:text-white/58">{profile.role}</p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-black/56 dark:text-white/56">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/56 px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
                <MapPin className="h-4 w-4" />
                {profile.aboutLocation}
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

          <NoticeCard eyebrow="Now" title="当前关注" items={profile.focusAreas} iconName="sparkles" className="p-0 shadow-none" />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {socialItems.map((item) => (
            <PillLink key={item.name} href={item.href} external={item.href.startsWith("http")}>
              {item.name}
              <ArrowUpRight className="h-4 w-4" />
            </PillLink>
          ))}
        </div>
      </SurfaceCard>

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <SurfaceCard className="h-fit p-6 lg:col-start-1">
          <div className="flex items-center gap-2 text-sm text-black/62 dark:text-white/62">
            <BriefcaseBusiness className="h-4 w-4" />
            <span>Experience</span>
          </div>
          <div className="mt-6 space-y-4">
            {profile.experience.map((item) => (
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
        </SurfaceCard>

        <SurfaceCard className="h-fit p-6 lg:col-start-2 lg:row-span-2">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">Skill Stack</p>
          <div className="mt-6 space-y-4">
            {profile.skillGroups.map((group) => (
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
        </SurfaceCard>

        <div className="space-y-5 lg:col-start-1">
          <SurfaceCard className="h-fit border-[rgba(64,45,28,0.12)] bg-[linear-gradient(180deg,rgba(251,247,242,0.94),rgba(243,235,227,0.9))] p-6 text-slate-800 shadow-[0_22px_55px_rgba(58,38,19,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] dark:text-white dark:shadow-none">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/64">
              <GraduationCap className="h-4 w-4" />
              <span>Education</span>
            </div>

            <div className="mt-5 rounded-[1.7rem] border border-[rgba(64,45,28,0.1)] bg-white/62 p-5 shadow-[0_10px_28px_rgba(87,62,38,0.06)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-white/40">{profile.education.period}</p>
              <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] text-slate-900 dark:text-white">{profile.education.school}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/62">{profile.education.degree}</p>
            </div>
          </SurfaceCard>

          <SurfaceCard className="h-fit border-[rgba(64,45,28,0.12)] bg-[linear-gradient(180deg,rgba(251,247,242,0.94),rgba(243,235,227,0.9))] p-6 text-slate-800 shadow-[0_22px_55px_rgba(58,38,19,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] dark:text-white dark:shadow-none">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/64">
              <Mail className="h-4 w-4" />
              <span>Contact</span>
            </div>

            <div className="mt-5 rounded-[1.7rem] border border-[rgba(64,45,28,0.1)] bg-white/58 p-5 shadow-[0_10px_28px_rgba(87,62,38,0.06)] dark:border-white/8 dark:bg-white/[0.04] dark:shadow-none">
              <p className="text-sm leading-7 text-slate-600 dark:text-white/64">{profile.contactCopy}</p>
              <Link
                href={`mailto:${profile.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-[rgba(64,45,28,0.12)] bg-[#f7f2eb] px-5 py-3 text-sm text-slate-900 transition-colors hover:bg-[#f1e9df] dark:border-white/10 dark:bg-white/[0.08] dark:text-white dark:hover:bg-white/[0.12]"
              >
                写封邮件
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </SurfaceCard>
        </div>
      </section>
    </main>
  )
}
