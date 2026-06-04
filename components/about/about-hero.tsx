import Image from "next/image"
import { ArrowUpRight, Mail, MapPin } from "lucide-react"
import { PillLink, SectionHeader, SurfaceCard } from "@/components/site/cards"
import type { SiteProfile, SocialLink } from "@/lib/content"
import type { AboutNarrative, AboutSignal } from "./types"

function SignalPill({ label, value }: AboutSignal) {
  return (
    <div className="rounded-[1rem] border border-stone-200/80 bg-white/70 px-4 py-3 shadow-[0_10px_24px_rgba(47,55,48,0.05)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-stone-200">{value}</p>
    </div>
  )
}

export function AboutHero({
  profile,
  socialItems,
  narrative,
  signals,
}: {
  profile: SiteProfile
  socialItems: SocialLink[]
  narrative: AboutNarrative[]
  signals: AboutSignal[]
}) {
  return (
    <SurfaceCard className="overflow-hidden p-0">
      <div className="relative h-56 w-full sm:h-72 lg:h-80">
        {profile.coverImage ? (
          <Image
            src={profile.coverImage}
            alt={`${profile.name} cover`}
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 1260px"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-200 dark:bg-stone-800" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,250,246,0.08),rgba(251,250,246,0.9))] dark:bg-[linear-gradient(180deg,rgba(20,24,22,0.04),rgba(20,24,22,0.92))]" />
      </div>

      <div className="relative px-5 pb-8 sm:px-8 lg:px-10">
        <div className="-mt-18 flex flex-col gap-6 lg:-mt-22">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative h-28 w-28 overflow-hidden rounded-[2rem] border-[4px] border-[#fbfaf6] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.14)] dark:border-[#141816] dark:bg-stone-950 dark:shadow-none sm:h-36 sm:w-36">
                <Image src={profile.avatar} alt={profile.name} fill sizes="(max-width: 639px) 112px, 144px" className="object-cover" />
              </div>

              <div className="pb-2">
                <SectionHeader eyebrow="About the author" title={profile.name} className="gap-2" />
                <p className="mt-2 text-base text-slate-600 dark:text-stone-300 sm:text-lg">{profile.role}</p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {signals.map((signal) => (
                <SignalPill key={signal.label} {...signal} />
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_320px]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {profile.aboutTags.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-200 bg-white/62 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {narrative.map((section) => (
                  <div key={section.title} className="rounded-[1.5rem] border border-stone-200/70 bg-white/58 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{section.eyebrow}</p>
                    <h2 className="mt-3 text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{section.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-stone-300">{section.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.5rem] border border-stone-200/70 bg-white/62 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.aboutLocation}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{profile.email}</span>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-stone-300">{profile.contactCopy}</p>
              </div>

              <div className="rounded-[1.5rem] border border-stone-200/70 bg-white/62 p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">Social corners</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialItems.map((item) => (
                    <PillLink
                      key={item.name}
                      href={item.href}
                      external={item.href.startsWith("http")}
                      className="bg-white/80 dark:bg-white/[0.08]"
                    >
                      {item.name}
                      <ArrowUpRight className="h-4 w-4" />
                    </PillLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}
