import { PostEditorPage } from "@/components/admin/posts/post-editor-page"
import { getAllCategories, getAllPostsForAdmin } from "@/lib/posts"

export default function AdminNewPostRoute() {
  const posts = getAllPostsForAdmin()
  const existingSlugs = posts.map((post) => post.slug)
  const existingCategories = getAllCategories()

  return <PostEditorPage post={null} mode="create" existingSlugs={existingSlugs} existingCategories={existingCategories} />
}
