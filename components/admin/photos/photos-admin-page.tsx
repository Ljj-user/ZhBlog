import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { PhotosListEditor } from "@/components/admin/photos/photos-list-editor"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getPhotoAlbums, getPhotos } from "@/lib/content"

export function PhotosAdminPage() {
  const photos = getPhotos()
  const albums = getPhotoAlbums()
  const featuredCount = photos.filter((photo) => photo.featured).length

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="PHOTOS"
        title="照片"
        description="照片页已经接入真实保存。当前先用列表编辑器覆盖元数据、标签、相册归属、精选状态和排序，后面再继续细化成行编辑与预览。"
      />

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0">
          <PhotosListEditor items={photos} albums={albums} />
        </div>

        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="照片元数据独立写入 photos.json，前台照片页与首页精选都会读取这份内容。">
            <AdminFileList files={["content/photos/photos.json"]} />
          </AdminSectionCard>

          <AdminSectionCard title="当前概览" description="这里给你一个快速确认，避免大量编辑时搞混相册和精选数量。">
            <AdminMetricGrid
              items={[
                { label: "PHOTOS", value: photos.length },
                { label: "FEATURED", value: featuredCount },
                { label: "ALBUMS", value: albums.length },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
