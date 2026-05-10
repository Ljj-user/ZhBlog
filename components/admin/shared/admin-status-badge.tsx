import { cn } from "@/lib/utils"

const tones = {
  amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300",
  blue: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-300",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300",
} as const

export function AdminStatusBadge({ label, tone = "blue" }: { label: string; tone?: keyof typeof tones }) {
  return <span className={cn("rounded-full border px-3 py-1 text-xs tracking-[0.16em]", tones[tone])}>{label}</span>
}
