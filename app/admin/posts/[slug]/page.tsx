import { notFound } from "next/navigation"
import { PostEditorPage } from "@/components/admin/posts/post-editor-page"
import { getAllCategories, getAllPostsForAdmin, getPostBySlugForAdmin } from "@/lib/posts"

interface AdminEditPostRouteProps {
  params: Promise<{ slug: string }>
}

export default async function AdminEditPostRoute({ params }: AdminEditPostRouteProps) {
  const { slug } = await params
  const post = getPostBySlugForAdmin(slug)
  const posts = getAllPostsForAdmin()
  const existingSlugs = posts.map((item) => item.slug)
  const existingCategories = getAllCategories()

  if (!post) {
    notFound()
  }

  return <PostEditorPage post={post} mode="edit" existingSlugs={existingSlugs} existingCategories={existingCategories} />
}
