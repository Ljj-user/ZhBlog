import { MapPin } from "lucide-react"
import { SurfaceCard } from "@/components/site/cards"

const trailStops = [
  {
    title: "Guizhou mountains",
    subtitle: "A sense of distance and layered terrain",
    description: "The kind of place that teaches you to slow your eyes down before you try to describe anything.",
  },
  {
    title: "Tianjin shoreline",
    subtitle: "Wind, concrete, and open water",
    description: "A flatter city rhythm, but one that leaves room for long walks, drafts, and quieter observations.",
  },
  {
    title: "Places held by the camera",
    subtitle: "Fragments that keep returning",
    description: "Trips, stations, corners, and passing light that later become writing, products, and small visual decisions.",
  },
]

export function AboutFootprints() {
  return (
    <SurfaceCard className="overflow-hidden p-6 sm:p-7">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
        <MapPin className="h-4 w-4" />
        <span>Footprints in space and time</span>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-stone-200/70 bg-white/62 p-5 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="hidden items-center gap-3 lg:flex">
          {trailStops.map((stop, index) => (
            <div key={stop.title} className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white/86 text-sm text-slate-700 shadow-[0_10px_24px_rgba(47,55,48,0.06)] dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200">
                {String(index + 1).padStart(2, "0")}
              </div>
              {index < trailStops.length - 1 ? (
                <svg viewBox="0 0 240 48" className="h-12 min-w-0 flex-1 text-stone-300 dark:text-stone-600" aria-hidden="true">
                  <path
                    d="M4 24 C48 6, 92 42, 136 24 S224 6, 236 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-2 grid gap-4 lg:mt-6 lg:grid-cols-3">
          {trailStops.map((stop, index) => (
            <div
              key={stop.title}
              className="rounded-[1.35rem] border border-stone-200/70 bg-[#fbfaf6]/88 p-4 dark:border-white/10 dark:bg-white/[0.05]"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Stop {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{stop.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-stone-400">{stop.subtitle}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-stone-300">{stop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SurfaceCard>
  )
}
