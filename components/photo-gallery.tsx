"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface Photo {
  id: string
  src: string
  alt: string
  width: number
  height: number
  album: string
  date: string
  caption: string
}

interface PhotoGalleryProps {
  photos: Photo[]
  albums: string[]
}

const cardRotations = ["-rotate-[2.4deg]", "rotate-[1.8deg]", "-rotate-[1.2deg]", "rotate-[2.8deg]"]

export function PhotoGallery({ photos, albums }: PhotoGalleryProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filteredPhotos = useMemo(
    () => (selectedAlbum ? photos.filter((photo) => photo.album === selectedAlbum) : photos),
    [photos, selectedAlbum],
  )

  const openLightbox = (photo: Photo) => {
    const index = filteredPhotos.findIndex((item) => item.id === photo.id)
    setLightboxIndex(index)
    setSelectedPhoto(photo)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const goToPrevious = () => {
    const newIndex = lightboxIndex > 0 ? lightboxIndex - 1 : filteredPhotos.length - 1
    setLightboxIndex(newIndex)
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  const goToNext = () => {
    const newIndex = lightboxIndex < filteredPhotos.length - 1 ? lightboxIndex + 1 : 0
    setLightboxIndex(newIndex)
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  return (
    <>
      <section className="rounded-[2.4rem] border border-white/70 bg-white/78 p-6 shadow-[0_24px_80px_rgba(31,41,55,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.05] dark:shadow-[0_16px_50px_rgba(0,0,0,0.22)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.72rem] tracking-[0.28em] text-slate-400 dark:text-slate-500">ALBUM FILTER</p>
            <h2 className="mt-3 text-2xl font-medium text-slate-800 dark:text-slate-100">拍立得墙</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedAlbum === null ? "secondary" : "outline"}
              className="cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
              onClick={() => setSelectedAlbum(null)}
            >
              全部
            </Badge>
            {albums.map((album) => (
              <Badge
                key={album}
                variant={selectedAlbum === album ? "secondary" : "outline"}
                className="cursor-pointer rounded-full px-4 py-1.5 text-sm transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
                onClick={() => setSelectedAlbum(album)}
              >
                {album}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {filteredPhotos.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => openLightbox(photo)}
              className={`group text-left transition-all duration-300 hover:-translate-y-2 hover:rotate-0 ${cardRotations[index % cardRotations.length]}`}
            >
              <article className="rounded-[1.35rem] bg-white p-4 shadow-[0_22px_46px_rgba(31,41,55,0.12)] ring-1 ring-slate-200/80 dark:bg-slate-50 dark:ring-white/10">
                <div className="relative overflow-hidden rounded-[0.85rem] bg-slate-100">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-200/90 px-1 pb-1 pt-4">
                  <p className="text-[0.68rem] tracking-[0.24em] text-slate-400">{photo.album}</p>
                  <h3 className="mt-2 text-xl font-medium leading-tight text-slate-800">{photo.alt}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{photo.caption}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <span>{`Frame ${String(index + 1).padStart(2, "0")}`}</span>
                    <span>{photo.date}</span>
                  </div>
                </div>
              </article>
            </button>
          ))}
        </div>
      </section>

      <Dialog open={!!selectedPhoto} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-6xl border-none bg-[rgba(7,10,15,0.94)] p-0 shadow-none" showCloseButton={false}>
          <div className="relative grid min-h-[82vh] gap-0 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="relative flex items-center justify-center p-6 sm:p-10">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10 text-white hover:bg-white/10"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">关闭</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 z-10 text-white hover:bg-white/10"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">上一张</span>
              </Button>

              {selectedPhoto && (
                <div className="rounded-[1.4rem] bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <div className="relative h-[58vh] w-[min(68vw,760px)] max-w-full overflow-hidden rounded-[0.9rem] bg-slate-100">
                    <Image
                      src={selectedPhoto.src}
                      alt={selectedPhoto.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 90vw, 760px"
                    />
                  </div>
                  <div className="flex items-center justify-between border-t border-dashed border-slate-200 px-2 pb-1 pt-4 text-xs text-slate-400">
                    <span>{selectedPhoto.album}</span>
                    <span>{selectedPhoto.date}</span>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 z-10 text-white hover:bg-white/10"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">下一张</span>
              </Button>
            </div>

            {selectedPhoto && (
              <aside className="border-t border-white/10 bg-white/[0.03] p-6 text-white lg:border-l lg:border-t-0">
                <p className="text-[0.72rem] tracking-[0.26em] text-white/45">PHOTO DETAIL</p>
                <h3 className="mt-4 text-3xl font-medium tracking-tight">{selectedPhoto.alt}</h3>
                <p className="mt-5 text-sm leading-8 text-white/68">{selectedPhoto.caption}</p>

                <div className="mt-8 space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>相册分类</span>
                    <span>{selectedPhoto.album}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>拍摄日期</span>
                    <span>{selectedPhoto.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>当前序号</span>
                    <span>{`${lightboxIndex + 1} / ${filteredPhotos.length}`}</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    variant="secondary"
                    className="rounded-full bg-white text-slate-900 hover:bg-white/90"
                    onClick={goToPrevious}
                  >
                    上一张
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/8"
                    onClick={goToNext}
                  >
                    下一张
                  </Button>
                </div>
              </aside>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
