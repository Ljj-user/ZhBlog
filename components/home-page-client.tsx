"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { ArrowRight, Camera, Compass, MapPin, NotebookPen } from "lucide-react"
import { InsetCard, NoticeCard, PolaroidPhotoCard, PostPreviewCard, QuickLinkCard, SurfaceCard } from "@/components/site/cards"
import type { HomeContent, SiteProfile } from "@/lib/content"
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
}

function ProfileSidebar({ profile }: { profile: SiteProfile }) {
  return (
    <SurfaceCard className="overflow-hidden">
      <div className="relative h-32 overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(135deg,rgba(250,225,210,0.8),rgba(218,234,238,0.85))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(83,64,52,0.55),rgba(39,57,66,0.6))]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${profile.coverImage}')` }} />
        <div className="absolute left-5 top-4 rounded-full border border-white/70 bg-white/72 px-4 py-1.5 text-[0.68rem] tracking-[0.28em] text-slate-500 backdrop-blur dark:border-white/12 dark:bg-white/10 dark:text-slate-300">
          PERSONAL LOGBOOK
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-6">
        <div className="-mt-12 flex items-end justify-between">
          <div className="relative h-24 w-24 overflow-hidden rounded-[1.55rem] border-[5px] border-white bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-900 dark:bg-slate-900">
            <Image src={profile.avatar} alt={`${profile.siteTitle} avatar`} fill className="object-cover" />
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.68rem] tracking-[0.22em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {profile.availabilityLabel}
          </span>
        </div>

        <div className="mt-4">
          <h1 className="font-display text-[1.8rem] tracking-[-0.04em] text-slate-800 dark:text-slate-100">{profile.siteTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{profile.bio}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {profile.profileTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>{profile.focusSummary}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-2.5">
          <QuickLinkCard label="关于我" description="作者介绍、经历和正在关注的事。" href="/about" />
          <QuickLinkCard
            label={profile.homeSidebarEmailLabel}
            description={profile.homeSidebarEmailDescription}
            href={`mailto:${profile.email}`}
          />
        </div>
      </div>
    </SurfaceCard>
  )
}

function HomeHero({ homeContent }: { homeContent: HomeContent }) {
  return (
    <SurfaceCard className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(31,41,55,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="relative min-h-[340px] p-7 sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,233,218,0.85),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(216,230,235,0.42))] dark:bg-[radial-gradient(circle_at_top_left,rgba(124,96,78,0.3),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02),rgba(70,96,111,0.18))]" />

        <div className="relative flex h-full flex-col justify-center">
          <p className="text-sm tracking-[0.32em] text-slate-400 dark:text-slate-500">{homeContent.hero.eyebrow}</p>
          <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-slate-800 sm:text-6xl dark:text-slate-100">
            {homeContent.hero.titleLine1}
            <br />
            {homeContent.hero.titleLine2}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-500 dark:text-slate-400">{homeContent.hero.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm text-white transition-transform hover:scale-[1.02] dark:bg-white dark:text-slate-900"
            >
              去看文章
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/archive"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
            >
              打开归档
              <Compass className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}

function DesignMediaCard({ homeContent }: { homeContent: HomeContent }) {
  return (
    <SurfaceCard className="relative overflow-hidden rounded-[1.75rem] p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${homeContent.designMedia.backgroundImage}')` }}
      />
      <div className="absolute inset-0 bg-white/74 dark:bg-slate-950/58" />
      <InsetCard className="relative border-dashed bg-white/52 dark:bg-white/[0.03]">
        <p className="text-[0.68rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">{homeContent.designMedia.eyebrow}</p>
        <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">{homeContent.designMedia.title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{homeContent.designMedia.description}</p>
      </InsetCard>
    </SurfaceCard>
  )
}

function PlayerPlaceholder({ homeContent }: { homeContent: HomeContent }) {
  return (
    <SurfaceCard className="rounded-[1.75rem] p-4">
      <InsetCard>
        <p className="text-[0.68rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">{homeContent.player.eyebrow}</p>
        <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">{homeContent.player.title}</h3>
        <InsetCard className="mt-4 bg-white/88 dark:bg-white/[0.04]">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
            <span>Now Playing</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">00:00 / 00:00</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="mt-4 flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-slate-900 dark:bg-white" />
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        </InsetCard>
      </InsetCard>
    </SurfaceCard>
  )
}

function PhotoGallerySection({
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
    <SurfaceCard className="rounded-[2.2rem] p-5 sm:p-6 lg:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">{homeContent.photoStrip.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-medium text-slate-800 dark:text-slate-100">{homeContent.photoStrip.title}</h3>
        </div>
        <Link href="/photos" className="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
          查看全部
        </Link>
      </div>

      <div className="mt-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-[0.68rem] tracking-[0.24em] text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            {homeContent.photoStrip.badge}
          </div>
          <p className="hidden text-sm text-slate-400 dark:text-slate-500 lg:block">{homeContent.photoStrip.description}</p>
        </div>

        <div
          ref={stripRef}
          className={`overflow-x-auto pb-4 pt-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDraggingStrip ? "cursor-grabbing select-none" : "cursor-grab"}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => endDrag(event.pointerId)}
          onPointerCancel={(event) => endDrag(event.pointerId)}
          onPointerLeave={() => endDrag()}
        >
          <div className="flex min-w-max items-start gap-4 pr-3 xl:gap-5 xl:pr-5">
            <Link
              href="/photos"
              onClickCapture={handleCardClickCapture}
              className="group order-last block w-[10.4rem] flex-none rounded-[1.25rem] border border-dashed border-slate-200 bg-[linear-gradient(135deg,rgba(255,246,236,0.95),rgba(240,246,248,0.95))] p-4 shadow-[0_18px_36px_rgba(31,41,55,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(31,41,55,0.12)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(109,82,63,0.12),rgba(64,90,103,0.14))] lg:mt-6 xl:w-[10.9rem]"
            >
              <div className="flex h-full min-h-[286px] flex-col justify-between rounded-[0.95rem] border border-white/60 bg-white/70 p-[1.125rem] dark:border-white/10 dark:bg-white/[0.05] lg:min-h-[312px]">
                <div>
                  <p className="text-[0.65rem] tracking-[0.24em] text-slate-400 dark:text-slate-500">COVER FRAME</p>
                  <h4 className="mt-3 text-[1.45rem] font-medium leading-tight text-slate-800 dark:text-slate-100 lg:text-[1.6rem]">
                    {homeContent.photoStrip.coverTitleLine1}
                    <br />
                    {homeContent.photoStrip.coverTitleLine2}
                  </h4>
                  <p className="mt-3 text-[0.82rem] leading-6 text-slate-500 dark:text-slate-400">{homeContent.photoStrip.coverDescription}</p>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3.5 text-[0.68rem] text-slate-400 dark:border-white/10 dark:text-slate-500">
                  <span>Open Album</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {featuredPhotos.map((photo, index) => (
              <PolaroidPhotoCard
                key={photo.id}
                title={photo.alt}
                note={`${photo.category} / ${photo.albumName}`}
                image={photo.src}
                href="/photos"
                index={index}
                onClickCapture={handleCardClickCapture}
              />
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  )
}

function RecentWritingSection({ posts, homeContent }: { posts: PostMeta[]; homeContent: HomeContent }) {
  return (
    <SurfaceCard className="rounded-[2.2rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">{homeContent.recentWriting.eyebrow}</p>
          <h3 className="mt-2 text-2xl font-medium text-slate-800 dark:text-slate-100">{homeContent.recentWriting.title}</h3>
        </div>
        <Link href="/posts" className="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
          {homeContent.recentWriting.linkLabel}
        </Link>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {posts.map((post, index) => (
          <PostPreviewCard key={post.slug} post={post} featured={index === 0} />
        ))}
      </div>
    </SurfaceCard>
  )
}

function RightRail({ homeContent }: { homeContent: HomeContent }) {
  return (
    <div className="space-y-5">
      <NoticeCard
        eyebrow={homeContent.nowCard.eyebrow}
        title={homeContent.nowCard.title}
        items={homeContent.nowCard.items}
        iconName="sparkles"
        className="relative overflow-hidden"
      />
      <NoticeCard eyebrow={homeContent.noticeCard.eyebrow} title={homeContent.noticeCard.title} items={homeContent.noticeCard.items} />

      <SurfaceCard className="rounded-[1.7rem] p-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Camera className="h-4 w-4" />
          <span>Quick Entry</span>
        </div>

        <div className="mt-3 grid gap-2.5">
          {homeContent.quickLinks.map((item) => (
            <QuickLinkCard key={item.label} {...item} />
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}

function LeftColumn({ profile, homeContent }: { profile: SiteProfile; homeContent: HomeContent }) {
  return (
    <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
      <ProfileSidebar profile={profile} />
      <DesignMediaCard homeContent={homeContent} />
      <PlayerPlaceholder homeContent={homeContent} />
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
      <HomeHero homeContent={homeContent} />
      <PhotoGallerySection homeContent={homeContent} featuredPhotos={featuredPhotos} />
      <RecentWritingSection posts={posts} homeContent={homeContent} />
    </section>
  )
}

function RightColumn({ homeContent }: { homeContent: HomeContent }) {
  return (
    <aside className="xl:sticky xl:top-28 xl:self-start xl:pb-6">
      <RightRail homeContent={homeContent} />
    </aside>
  )
}

export function HomePageClient({ posts, profile, homeContent, featuredPhotos }: HomePageClientProps) {
  return (
    <main className="relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,240,223,0.92),transparent_30%),radial-gradient(circle_at_top_right,rgba(211,231,238,0.8),transparent_32%),linear-gradient(180deg,rgba(252,248,242,0.98),rgba(246,240,233,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(95,75,58,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(71,98,112,0.2),transparent_32%),linear-gradient(180deg,rgba(16,19,24,0.98),rgba(12,15,19,0.98))]" />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />
      </div>

      <div className="mx-auto max-w-[1480px] px-4 pb-12 pt-8 sm:px-6 lg:px-10 lg:pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1.62fr)_210px] 2xl:grid-cols-[300px_minmax(0,1.76fr)_230px]">
            <LeftColumn profile={profile} homeContent={homeContent} />
            <CenterColumn posts={posts} homeContent={homeContent} featuredPhotos={featuredPhotos} />
            <RightColumn homeContent={homeContent} />
          </div>
        </div>
      </div>
    </main>
  )
}
