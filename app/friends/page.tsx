import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, Link2, MessageCircleHeart } from "lucide-react"
import { ShuffleButton } from "@/components/friends/shuffle-button"
import { NoticeCard, PageCanvas, PillLink, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { getFriendsContent } from "@/lib/content"

export const metadata: Metadata = {
  title: "Friends",
  description: "A small corner for blogs and sites worth revisiting.",
}

function getSafeExternalUrl(value: string) {
  try {
    const url = new URL(value)
    if (url.protocol === "http:" || url.protocol === "https:") return url.toString()
    return null
  } catch {
    return null
  }
}

const cardOffsets = ["md:translate-y-0", "md:translate-y-10", "md:-translate-y-3", "md:translate-y-6"]
const cardAngles = ["md:-rotate-[1.2deg]", "md:rotate-[1deg]", "md:-rotate-[0.8deg]", "md:rotate-[1.4deg]"]

export default function FriendsPage() {
  const friendsContent = getFriendsContent()
  const friends = friendsContent.items.map((friend) => ({
    ...friend,
    safeUrl: getSafeExternalUrl(friend.url),
  }))
  const validShuffleUrls = friends.flatMap((friend) => (friend.safeUrl ? [friend.safeUrl] : []))

  return (
    <PageCanvas>
      <SurfaceCard className="p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow={friendsContent.hero.eyebrow}
          title={friendsContent.hero.title}
          description={friendsContent.hero.description}
          action={<ShuffleButton hrefs={validShuffleUrls} />}
        />
      </SurfaceCard>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid items-start gap-5 md:grid-cols-2">
          {friends.map((friend, index) => {
            const cardContent = (
              <SurfaceCard
                className={`h-full rounded-[1.8rem] p-0 transition-all duration-300 hover:border-stone-300 hover:bg-white hover:shadow-[0_18px_44px_rgba(47,55,48,0.1)] dark:hover:bg-white/[0.08] ${cardOffsets[index % cardOffsets.length]} ${cardAngles[index % cardAngles.length]}`}
              >
                <div className="border-b border-dashed border-stone-200/80 px-5 py-4 dark:border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                        {`Knock ${String(index + 1).padStart(2, "0")}`}
                      </p>
                      <h2 className="mt-2 text-[1.35rem] font-medium tracking-[-0.04em] text-slate-900 dark:text-stone-100">
                        {friend.name}
                      </h2>
                      <p className="mt-2 inline-flex rounded-full border border-stone-200 bg-white/78 px-3 py-1 text-[0.68rem] text-stone-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-stone-400">
                        {friend.tag}
                      </p>
                    </div>

                    {friend.avatar ? (
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1.2rem] border border-black/8 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06]">
                        <Image
                          src={friend.avatar}
                          alt={`${friend.name} avatar`}
                          fill
                          sizes="64px"
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.2rem] border border-black/8 bg-white text-lg font-medium text-slate-500 shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-300">
                        {friend.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4 px-5 py-5">
                  <div className="card-shell rounded-[1.15rem] bg-white/62 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] dark:bg-white/[0.04]">
                    <p className="text-sm leading-7 text-slate-600 dark:text-stone-300">{friend.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
                      {friend.safeUrl ? "Ready to visit" : "Link unavailable"}
                    </span>
                    {friend.safeUrl ? (
                      <span className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-stone-300">
                        Visit
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                </div>
              </SurfaceCard>
            )

            if (!friend.safeUrl) {
              return (
                <div key={friend.name} className="block cursor-default">
                  {cardContent}
                </div>
              )
            }

            return (
              <Link
                key={friend.name}
                href={friend.safeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block transition-transform hover:-translate-y-1"
              >
                {cardContent}
              </Link>
            )
          })}
        </div>

        <div className="space-y-6">
          <NoticeCard
            eyebrow={friendsContent.preferenceCard.eyebrow}
            title={friendsContent.preferenceCard.title}
            iconName="sparkles"
            items={friendsContent.preferenceCard.items}
          />

          <SurfaceCard className="p-6">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-stone-300">
              <MessageCircleHeart className="h-4 w-4" />
              <span>{friendsContent.exchangeCard.title}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-stone-400">{friendsContent.exchangeCard.description}</p>
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
