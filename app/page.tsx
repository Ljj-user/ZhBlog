import { HomePageClient } from "../components/home-page-client"
import { getFeaturedPhotos, getHomeContent, getSiteProfile } from "@/lib/content"
import { getAllPosts } from "@/lib/posts"

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)
  const profile = getSiteProfile()
  const homeContent = getHomeContent()
  const featuredPhotos = getFeaturedPhotos(10)

  return <HomePageClient posts={posts} profile={profile} homeContent={homeContent} featuredPhotos={featuredPhotos} />
}
