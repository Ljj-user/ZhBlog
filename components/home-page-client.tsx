"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import {
  ArrowRight,
  Camera,
  Compass,
  Mail,
  MapPin,
  NotebookPen,
  Sparkles,
} from "lucide-react"
import type { PostMeta } from "@/lib/posts"

const profileTags = ["写作中", "搭建中", "持续更新"]

const quickLinks = [
  { label: "最近文章", description: "按篇阅读最新输出", href: "/posts" },
  { label: "时间归档", description: "像日记一样回看记录", href: "/archive" },
  { label: "照片页", description: "留一些生活和风景", href: "/photos" },
  { label: "项目集", description: "整理做过的东西", href: "/projects" },
]

const journalNotes = [
  "把博客做成一个会慢慢长出来的个人角落，而不只是作品列表。",
  "记录项目、写作、观察和阶段性情绪，让内容自己形成纹理。",
  "保留一点手账和拼贴感，让页面看起来更像人而不是模板。",
]

const noticeItems = [
  "这里会持续更新文章、项目和照片内容。",
  "归档页更适合按时间浏览，文章页更适合按篇阅读。",
  "首页正在往更个人化的长期博客方向继续打磨。",
]

const photoCards = [
  {
    title: "风从山脊吹过",
    note: "旅行 / 手记",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=1500&fit=crop",
    href: "/photos",
  },
  {
    title: "一片安静的湖",
    note: "自然 / 片刻",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=900&h=1200&fit=crop",
    href: "/photos",
  },
  {
    title: "傍晚的海边",
    note: "日常 / 呼吸",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=900&h=1200&fit=crop",
    href: "/photos",
  },
  {
    title: "晨光落在树影",
    note: "自然 / 光影",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&h=1200&fit=crop",
    href: "/photos",
  },
]

const polaroidRotations = ["-rotate-[3.5deg]", "rotate-[2.4deg]", "-rotate-[1.6deg]", "rotate-[3.1deg]"]
const polaroidOffsets = ["lg:mt-5", "lg:-mt-1", "lg:mt-4", "lg:mt-10"]
const polaroidWidths = ["lg:w-[10.5rem] xl:w-[11.1rem]", "lg:w-[9.9rem] xl:w-[10.5rem]", "lg:w-[10.6rem] xl:w-[11.2rem]", "lg:w-[9.5rem] xl:w-[10.1rem]"]

interface HomePageClientProps {
  posts: PostMeta[]
}

function ShellCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-[2rem] border border-white/70 bg-white/78 shadow-[0_24px_70px_rgba(31,41,55,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_16px_50px_rgba(0,0,0,0.2)] ${className}`}
    >
      {children}
    </section>
  )
}

function ProfileSidebar() {
  return (
    <ShellCard className="overflow-hidden">
      <div className="relative h-32 overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(135deg,rgba(250,225,210,0.8),rgba(218,234,238,0.85))] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(83,64,52,0.55),rgba(39,57,66,0.6))]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.111666.best/image/ubycSzswsLu9JWT1r9S9fG.png')" }}
        />
        <div className="absolute left-5 top-4 rounded-full border border-white/70 bg-white/72 px-4 py-1.5 text-[0.68rem] tracking-[0.28em] text-slate-500 backdrop-blur dark:border-white/12 dark:bg-white/10 dark:text-slate-300">
          PERSONAL LOGBOOK
        </div>
      </div>

      <div className="px-5 pb-5 pt-4 sm:px-6">
        <div className="-mt-12 flex items-end justify-between">
          <div className="relative h-24 w-24 overflow-hidden rounded-[1.55rem] border-[5px] border-white bg-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] dark:border-slate-900 dark:bg-slate-900">
            <Image src="https://i.111666.best/image/Tddzv0tWETjSjAcJORc6fE.png" alt="ZH_Blog avatar" fill className="object-cover" />
          </div>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[0.68rem] tracking-[0.22em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            ONLINE
          </span>
        </div>

        <div className="mt-4">
          <h1 className="font-display text-[1.8rem] tracking-[-0.04em] text-slate-800 dark:text-slate-100">ZH_Blog</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            一个把文章、项目、照片和成长片段都放在一起的个人站点。
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {profileTags.map((tag) => (
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
            <span>中国 / 远程友好 / 个人创作</span>
          </div>
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <span>写作、前端体验、项目复盘、日常记录</span>
          </div>
        </div>

        <div className="mt-5 grid gap-2.5">
          <Link
            href="/about"
            className="inline-flex items-center justify-between rounded-[1.2rem] border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
          >
            <span>关于我</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="mailto:2694569918@qq.com"
            className="inline-flex items-center justify-between rounded-[1.2rem] border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]"
          >
            <span>发邮件</span>
            <Mail className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </ShellCard>
  )
}

function HomeHero() {
  return (
    <ShellCard className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(31,41,55,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="relative min-h-[340px] p-7 sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,233,218,0.85),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(216,230,235,0.42))] dark:bg-[radial-gradient(circle_at_top_left,rgba(124,96,78,0.3),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02),rgba(70,96,111,0.18))]" />

        <div className="relative flex h-full flex-col justify-center">
          <div>
            <p className="text-sm tracking-[0.32em] text-slate-400 dark:text-slate-500">FIELD NOTES</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-slate-800 sm:text-6xl dark:text-slate-100">
              想把这里慢慢整理成一个
              <br />
              能长期留下来的个人角落
            </h2>
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-8 text-slate-500 dark:text-slate-400">
              这里不只放文章，也会留下项目、照片、阶段性的想法，
              <br />
              还有一些暂时说不清、但之后回头看会觉得重要的记录。
            </p>
          </div>
        </div>
      </div>
    </ShellCard>
  )

  return (
    <ShellCard className="overflow-hidden rounded-[2.5rem] shadow-[0_30px_90px_rgba(31,41,55,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
      <div className="relative min-h-[340px] p-7 sm:p-9">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,233,218,0.85),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.1),rgba(216,230,235,0.42))] dark:bg-[radial-gradient(circle_at_top_left,rgba(124,96,78,0.3),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.02),rgba(70,96,111,0.18))]" />

        <div className="relative flex h-full flex-col justify-center">
          <div>
            <p className="text-sm tracking-[0.32em] text-slate-400 dark:text-slate-500">FIELD NOTES</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] tracking-[-0.06em] text-slate-800 sm:text-6xl dark:text-slate-100">
              把博客写成一个
              <br />
              会呼吸的个人角落
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-500 dark:text-slate-400">
              这里既放输出，也放过程。文章、照片、项目和零碎记录会并排出现，像一本慢慢加页的手账。
            </p>
          </div>

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
    </ShellCard>
  )
}

function DesignMediaPlaceholder() {
  return (
    <ShellCard className="rounded-[1.75rem] p-4">
      <div className="rounded-[1.35rem] border border-dashed border-slate-200 bg-[linear-gradient(135deg,rgba(255,246,236,0.7),rgba(238,246,248,0.82))] p-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(109,82,63,0.1),rgba(64,90,103,0.12))]">
        <p className="text-[0.68rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">DESIGN MEDIA</p>
        <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">设计媒体卡片占位</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          后面可以放设计站收藏、灵感来源、视觉参考，或者你常看的媒体入口。
        </p>
      </div>
    </ShellCard>
  )
}

function DesignMediaCard() {
  return (
    <ShellCard className="relative overflow-hidden rounded-[1.75rem] p-4">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://i.111666.best/image/CxWIDdxmHvpVvDywXcP0ts.png')" }}
      />
      <div className="absolute inset-0 bg-white/74 dark:bg-slate-950/58" />
      <div className="relative rounded-[1.35rem] border border-dashed border-slate-200 p-4 dark:border-white/10">
        <div className="relative">
          <p className="text-[0.68rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">DESIGN MEDIA</p>
          <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">Design Media</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Put design references, inspiration sources, visual research, or your most-used media entry points here.
          </p>
        </div>
      </div>
    </ShellCard>
  )
}

function PlayerPlaceholder() {
  return (
    <ShellCard className="rounded-[1.75rem] p-4">
      <div className="rounded-[1.35rem] border border-dashed border-slate-200 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="text-[0.68rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">PLAYER SLOT</p>
        <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">播放器卡片占位</h3>
        <div className="mt-4 rounded-[1.1rem] border border-slate-200 bg-white/90 p-3 dark:border-white/10 dark:bg-white/[0.05]">
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
        </div>
      </div>
    </ShellCard>
  )
}

function PhotoGallerySection() {
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
    if (dragStateRef.current.moved) {
      event.preventDefault()
    }
  }

  return (
    <ShellCard className="rounded-[2.2rem] p-5 sm:p-6 lg:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">PHOTO GLIMPSE</p>
          <h3 className="mt-2 text-2xl font-medium text-slate-800 dark:text-slate-100">拍立得相册</h3>
        </div>
        <Link href="/photos" className="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
          查看全部
        </Link>
      </div>

      <div className="mt-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="rounded-full border border-slate-200 bg-white/90 px-4 py-1.5 text-[0.68rem] tracking-[0.24em] text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
            POLAROID STRIP / 2026
          </div>
          <p className="hidden text-sm text-slate-400 dark:text-slate-500 lg:block">按卡片自然排布，而不是横向挤压</p>
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
                  更多照片
                  <br />
                  在相册页里
                </h4>
                <p className="mt-3 text-[0.82rem] leading-6 text-slate-500 dark:text-slate-400">
                  从旅行、自然到日常碎片，把它们继续收进更完整的一本相册里。
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-3.5 text-[0.68rem] text-slate-400 dark:border-white/10 dark:text-slate-500">
                <span>Open Album</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {photoCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              onClickCapture={handleCardClickCapture}
              className={`group block w-[9.8rem] flex-none rounded-[1.25rem] bg-white p-3 shadow-[0_22px_45px_rgba(31,41,55,0.12)] ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_28px_60px_rgba(31,41,55,0.16)] dark:bg-slate-50 dark:ring-white/10 sm:p-3.5 ${polaroidRotations[index % polaroidRotations.length]} ${polaroidOffsets[index % polaroidOffsets.length]} ${polaroidWidths[index % polaroidWidths.length]}`}
            >
              <div className="relative overflow-hidden rounded-[0.8rem] bg-slate-100">
                <div className={`relative ${index === 1 ? "aspect-[4/5.45]" : index === 3 ? "aspect-[4/5.7]" : "aspect-[4/5.2]"}`}>
                  <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                </div>
              </div>

              <div className="border-t border-dashed border-slate-200/90 px-1 pb-0.5 pt-3">
                <p className="text-[0.63rem] tracking-[0.22em] text-slate-400">{card.note}</p>
                <h4 className="mt-1.5 break-words text-[1rem] font-medium leading-snug text-slate-800 lg:text-[1.15rem]">{card.title}</h4>
                <div className="mt-2.5 flex items-center justify-between gap-3 text-[0.66rem] text-slate-400">
                  <span>{`Frame 0${index + 1}`}</span>
                  <span>APR 2026</span>
                </div>
              </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </ShellCard>
  )
}

function RecentWritingSection({ posts }: { posts: PostMeta[] }) {
  return (
    <ShellCard className="rounded-[2.2rem] p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">RECENT WRITING</p>
          <h3 className="mt-2 text-2xl font-medium text-slate-800 dark:text-slate-100">最近文章</h3>
        </div>
        <Link href="/posts" className="text-sm text-slate-500 transition-colors hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">
          进入文章页
        </Link>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className={`group rounded-[1.8rem] border p-5 transition-all hover:-translate-y-1 ${
              index === 0
                ? "border-slate-800 bg-slate-900 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:border-white/10"
                : "border-slate-200 bg-white/85 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            } ${index === 0 ? "lg:col-span-2 lg:p-6" : ""}`}
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className={`text-[0.7rem] tracking-[0.24em] ${
                  index === 0 ? "text-white/56" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {post.category}
              </span>
              <ArrowRight
                className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                  index === 0 ? "text-white/54" : "text-slate-400 dark:text-slate-500"
                }`}
              />
            </div>
            <h4 className={`mt-10 font-medium tracking-[-0.03em] ${index === 0 ? "text-[2rem] leading-[1.05] sm:text-[2.35rem]" : "text-2xl"}`}>
              {post.title}
            </h4>
            <p className={`mt-4 text-sm leading-7 ${index === 0 ? "max-w-3xl text-white/68" : "text-slate-500 dark:text-slate-400"}`}>
              {post.description}
            </p>
            <p className={`mt-6 text-xs ${index === 0 ? "text-white/44" : "text-slate-400 dark:text-slate-500"}`}>
              {post.date}
            </p>
          </Link>
        ))}
      </div>
    </ShellCard>
  )
}

