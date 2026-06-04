import type { Metadata } from "next"
import { PageCanvas } from "@/components/site/cards"
import { PostsPageClient } from "@/components/posts/posts-page-client"
import { getAllCategories, getAllPosts, getAllTags } from "@/lib/posts"

export const metadata: Metadata = {
  title: "文章",
  description: "技术教程、学习笔记、生活观察与阶段记录。",
}

export default function PostsPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <PageCanvas>
      <PostsPageClient posts={posts} categories={categories} tags={tags} />
    </PageCanvas>
  )
}
