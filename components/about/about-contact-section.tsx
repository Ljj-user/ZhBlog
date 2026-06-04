import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { SurfaceCard } from "@/components/site/cards"
import type { SocialLink } from "@/lib/content"

export function AboutContactSection({
  email,
  copy,
  socialItems,
}: {
  email: string
  copy: string
  socialItems: SocialLink[]
}) {
  return (
    <SurfaceCard className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
          <Mail className="h-4 w-4" />
          <span>Contact</span>
        </div>
        <h2 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-slate-900 dark:text-stone-100">Open to thoughtful conversations</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-stone-300">{copy}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-stone-400">
          {socialItems.slice(0, 4).map((item) => (
            <span key={item.name} className="rounded-full border border-stone-200 bg-white/78 px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
              {item.name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3">
        <Link
          href={`mailto:${email}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17211d] px-6 py-3 text-sm text-white shadow-[0_12px_28px_rgba(23,33,29,0.18)] transition-transform hover:-translate-y-0.5 dark:bg-stone-50 dark:text-[#17211d]"
        >
          Send an email
          <ArrowUpRight className="h-4 w-4" />
        </Link>
        <p className="text-center text-xs text-stone-400 dark:text-stone-500">{email}</p>
      </div>
    </SurfaceCard>
  )
}
