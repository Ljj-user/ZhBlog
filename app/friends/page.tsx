import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, Link2, MessageCircleHeart } from "lucide-react"
import { NoticeCard, PageCanvas, PillLink, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { getFriendsContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "友链",
  description: "收藏一些喜欢的网站、朋友的博客和愿意长期回访的角落。",
}

export default function FriendsPage() {
  const friendsContent = getFriendsContent()

  return (
    <PageCanvas>
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader eyebrow={friendsContent.hero.eyebrow} title={friendsContent.hero.title} description={friendsContent.hero.description} />
        </SurfaceCard>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {friendsContent.items.map((friend) => (
              <Link
                key={friend.name}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <SurfaceCard className="h-full overflow-hidden rounded-[1.35rem] border-stone-200 bg-[#fbfaf6]/78 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-[0_18px_44px_rgba(47,55,48,0.1)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {friend.avatar ? (
                        <div className="relative h-14 w-14 overflow-hidden rounded-[1.1rem] border border-black/8 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06]">
                          <Image src={friend.avatar} alt={`${friend.name} avatar`} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] border border-black/8 bg-white text-lg font-medium text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
                          {friend.name.slice(0, 1)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <h2 className="text-xl font-medium tracking-[-0.03em] text-slate-900 dark:text-stone-100">{friend.name}</h2>
                        <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">{friend.tag}</p>
                      </div>
                    </div>

                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-500" />
                  </div>

                  <div className="mt-5 rounded-[1rem] border border-stone-200/70 bg-white/62 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-sm leading-7 text-slate-600 dark:text-stone-300">{friend.description}</p>
                  </div>
                </SurfaceCard>
              </Link>
            ))}
          </div>

          <div className="space-y-6">
            <NoticeCard
              eyebrow={friendsContent.preferenceCard.eyebrow}
              title={friendsContent.preferenceCard.title}
              iconName="sparkles"
              items={friendsContent.preferenceCard.items}
            />

            <SurfaceCard className="p-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MessageCircleHeart className="h-4 w-4" />
                <span>{friendsContent.exchangeCard.title}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">{friendsContent.exchangeCard.description}</p>
              <PillLink href={friendsContent.exchangeCard.ctaHref} className="mt-5">
                {friendsContent.exchangeCard.ctaLabel}
                <Link2 className="h-4 w-4" />
              </PillLink>
            </SurfaceCard>
          </div>
        </section>
    </PageCanvas>
  )
}