function RightRail() {
  return (
    <div className="space-y-5">
      <ShellCard className="relative overflow-hidden rounded-[1.7rem] p-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.111666.best/image/6EFxUZGZyhqCw1wlFP1w48.jpg')" }}
        />
        <div className="absolute inset-0 bg-white/52 dark:bg-slate-950/38" />
        <div className="relative">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Sparkles className="h-4 w-4" />
            <span>Now</span>
          </div>
          <div className="mt-3 space-y-2.5">
            {journalNotes.map((note) => (
              <div
                key={note}
                className="rounded-[1.1rem] border border-dashed border-slate-200 bg-white/56 px-3.5 py-3 text-sm leading-6 text-slate-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-400"
              >
                {note}
              </div>
            ))}
          </div>
        </div>
      </ShellCard>

      <ShellCard className="rounded-[1.7rem] p-4">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-slate-200/70 bg-[linear-gradient(135deg,rgba(255,240,232,0.95),rgba(255,255,255,0.7))] p-4 dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(113,84,67,0.2),rgba(255,255,255,0.03))]">
          <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.35)_1px,transparent_0)] [background-size:18px_18px] dark:opacity-20" />
          <div className="relative">
            <p className="text-[0.7rem] tracking-[0.26em] text-slate-400 dark:text-slate-500">NOTICE BOARD</p>
            <h3 className="mt-2.5 text-lg font-medium text-slate-800 dark:text-slate-100">站点说明</h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {noticeItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </ShellCard>

      <ShellCard className="rounded-[1.7rem] p-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          <Camera className="h-4 w-4" />
          <span>Quick Entry</span>
        </div>

        <div className="mt-3 grid gap-2.5">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group rounded-[1.15rem] border border-slate-200 bg-slate-50/80 px-3.5 py-3 transition-all hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-slate-800 dark:text-slate-100">{item.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.description}</p>
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 dark:text-slate-500" />
              </div>
            </Link>
          ))}
        </div>
      </ShellCard>
    </div>
  )
}

