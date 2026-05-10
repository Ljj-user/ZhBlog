import type { Metadata } from "next"
import { SectionHeader, SurfaceCard } from "@/components/site/cards"
import { PhotoGallery } from "@/components/photo-gallery"
import { getPhotoAlbums, getPhotos } from "@/lib/content"

export const metadata: Metadata = {
  title: "照片",
  description: "记录生活里的光线、路途、风景与碎片时刻。",
}

export default function PhotosPage() {
  const albums = getPhotoAlbums()
  const albumMap = new Map(albums.map((album) => [album.id, album.name]))
  const photos = getPhotos().map((photo) => ({
    ...photo,
    albumName: albumMap.get(photo.albumId) ?? photo.albumId,
  }))

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-[1400px] space-y-6">
        <SurfaceCard className="p-6 sm:p-8 lg:p-10">
          <SectionHeader
            eyebrow="PHOTO LOGBOOK"
            title="照片"
            description="记录一些风景、路途和日常碎片。比起整齐图库，我更想让这里像一本被翻阅过的拍立得相册。"
          />
        </SurfaceCard>

        <PhotoGallery photos={photos} albums={albums} />
      </div>
    </main>
  )
}
