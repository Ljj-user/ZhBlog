import type { Metadata } from "next"
import { Link2, MessageCircleHeart } from "lucide-react"
import { NoticeCard, PillLink, QuickLinkCard, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { getFriendsContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "友链",
  description: "收藏一些喜欢的网站、朋友的博客和愿意长期回访的角落。",
}

export default function FriendsPage() {
  const friendsContent = getFriendsContent()

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow={friendsContent.hero.eyebrow}
            title={friendsContent.hero.title}
            description={friendsContent.hero.description}
          />
        </SurfaceCard>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {friendsContent.items.map((friend) => (
              <SurfaceCard key={friend.name} className="p-4">
                <QuickLinkCard
                  label={friend.name}
                  description={friend.description}
                  href={friend.url}
                  external
                  className="h-full min-h-[210px] bg-white/70"
                />
                <div className="mt-3 px-1 text-xs tracking-[0.14em] text-slate-400 dark:text-slate-500">{friend.tag}</div>
              </SurfaceCard>
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
      </div>
    </main>
  )
}
