import { AboutPageView } from "@/components/about/about-page-view"
import { getSiteProfile, getSocialItems } from "@/lib/content"

export const metadata = {
  title: "About",
  description: "Meet the author behind ZhBlog, what he is building, and the long-term ideas shaping the site.",
}

export default function AboutPage() {
  const profile = getSiteProfile()
  const socialItems = getSocialItems()

  const narrative = [
    {
      eyebrow: "Narrative",
      title: "A personal space with texture",
      description: profile.intro,
    },
    {
      eyebrow: "Direction",
      title: "Building things that can keep growing",
      description: profile.summary,
    },
  ]

  const signals = [
    { label: "Base", value: profile.aboutLocation },
    { label: "Status", value: profile.availabilityLabel },
    { label: "Attention", value: profile.focusSummary },
    { label: "Medium", value: "Writing, products, and web craft" },
  ]

  return <AboutPageView profile={profile} socialItems={socialItems} narrative={narrative} signals={signals} />
}