function LeftColumn() {
  return (
    <aside className="space-y-5 xl:sticky xl:top-24 xl:self-start">
      <ProfileSidebar />
      <DesignMediaCard />
      <PlayerPlaceholder />
    </aside>
  )
}

function CenterColumn({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="space-y-6">
      <HomeHero />
      <PhotoGallerySection />
      <RecentWritingSection posts={posts} />
    </section>
  )
}

function RightColumn() {
  return (
    <aside className="xl:sticky xl:top-24 xl:self-start xl:pb-6">
      <RightRail />
    </aside>
  )
}

export function HomePageClient({ posts }: HomePageClientProps) {
  return (
    <main className="relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,240,223,0.92),transparent_30%),radial-gradient(circle_at_top_right,rgba(211,231,238,0.8),transparent_32%),linear-gradient(180deg,rgba(252,248,242,0.98),rgba(246,240,233,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(95,75,58,0.24),transparent_28%),radial-gradient(circle_at_top_right,rgba(71,98,112,0.2),transparent_32%),linear-gradient(180deg,rgba(16,19,24,0.98),rgba(12,15,19,0.98))]" />
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.38)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20" />
      </div>

      <div className="mx-auto max-w-[1480px] px-4 pb-12 pt-24 sm:px-6 lg:px-10 lg:pt-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-start gap-6 xl:grid-cols-[280px_minmax(0,1.62fr)_210px] 2xl:grid-cols-[300px_minmax(0,1.76fr)_230px]">
            <LeftColumn />
            <CenterColumn posts={posts} />
            <RightColumn />
          </div>
        </div>
      </div>
    </main>
  )
}
