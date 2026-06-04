import { PageCanvas } from "@/components/site/cards"
import { AboutContactSection } from "./about-contact-section"
import { AboutExperienceSection } from "./about-experience-section"
import { AboutFocusSection } from "./about-focus-section"
import { AboutHero } from "./about-hero"
import { AboutStackSection } from "./about-stack-section"
import type { AboutPageViewProps } from "./types"

export function AboutPageView({ profile, socialItems, narrative, signals }: AboutPageViewProps) {
  return (
    <PageCanvas className="max-w-[1320px] space-y-6">
      <AboutHero profile={profile} socialItems={socialItems} narrative={narrative} signals={signals} />
      <AboutFocusSection items={profile.focusAreas} />
      <AboutExperienceSection items={profile.experience} />
      <AboutStackSection skillGroups={profile.skillGroups} education={profile.education} />
      <AboutContactSection email={profile.email} copy={profile.contactCopy} socialItems={socialItems} />
    </PageCanvas>
  )
}
