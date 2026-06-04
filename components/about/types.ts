import type { SiteProfile, SocialLink } from "@/lib/content"

export interface AboutNarrative {
  eyebrow: string
  title: string
  description: string
}

export interface AboutSignal {
  label: string
  value: string
}

export interface AboutPageViewProps {
  profile: SiteProfile
  socialItems: SocialLink[]
  narrative: AboutNarrative[]
  signals: AboutSignal[]
}
