"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowRight, AtSign, Compass, Github, Link2, MapPin, Music2, Network, NotebookPen, Sparkles } from "lucide-react"
import { NoticeCard, PostPreviewCard, QuickLinkCard, SurfaceCard } from "@/components/site/cards"
import type { HomeContent, SiteProfile, SocialLink } from "@/lib/content"
import type { PostMeta } from "@/lib/posts"

interface FeaturedPhotoCard {
  id: string
  alt: string
  category: string
  albumName: string
  src: string
}

interface HomePageClientProps {
  posts: PostMeta[]
  profile: SiteProfile
  homeContent: HomeContent
  featuredPhotos: FeaturedPhotoCard[]
  socialItems: SocialLink[]
}

function ProfileSidebar({ profile }: { profile: SiteProfile }) {
  return (
    <SurfaceCard className="overflow-hidden p-0">
      <div className="relative h-24 overflow-hidden border-b border-stone-200/80 bg-stone-100 dark:border-white/10 dark:bg-stone-900">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${profile.coverImage}')` }} />
        <div className="absolute inset-0 bg-white/10 dark:bg-black/18" />
        <div className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/74 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone-500 backdrop-blur dark:border-white/12 dark:bg-white/10 dark:text-stone-300">
          PERSONAL LOGBOOK
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="-mt-10 flex items-end justify-between">
          <div className="relative h-[4.8rem] w-[4.8rem] overflow-hidden rounded-[1.1rem] border-[4px] border-[#fbfaf6] bg-white shadow-[0_12px_28px_rgba(47,55,48,0.14)] dark:border-[#141816] dark:bg-stone-900">
            <Image src={profile.avatar} alt={`${profile.siteTitle} avatar`} fill className="object-cover" />
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {profile.availabilityLabel}
          </span>
        </div>

        <div className="mt-3">
          <h1 className="font-display text-[1.62rem] tracking-[-0.04em] text-slate-900 dark:text-stone-100">{profile.siteTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-stone-400">{profile.bio}</p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {profile.profileTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 bg-white/58 px-2.5 py-1 text-[0.72rem] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 space-y-2.5 border-t border-stone-200/80 pt-3.5 text-sm text-slate-500 dark:border-white/10 dark:text-stone-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-stone-400 dark:text-stone-500" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-stone-400 dark:text-stone-500" />
            <span>{profile.focusSummary}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          <QuickLinkCard label="About me" description="Author profile, background, and current focus." href="/about" />
          <QuickLinkCard label={profile.homeSidebarEmailLabel} description={profile.homeSidebarEmailDescription} href={`mailto:${profile.email}`} />
        </div>
      </div>
    </SurfaceCard>
  )
}

function HomeHero({
  homeContent,
  profile,
  featuredPhotos,
}: {
  homeContent: HomeContent
  profile: SiteProfile
  featuredPhotos: FeaturedPhotoCard[]
}) {
  const heroPhoto = featuredPhotos[0]
  const previewPhotos = featuredPhotos.slice(1, 4)
  const heroImage = heroPhoto?.src ?? profile.coverImage

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(70,84,72,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(70,84,72,0.06)_1px,transparent_1px)] [background-size:32px_32px] dark:opacity-16" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(238,243,237,0.82))] dark:bg-[linear-gradient(180deg,transparent,rgba(16,22,19,0.9))]" />

      <div className="relative mx-auto max-w-[1480px] px-4 pb-14 pt-16 sm:px-6 lg:px-10 lg:pb-18 lg:pt-20">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_420px] xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="max-w-4xl">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-stone-400 dark:text-stone-500">{homeContent.hero.eyebrow}</p>

            <h2 className="mt-7 max-w-5xl font-display text-5xl leading-[1.06] text-slate-950 sm:text-6xl lg:text-[5.8rem] lg:leading-[1.02] dark:text-stone-50">
              {homeContent.hero.titleLine1}
              <br />
              {homeContent.hero.titleLine2}
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 dark:text-stone-300">{homeContent.hero.description}</p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/posts"
                className="inline-flex items-center gap-2 rounded-full bg-[#17211d] px-6 py-3 text-sm text-white shadow-[0_12px_28px_rgba(23,33,29,0.18)] transition-transform hover:-translate-y-0.5 dark:bg-stone-50 dark:text-[#17211d]"
              >
                Read posts
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/archive"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/72 px-6 py-3 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:hover:bg-white/[0.1]"
              >
                Open archive
                <Compass className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-14 flex max-w-2xl flex-wrap gap-x-10 gap-y-5 border-t border-stone-200/80 pt-5 text-sm text-slate-500 dark:border-white/10 dark:text-stone-400">
              {[
                ["Creative tags", String(profile.profileTags.length)],
                ["Featured photos", String(featuredPhotos.length)],
                ["Updated through", "2026"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="font-display text-2xl text-slate-900 dark:text-stone-100">{value}</p>
                  <p className="mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[430px] lg:block">
            <div className="absolute bottom-0 right-0 w-[78%] overflow-hidden rounded-[1.4rem] bg-stone-100 shadow-[0_24px_60px_rgba(47,55,48,0.16)] ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-white/10">
              <div className="relative aspect-[4/5.2]">
                <Image src={heroImage} alt={heroPhoto?.alt ?? profile.siteTitle} fill priority className="object-cover" />
              </div>
            </div>

            <div className="absolute left-0 top-14 w-[13.5rem] rounded-[1.2rem] border border-stone-200 bg-[#fbfaf6]/86 p-3 shadow-[0_18px_44px_rgba(47,55,48,0.12)] backdrop-blur dark:border-white/10 dark:bg-[#141816]/86">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-[0.9rem] bg-stone-100">
                  <Image src={profile.avatar} alt={`${profile.siteTitle} avatar`} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-stone-100">{profile.siteTitle}</p>
                  <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">{profile.availabilityLabel}</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-4 flex items-end gap-2">
              {previewPhotos.map((photo) => (
                <Link
                  key={photo.id}
                  href="/photos"
                  className="group block w-16 overflow-hidden rounded-[0.8rem] bg-white p-1.5 shadow-[0_12px_30px_rgba(47,55,48,0.12)] ring-1 ring-stone-200 transition-transform hover:-translate-y-1 dark:bg-stone-950 dark:ring-white/10"
                >
                  <div className="relative aspect-[4/5]">
                    <Image src={photo.src} alt={photo.alt} fill className="rounded-[0.55rem] object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DesignMediaCard({ homeContent, socialItems }: { homeContent: HomeContent; socialItems: SocialLink[] }) {
  const getSocialIcon = (name: string) => {
    const normalizedName = name.toLowerCase()
    if (normalizedName.includes("github")) return Github
    if (name.includes("抖音")) return Music2
    if (normalizedName === "x") return AtSign
    if (normalizedName.includes("linktree")) return Network
    return Link2
  }

  return (
    <SurfaceCard className="relative h-[11.75rem] overflow-hidden p-0">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${homeContent.designMedia.backgroundImage}')` }} />
      <div className="absolute inset-0 bg-[#fbfaf6]/46 backdrop-blur-[1.25px] dark:bg-[#141816]/62" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.74),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.54))] dark:bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.28))]" />
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f6c85f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#52c16a]" />
        </div>
        <div className="h-2 w-16 rounded-full bg-white/66 shadow-sm dark:bg-white/12" />
      </div>

      <div className="pointer-events-none absolute inset-x-9 top-16 h-px bg-white/62 shadow-[0_1px_12px_rgba(255,255,255,0.6)] dark:bg-white/14" />

      <div className="absolute inset-x-4 bottom-4">
        <div className="grid grid-cols-4 gap-2">
          {socialItems.map((item, index) => {
            const Icon = getSocialIcon(item.name)
            return (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                title={item.name}
                className="group grid aspect-square place-items-center rounded-[0.95rem] border border-white/72 bg-white/66 text-slate-700 shadow-[0_12px_24px_rgba(47,55,48,0.11)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white dark:border-white/10 dark:bg-white/[0.1] dark:text-stone-100 dark:hover:bg-white/[0.16]"
                style={{ transitionDelay: `${index * 24}ms` }}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Link>
            )
          })}
        </div>
      </div>
    </SurfaceCard>
  )
}

