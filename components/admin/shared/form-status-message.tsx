"use client"

import type { AdminActionState } from "@/lib/admin-content-schemas"

export function FormStatusMessage({ state }: { state: AdminActionState }) {
  if (!state.message) return null

  return (
    <div
      className={`rounded-[1rem] border px-3 py-2 text-sm ${
        state.ok
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300"
          : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300"
      }`}
    >
      {state.message}
    </div>
  )
}
