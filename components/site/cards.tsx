"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react"
import type { PostMeta } from "@/lib/posts"
import { cn } from "@/lib/utils"

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
        "rounded-[2rem] border border-white/70 bg-white/78 shadow-[0_24px_70px_rgba(31,41,55,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_16px_50px_rgba(0,0,0,0.2)]",
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
        "rounded-[1.4rem] border border-slate-200/80 bg-white/72 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.05] dark:shadow-none",
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
        <p className="text-[0.72rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-800 dark:text-slate-100">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
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
        "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/82 px-5 py-2.5 text-sm text-slate-700 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200 dark:hover:bg-white/[0.1]",
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
    <SurfaceCard className={cn("p-4", className)}>
      <InsetCard className="gap-0 border-dashed bg-[linear-gradient(135deg,rgba(255,244,236,0.95),rgba(239,246,248,0.9))] p-4 dark:bg-[linear-gradient(135deg,rgba(109,82,63,0.12),rgba(64,90,103,0.14))]">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
          {iconName === "sparkles" ? <Sparkles className="h-4 w-4" /> : null}
          <span>{eyebrow}</span>
        </div>
        <h3 className="mt-3 text-lg font-medium text-slate-800 dark:text-slate-100">{title}</h3>
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div
              key={item}
              className="rounded-[1.1rem] border border-white/70 bg-white/72 px-3.5 py-3 text-sm leading-6 text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400"
            >
              {item}
            </div>
          ))}
        </div>
      </InsetCard>
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
        "group rounded-[1.2rem] border border-slate-200 bg-slate-50/86 px-3.5 py-3 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm text-slate-800 dark:text-slate-100">{label}</p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{description}</p>
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
}: {
  post: PostMeta
  featured?: boolean
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group rounded-[1.8rem] border p-5 transition-all hover:-translate-y-1",
        featured
          ? "border-slate-800 bg-slate-900 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)] dark:border-white/10 lg:col-span-2 lg:p-6"
          : "border-slate-200 bg-white/85 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={cn("text-[0.7rem] tracking-[0.24em]", featured ? "text-white/56" : "text-slate-400 dark:text-slate-500")}>
          {post.category}
        </span>
        <ArrowRight
          className={cn(
            "h-4 w-4 transition-transform group-hover:translate-x-1",
            featured ? "text-white/54" : "text-slate-400 dark:text-slate-500",
          )}
        />
      </div>
      <h3 className={cn("mt-8 font-medium tracking-[-0.03em]", featured ? "text-[2rem] leading-[1.05] sm:text-[2.35rem]" : "text-2xl text-slate-800 dark:text-slate-100")}>
        {post.title}
      </h3>
      <p className={cn("mt-4 text-sm leading-7", featured ? "max-w-3xl text-white/68" : "text-slate-500 dark:text-slate-400")}>
        {post.description}
      </p>
      <p className={cn("mt-6 text-xs", featured ? "text-white/44" : "text-slate-400 dark:text-slate-500")}>{post.date}</p>
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
    <article className="rounded-[1.9rem] border border-black/10 bg-white/62 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/78 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/[0.08]">
      <div className="flex h-full flex-col">
        <h3 className="text-2xl font-medium tracking-[-0.03em] text-slate-800 dark:text-slate-100">{project.title}</h3>

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
  )
}
