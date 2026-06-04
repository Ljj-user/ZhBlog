"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Ma_Shan_Zheng } from "next/font/google"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SectionHeader, SurfaceCard } from "@/components/site/cards"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { PhotoAlbum, PhotoItem } from "@/lib/content"
import { cn } from "@/lib/utils"

interface PhotoGalleryProps {
  photos: Array<PhotoItem & { albumName: string }>
  albums: PhotoAlbum[]
}

const handwritten = Ma_Shan_Zheng({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})

const cardRotations = ["-rotate-[2.2deg]", "rotate-[1.6deg]", "-rotate-[1.1deg]", "rotate-[2.6deg]"]
const cardShadows = [
  "shadow-[5px_5px_15px_rgba(0,0,0,0.08)]",
  "shadow-[4px_7px_18px_rgba(0,0,0,0.09)]",
  "shadow-[6px_6px_16px_rgba(0,0,0,0.08)]",
  "shadow-[5px_8px_18px_rgba(0,0,0,0.09)]",
]

function getExifRows(photo: PhotoItem) {
  return [
    { label: "Camera", value: photo.exifCamera || "unknown" },
    { label: "Focal length", value: photo.exifFocalLength || "unknown" },
    { label: "Aperture", value: photo.exifAperture || "unknown" },
    { label: "Shutter", value: photo.exifShutterSpeed || "unknown" },
    { label: "ISO", value: photo.exifIso || "unknown" },
  ]
}

function getDisplayLocation(photo: PhotoItem & { albumName: string }) {
  return photo.location || photo.albumName || "unknown"
}

export function PhotoGallery({ photos, albums }: PhotoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)

  const filteredPhotos = useMemo(
    () => (selectedAlbum ? photos.filter((photo) => photo.albumId === selectedAlbum) : photos),
    [photos, selectedAlbum],
  )

  const lightboxIndex = selectedPhotoId ? filteredPhotos.findIndex((photo) => photo.id === selectedPhotoId) : -1
  const selectedPhoto = lightboxIndex >= 0 ? filteredPhotos[lightboxIndex] : null

  function openLightbox(photoId: string) {
    setSelectedPhotoId(photoId)
  }

  function closeLightbox() {
    setSelectedPhotoId(null)
  }

  function goToOffset(offset: number) {
    if (filteredPhotos.length === 0 || lightboxIndex < 0) return
    const nextIndex = (lightboxIndex + offset + filteredPhotos.length) % filteredPhotos.length
    setSelectedPhotoId(filteredPhotos[nextIndex]?.id ?? null)
  }

  return (
    <>
      <SurfaceCard className="p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="ALBUM FILTER"
            title="Polaroid Wall"
            description="A slightly uneven wall of prints, with enough texture to feel touched but still readable."
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedAlbum(null)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm transition-colors",
                selectedAlbum === null
                  ? "bg-[#17211d] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                  : "border border-stone-200 bg-white/72 text-stone-500 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400 dark:hover:bg-white/10",
              )}
            >
              All
            </button>
            {albums.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => setSelectedAlbum(album.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-colors",
                  selectedAlbum === album.id
                    ? "bg-[#17211d] text-white shadow-[0_10px_24px_rgba(23,33,29,0.16)] dark:bg-white dark:text-[#17211d]"
                    : "border border-stone-200 bg-white/72 text-stone-500 hover:bg-white dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400 dark:hover:bg-white/10",
                )}
              >
                {album.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => openLightbox(photo.id)}
              className={cn(
                "group page-enter text-left transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0",
                cardRotations[index % cardRotations.length],
              )}
            >
              <article
                className={cn(
                  "rounded-[1.1rem] border border-stone-200 bg-[#fffdf8] p-3 ring-1 ring-white/60 dark:border-white/10 dark:bg-[#f9f6ee]",
                  cardShadows[index % cardShadows.length],
                )}
              >
                <div className="relative overflow-hidden rounded-[0.9rem] bg-slate-100">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                <div className="border-t border-dashed border-stone-200/90 px-1 pb-1 pt-3.5 text-slate-800">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-stone-400">{photo.albumName}</p>
                  <h3 className="mt-1.5 line-clamp-2 text-base font-medium leading-snug">{photo.alt}</h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{photo.caption}</p>
                  <div className={cn("mt-4 flex items-end justify-between text-[1rem] text-stone-500", handwritten.className)}>
                    <span className="truncate">{getDisplayLocation(photo)}</span>
                    <span className="shrink-0 pl-3">{photo.date}</span>
                  </div>
                </div>
              </article>
            </button>
          ))}
        </div>
      </SurfaceCard>

      <Dialog open={!!selectedPhoto} onOpenChange={closeLightbox}>
        <DialogContent className="max-h-[100svh] max-w-[100vw] border-none bg-[rgba(7,10,15,0.96)] p-0 shadow-none sm:max-w-[100vw]" showCloseButton={false}>
          {selectedPhoto ? (
            <div className="relative grid min-h-[100svh] gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative flex min-h-[55svh] items-center justify-center p-4 sm:p-8 lg:p-10">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-3 top-3 z-10 text-white hover:bg-white/10 sm:right-5 sm:top-5"
                  onClick={closeLightbox}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="sr-only">Close</span>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 z-10 text-white hover:bg-white/10 sm:left-5"
                  onClick={() => goToOffset(-1)}
                >
                  <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="sr-only">Previous</span>
                </Button>

                <div className="w-full max-w-[900px] rounded-[1.45rem] bg-[#fffdf8] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-4">
                  <div className="relative overflow-hidden rounded-[0.95rem] bg-slate-100">
                    <div className="relative h-[48svh] sm:h-[58svh]">
                      <Image
                        src={selectedPhoto.src}
                        alt={selectedPhoto.alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 92vw, 900px"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed border-stone-200 px-2 pb-1 pt-4 text-xs text-stone-500">
                    <span>{selectedPhoto.albumName}</span>
                    <span>{`${lightboxIndex + 1} / ${filteredPhotos.length}`}</span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 z-10 text-white hover:bg-white/10 sm:right-5"
                  onClick={() => goToOffset(1)}
                >
                  <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>

              <aside className="border-t border-white/10 bg-white/[0.04] p-5 text-white sm:p-6 lg:border-l lg:border-t-0">
                <p className="text-[0.72rem] tracking-[0.26em] text-white/45">PHOTO DETAIL</p>
                <h3 className="mt-4 text-3xl font-medium tracking-tight">{selectedPhoto.alt}</h3>
                <p className="mt-4 text-sm leading-8 text-white/70">{selectedPhoto.caption}</p>

                <div className={cn("mt-6 rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-4 text-[1.05rem] text-white/72", handwritten.className)}>
                  <div className="flex items-center justify-between gap-4">
                    <span>{getDisplayLocation(selectedPhoto)}</span>
                    <span>{selectedPhoto.date}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Album</span>
                    <span>{selectedPhoto.albumName}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Category</span>
                    <span>{selectedPhoto.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Frame</span>
                    <span>{`${selectedPhoto.width} x ${selectedPhoto.height}`}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[0.72rem] tracking-[0.22em] text-white/45">EXIF</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {getExifRows(selectedPhoto).map((row) => (
                      <div key={row.label} className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/38">{row.label}</p>
                        <p className="mt-2 text-sm text-white/70">{row.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedPhoto.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="secondary"
                    className="rounded-full bg-white text-slate-900 hover:bg-white/90"
                    onClick={() => goToOffset(-1)}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/10"
                    onClick={() => goToOffset(1)}
                  >
                    Next
                  </Button>
                </div>
              </aside>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