function PhotoGallerySectionCanvas({
  homeContent,
  featuredPhotos,
}: {
  homeContent: HomeContent
  featuredPhotos: FeaturedPhotoCard[]
}) {
  const stripRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef({ isDragging: false, startX: 0, scrollLeft: 0, moved: false })
  const [isDraggingStrip, setIsDraggingStrip] = useState(false)

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = stripRef.current
    if (!container || event.button !== 0) return

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
      moved: false,
    }
    setIsDraggingStrip(false)
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = stripRef.current
    const dragState = dragStateRef.current
    if (!container || !dragState.isDragging) return

    const deltaX = event.clientX - dragState.startX
    if (!dragState.moved && Math.abs(deltaX) > 6) {
      dragState.moved = true
      setIsDraggingStrip(true)
    }

    container.scrollLeft = dragState.scrollLeft - deltaX
  }

  const endDrag = (pointerId?: number) => {
    const container = stripRef.current
    if (container && pointerId !== undefined && container.hasPointerCapture(pointerId)) {
      container.releasePointerCapture(pointerId)
    }

    dragStateRef.current.isDragging = false
    window.setTimeout(() => setIsDraggingStrip(false), 40)
  }

  const handleCardClickCapture = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragStateRef.current.moved) event.preventDefault()
  }

  return (
    <SurfaceCard className="overflow-hidden rounded-[1.65rem] border-stone-200/80 bg-[#fbfaf6]/88 p-0 shadow-[0_18px_55px_rgba(47,55,48,0.1)] dark:border-white/10 dark:bg-[#141816]/88 dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)]">
      <div className="border-b border-stone-200/80 bg-white/62 px-4 py-3 backdrop-blur dark:border-white/10 dark:bg-white/[0.04] sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b5f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f6c85f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#52c16a]" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">{homeContent.photoStrip.eyebrow}</p>
              <h3 className="mt-1 truncate text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{homeContent.photoStrip.title}</h3>
              <p className="mt-1 text-xs text-stone-400 dark:text-stone-500">Drag horizontally to browse the strip.</p>
            </div>
          </div>

          <Link
            href="/photos"
            className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/78 px-3.5 py-2 text-sm text-slate-600 transition hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-300 dark:hover:bg-white/[0.09]"
          >
            See all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.38),rgba(238,235,226,0.42))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(0,0,0,0.12))]">
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(69,79,70,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(69,79,70,0.06)_1px,transparent_1px)] [background-size:22px_22px] dark:opacity-20" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-[linear-gradient(90deg,#fbfaf6,rgba(251,250,246,0))] dark:bg-[linear-gradient(90deg,#141816,rgba(20,24,22,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-[linear-gradient(270deg,#fbfaf6,rgba(251,250,246,0))] dark:bg-[linear-gradient(270deg,#141816,rgba(20,24,22,0))]" />

        <div
          ref={stripRef}
          className={`relative z-10 overflow-x-auto px-4 py-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 lg:py-6 ${
            isDraggingStrip ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => endDrag(event.pointerId)}
          onPointerCancel={(event) => endDrag(event.pointerId)}
          onPointerLeave={() => endDrag()}
        >
          <div className="flex min-w-max items-stretch gap-3 pr-8 sm:gap-4">
            <Link
              href="/photos"
              onClickCapture={handleCardClickCapture}
              className="group flex w-[13rem] flex-none flex-col justify-between rounded-[1.15rem] border border-dashed border-stone-300 bg-white/72 p-4 transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            >
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">{homeContent.photoStrip.badge}</p>
                <h4 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.04em] text-slate-900 dark:text-stone-100">
                  {homeContent.photoStrip.coverTitleLine1}
                  <br />
                  {homeContent.photoStrip.coverTitleLine2}
                </h4>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-3 text-sm text-slate-500 dark:border-white/10 dark:text-stone-400">
                <span>Open album</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {featuredPhotos.map((photo, index) => (
              <Link
                key={photo.id}
                href="/photos"
                onClickCapture={handleCardClickCapture}
                className="group w-[12.25rem] flex-none rounded-[1.1rem] border border-stone-200 bg-white p-2.5 shadow-[0_12px_28px_rgba(31,41,55,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_40px_rgba(31,41,55,0.12)] dark:border-white/10 dark:bg-stone-950 dark:hover:border-white/20"
              >
                <div className="relative overflow-hidden rounded-[0.85rem] bg-stone-100 dark:bg-stone-900">
                  <div className="relative aspect-[4/5]">
                    <Image src={photo.src} alt={photo.alt} fill draggable={false} className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                </div>
                <div className="px-1 pb-1 pt-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">
                    {String(index + 1).padStart(2, "0")} / {photo.category}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <h4 className="min-w-0 truncate text-base font-medium text-slate-900 dark:text-stone-100">{photo.alt}</h4>
                    <span className="shrink-0 rounded-full border border-stone-200 px-2 py-0.5 text-[0.62rem] text-stone-400 dark:border-white/10 dark:text-stone-500">
                      {photo.albumName}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}

function RecentWritingSection({ posts, homeContent }: { posts: PostMeta[]; homeContent: HomeContent }) {
  return (
    <SurfaceCard className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">{homeContent.recentWriting.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-slate-900 dark:text-stone-100">{homeContent.recentWriting.title}</h3>
        </div>
        <Link href="/posts" className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-stone-400 dark:hover:text-white">
          {homeContent.recentWriting.linkLabel}
        </Link>
      </div>

      <div className="mt-5 grid gap-2.5">
        {posts.map((post) => (
          <PostPreviewCard key={post.slug} post={post} compact />
        ))}
      </div>
    </SurfaceCard>
  )
}

function LeftColumn({ profile, homeContent, socialItems }: { profile: SiteProfile; homeContent: HomeContent; socialItems: SocialLink[] }) {
  return (
    <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
      <ProfileSidebar profile={profile} />
      <DesignMediaCard homeContent={homeContent} socialItems={socialItems} />
      <NoticeCard eyebrow={homeContent.nowCard.eyebrow} title={homeContent.nowCard.title} items={homeContent.nowCard.items} iconName="sparkles" />
    </aside>
  )
}

function CenterColumn({
  posts,
  homeContent,
  featuredPhotos,
}: {
  posts: PostMeta[]
  homeContent: HomeContent
  featuredPhotos: FeaturedPhotoCard[]
}) {
  return (
    <section className="space-y-6">
      <RecentWritingSection posts={posts} homeContent={homeContent} />
      <PhotoGallerySectionCanvas homeContent={homeContent} featuredPhotos={featuredPhotos} />
    </section>
  )
}

export function HomePageClient({ posts, profile, homeContent, featuredPhotos, socialItems }: HomePageClientProps) {
  return (
    <main className="relative overflow-x-clip">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6efe3_0%,#eef3ed_44%,#f5eee4_100%)] dark:bg-[linear-gradient(180deg,#101613_0%,#15201d_44%,#0e1211_100%)]" />
        <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(70,84,72,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(70,84,72,0.08)_1px,transparent_1px)] [background-size:30px_30px] dark:opacity-20" />
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <div className="mx-auto max-w-[1840px] px-4 pb-12 pt-8 sm:px-6 lg:px-6 lg:pt-10">
        <div className="mx-auto max-w-[1800px]">
          <div className="space-y-8">
            <HomeHero homeContent={homeContent} profile={profile} featuredPhotos={featuredPhotos} />

            <div className="mx-auto max-w-[1260px]">
              <div className="grid items-start gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
                <LeftColumn profile={profile} homeContent={homeContent} socialItems={socialItems} />
                <CenterColumn posts={posts} homeContent={homeContent} featuredPhotos={featuredPhotos} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
