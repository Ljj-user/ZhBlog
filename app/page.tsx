import { HomePageClient } from "../components/home-page-client"
import { getFeaturedPhotos, getHomeContent, getSiteProfile, getSocialItems } from "@/lib/content"
import { getAllPosts } from "@/lib/posts"

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5)
  const profile = getSiteProfile()
  const homeContent = getHomeContent()
  const featuredPhotos = getFeaturedPhotos(10)
  const socialItems = getSocialItems()

  return (
    <HomePageClient
      posts={posts}
      profile={profile}
      homeContent={homeContent}
      featuredPhotos={featuredPhotos}
      socialItems={socialItems}
    />
  )
}
