import type { Metadata } from "next"
import { PageCanvas, SectionHeader, SurfaceCard } from "@/components/site/cards"
import { PhotoGallery } from "@/components/photo-gallery"
import { getPhotoAlbums, getPhotos } from "@/lib/content"

export const metadata: Metadata = {
  title: "Photos",
  description: "A polaroid-like photo log with quieter details and a more tactile lightbox.",
}

export default function PhotosPage() {
  const albums = getPhotoAlbums()
  const albumMap = new Map(albums.map((album) => [album.id, album.name]))
  const photos = getPhotos().map((photo) => ({
    ...photo,
    albumName: albumMap.get(photo.albumId) ?? photo.albumId,
  }))

  return (
    <PageCanvas>
      <SurfaceCard className="p-6 sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="PHOTO LOGBOOK"
          title="Photos"
          description="More than a clean gallery, this page should feel like a stack of polaroids someone has actually touched, moved around, and looked through more than once."
        />
      </SurfaceCard>

      <PhotoGallery photos={photos} albums={albums} />
    </PageCanvas>
  )
}
