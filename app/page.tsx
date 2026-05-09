import { getAllPosts } from "@/lib/posts"
import { HomePageClient } from "../components/home-page-client"

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)

  return <HomePageClient posts={posts} />
}
