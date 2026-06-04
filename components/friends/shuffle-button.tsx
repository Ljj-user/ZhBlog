"use client"

import { useMemo } from "react"
import { Shuffle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

function pickRandomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

export function ShuffleButton({
  hrefs,
  className,
}: {
  hrefs: string[]
  className?: string
}) {
  const validHrefs = useMemo(() => hrefs.filter(Boolean), [hrefs])
  const disabled = validHrefs.length === 0

  function handleClick() {
    if (disabled) return
    const target = pickRandomItem(validHrefs)
    if (!target) return
    window.open(target, "_blank", "noopener,noreferrer")
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/78 px-4 py-2.5 text-sm text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:hover:bg-white/[0.1]",
        className,
      )}
    >
      <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 bg-[#f6efe3] text-slate-600 dark:border-white/10 dark:bg-white/[0.08] dark:text-stone-200">
        <Shuffle className="h-3.5 w-3.5" />
        <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-stone-400 dark:text-stone-500" />
      </span>
      <span>随机敲门 / Shuffle</span>
    </button>
  )
}
