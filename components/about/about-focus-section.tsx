import { Sparkles } from "lucide-react"
import { NoticeCard, SurfaceCard } from "@/components/site/cards"

export function AboutFocusSection({ items }: { items: string[] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <NoticeCard
        eyebrow="Current focus"
        title="What I am shaping right now"
        items={items}
        iconName="sparkles"
        className="border border-stone-200/60 bg-white/50 shadow-none dark:border-white/10 dark:bg-white/[0.03]"
      />

      <SurfaceCard className="p-6 sm:p-7">
        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-stone-400">
          <Sparkles className="h-4 w-4" />
          <span>Narrative direction</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Long-term writing",
              body: "Keep the blog growing like a notebook that accumulates taste, project notes, and real-life observations over time.",
            },
            {
              title: "Product thinking",
              body: "Treat each page as a product surface with clearer pathways, calmer information density, and stronger author voice.",
            },
            {
              title: "System over scraps",
              body: "Replace one-off page assembly with reusable sections so the site can evolve without feeling stitched together.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.35rem] border border-stone-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <h3 className="text-base font-medium tracking-[-0.02em] text-slate-900 dark:text-stone-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-stone-300">{item.body}</p>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  )
}
