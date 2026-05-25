"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import type { PostMeta } from "@/lib/posts"
import { cn } from "@/lib/utils"

export function PageCanvas({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <main className="relative overflow-x-clip px-4 py-8 sm:px-6 sm:py-10 lg:px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f6efe3_0%,#eef3ed_44%,#f5eee4_100%)] dark:bg-[linear-gradient(180deg,#101613_0%,#15201d_44%,#0e1211_100%)]" />
        <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(70,84,72,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(70,84,72,0.08)_1px,transparent_1px)] [background-size:30px_30px] dark:opacity-20" />
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(255,255,255,0))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />
      </div>

      <div className={cn("relative mx-auto max-w-[1260px] space-y-6", className)}>{children}</div>
    </main>
  )
}

export function SurfaceCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-[1.65rem] border border-stone-200/80 bg-[#fbfaf6]/88 shadow-[0_18px_55px_rgba(47,55,48,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#141816]/88 dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)]",
        className,
      )}
    >
      {children}
    </section>
  )
}

export function InsetCard({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-[1.15rem] border border-stone-200/80 bg-white/62 p-4 shadow-[0_10px_24px_rgba(47,55,48,0.05)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-stone-400 dark:text-stone-500">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-slate-900 dark:text-stone-100">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 dark:text-stone-400">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export function PillLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/72 px-5 py-2.5 text-sm text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:hover:bg-white/[0.1]",
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function NoticeCard({
  eyebrow,
  title,
  items,
  iconName,
  className,
}: {
  eyebrow: string
  title: string
  items: string[]
  iconName?: "sparkles"
  className?: string
}) {
  return (
    <SurfaceCard className={cn("overflow-hidden p-0", className)}>
      <div className="border-b border-stone-200/70 px-4 py-3.5 dark:border-white/10">
        <div className="flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
          {iconName === "sparkles" ? <Sparkles className="h-4 w-4" /> : null}
          <span>{eyebrow}</span>
        </div>
        <h3 className="mt-2 text-lg font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{title}</h3>
      </div>
      <div className="grid">
        {items.map((item, index) => (
          <div key={item} className="flex gap-3 border-b border-stone-200/60 px-4 py-3.5 last:border-b-0 dark:border-white/10">
            <span className="mt-1 h-5 w-5 shrink-0 rounded-full border border-stone-200 bg-white/72 text-center font-mono text-[0.58rem] leading-5 text-stone-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-500">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-6 text-slate-500 dark:text-stone-400">{item}</p>
          </div>
        ))}
      </div>
    </SurfaceCard>
  )
}

export function QuickLinkCard({
  label,
  description,
  href,
  external = false,
  className,
}: {
  label: string
  description: string
  href: string
  external?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group rounded-[1rem] border border-stone-200 bg-white/66 px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-900 dark:text-stone-100">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-stone-400">{description}</p>
        </div>
        {external ? (
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-500" />
        ) : (
          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 dark:text-slate-500" />
        )}
      </div>
    </Link>
  )
}

const polaroidRotations = ["-rotate-[3.5deg]", "rotate-[2.4deg]", "-rotate-[1.6deg]", "rotate-[3.1deg]"]
const polaroidOffsets = ["lg:mt-5", "lg:-mt-1", "lg:mt-4", "lg:mt-10"]
const polaroidWidths = [
  "lg:w-[11.4rem] xl:w-[12.2rem]",
  "lg:w-[10.8rem] xl:w-[11.5rem]",
  "lg:w-[11.5rem] xl:w-[12.3rem]",
  "lg:w-[10.5rem] xl:w-[11.2rem]",
]

export function PolaroidPhotoCard({
  title,
  note,
  image,
  href,
  index,
  onClickCapture,
}: {
  title: string
  note: string
  image: string
  href: string
  index: number
  onClickCapture?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <Link
      href={href}
      onClickCapture={onClickCapture}
      className={cn(
        "group block w-[10.8rem] flex-none rounded-[1.35rem] bg-white p-3.5 shadow-[0_22px_45px_rgba(31,41,55,0.12)] ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_28px_60px_rgba(31,41,55,0.16)] dark:bg-slate-50 dark:ring-white/10 sm:p-4",
        polaroidRotations[index % polaroidRotations.length],
        polaroidOffsets[index % polaroidOffsets.length],
        polaroidWidths[index % polaroidWidths.length],
      )}
    >
      <div className="relative overflow-hidden rounded-[0.8rem] bg-slate-100">
        <div className={cn("relative aspect-[4/5.2]", index === 1 && "aspect-[4/5.45]", index === 3 && "aspect-[4/5.7]")}>
          <Image
            src={image}
            alt={title}
            fill
            draggable={false}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="border-t border-dashed border-slate-200/90 px-1 pb-1 pt-3.5">
        <p className="text-[0.63rem] tracking-[0.22em] text-slate-400">{note}</p>
        <h4 className="mt-2 break-words text-[1.08rem] font-medium leading-snug text-slate-800 lg:text-[1.22rem]">{title}</h4>
        <div className="mt-3 flex items-center justify-between gap-3 text-[0.68rem] text-slate-400">
          <span>{`Frame ${String(index + 1).padStart(2, "0")}`}</span>
          <span>2026</span>
        </div>
      </div>
    </Link>
  )
}

export function PostPreviewCard({
  post,
  featured = false,
  compact = false,
}: {
  post: PostMeta
  featured?: boolean
  compact?: boolean
}) {
  if (compact && !featured) {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className="group flex items-center justify-between gap-4 rounded-[1rem] border border-stone-200 bg-white/70 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-stone-400 dark:text-stone-500">{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-stone-300 dark:bg-stone-600" />
            <span className="text-xs text-stone-400 dark:text-stone-500">{post.date}</span>
          </div>
          <h3 className="mt-1.5 truncate text-[1.05rem] font-medium leading-snug tracking-[-0.02em] text-slate-900 dark:text-stone-100">
            {post.title}
          </h3>
          <p className="mt-1 truncate text-sm text-slate-500 dark:text-stone-400">{post.description}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1 dark:text-stone-500" />
      </Link>
    )
  }

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-[1.25rem] border transition-all hover:-translate-y-1",
        featured
          ? "border-slate-800 bg-slate-900 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:border-white/10 lg:col-span-2 lg:p-6"
          : "border-stone-200 bg-[#fbfaf6]/78 shadow-[0_12px_32px_rgba(47,55,48,0.07)] hover:border-stone-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        !featured && "p-5",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("font-mono text-[0.65rem] uppercase tracking-[0.18em]", featured ? "text-white/56" : "text-stone-400 dark:text-stone-500")}>
          {post.category}
        </span>
        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform group-hover:translate-x-1",
            featured ? "text-white/54" : "text-slate-400 dark:text-slate-500",
          )}
        />
      </div>
      <h3
        className={cn(
          "font-medium tracking-[-0.03em]",
          featured
            ? "mt-8 text-[2rem] leading-[1.05] sm:text-[2.35rem]"
            : "mt-5 text-xl text-slate-900 dark:text-stone-100",
        )}
      >
        {post.title}
      </h3>
      <p
        className={cn(
          "text-sm",
          featured
            ? "mt-4 max-w-3xl leading-7 text-white/68"
            : "mt-3 leading-7 text-slate-500 dark:text-stone-400",
        )}
      >
        {post.description}
      </p>
      <p className={cn("text-xs", featured ? "mt-6 text-white/44" : "mt-auto pt-6 text-stone-400 dark:text-stone-500")}>
        {post.date}
      </p>
    </Link>
  )
}

export interface ProjectPreview {
  slug: string
  title: string
  tags: string[]
  description: string
  href: string
}

export function ProjectPreviewCard({
  project,
}: {
  project: ProjectPreview
}) {
  return (
    <article className="rounded-[1.35rem] border border-stone-200 bg-[#fbfaf6]/78 p-5 shadow-[0_12px_32px_rgba(47,55,48,0.07)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:border-stone-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
      <div className="flex h-full flex-col">
        <h3 className="text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{project.title}</h3>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-stone-200 bg-white/54 px-3 py-1 text-xs tracking-[0.06em] text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-8 text-slate-500 dark:text-stone-400">{project.description}</p>

        <Link
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex pt-6 items-center gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-stone-300 dark:hover:text-white"
        >
          查看详情
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
