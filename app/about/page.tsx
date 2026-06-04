import { AboutPageView } from "@/components/about/about-page-view"
import { getSiteProfile, getSocialItems } from "@/lib/content"

export const metadata = {
  title: "About",
  description: "Meet Zhang Zhenghao, an AI builder, trader, and creator building a personal operating system in public.",
}

export default function AboutPage() {
  const profile = getSiteProfile()
  const socialItems = getSocialItems()

  const narrative = [
    {
      eyebrow: "Who I am",
      title: "AI Builder, trader, creator.",
      description:
        "I am Zhang Zhenghao, a computer science undergraduate building at the intersection of AI, crypto, digital products, and content systems.",
    },
    {
      eyebrow: "How I work",
      title: "Treating life like an operating system.",
      description:
        "I like long-term games: building AI Agents, refining trading systems, running content, and turning scattered ideas into compounding assets.",
    },
  ]

  const signals = [
    { label: "Base", value: "Tianjin" },
    { label: "Status", value: "Building in public" },
    { label: "Attention", value: "AI, trading, products, content" },
    { label: "Mode", value: "Builder + operator + learner" },
  ]

  return <AboutPageView profile={profile} socialItems={socialItems} narrative={narrative} signals={signals} />
}
