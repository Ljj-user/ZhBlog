import { AlbumsListEditor } from "@/components/admin/albums/albums-list-editor"
import { AdminPageHeader } from "@/components/admin/layout/admin-page-header"
import { AdminFileList } from "@/components/admin/shared/admin-file-list"
import { AdminMetricGrid } from "@/components/admin/shared/admin-metric-grid"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { getPhotoAlbums } from "@/lib/content"

export function AlbumsAdminPage() {
  const albums = getPhotoAlbums()

  return (
    <div className="space-y-4">
      <AdminPageHeader
        eyebrow="ALBUMS"
        title="相册"
        description="相册实体已经接入真实保存。这里先独立维护相册 id、名称和描述，后续照片会引用这些相册。"
      />
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px] 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-4">
          <AlbumsListEditor items={albums} />
        </div>
        <div className="space-y-4">
          <AdminSectionCard title="数据来源" description="相册是照片域的基础字典，当前独立写入 albums.json。">
            <AdminFileList files={["content/photos/albums.json"]} />
          </AdminSectionCard>
          <AdminSectionCard title="当前概览" description="快速确认相册数量，避免照片归属和相册实体脱节。">
            <AdminMetricGrid
              items={[
                { label: "ALBUMS", value: albums.length },
                { label: "FILES", value: 1 },
                { label: "ENTITY TYPE", value: "DICT" },
              ]}
            />
          </AdminSectionCard>
        </div>
      </div>
    </div>
  )
}
