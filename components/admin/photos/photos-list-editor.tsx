"use client"

import Image from "next/image"
import { useActionState, useMemo, useState } from "react"
import { Copy, Plus, Star, Trash2 } from "lucide-react"
import { savePhotoItems } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import { Button } from "@/components/ui/button"
import type { PhotoAlbum, PhotoItem } from "@/lib/content"

const initialState = { ok: false, message: "" }

interface EditablePhoto extends PhotoItem {
  clientKey: string
}

function createClientKey() {
  return `photo-${Math.random().toString(36).slice(2, 10)}`
}

function toEditablePhoto(item: PhotoItem): EditablePhoto {
  return { ...item, clientKey: createClientKey() }
}

function serializePhotos(items: EditablePhoto[]) {
  return items
    .map(
      ({ clientKey: _clientKey, ...item }) =>
        `${item.id} | ${item.src} | ${item.alt} | ${item.width} | ${item.height} | ${item.albumId} | ${item.date} | ${item.category} | ${String(item.featured)} | ${item.sortOrder} | ${item.tags.join(", ")} | ${item.caption}`,
    )
    .join("\n")
}

function createEmptyPhoto(albums: PhotoAlbum[], nextSortOrder: number): EditablePhoto {
  const fallbackAlbum = albums[0]

  return {
    clientKey: createClientKey(),
    id: `photo-${nextSortOrder}`,
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&h=1400&fit=crop",
    alt: "新照片",
    width: 1000,
    height: 1400,
    albumId: fallbackAlbum?.id ?? "default",
    date: "2026-05-10",
    caption: "写一点这张照片的说明。",
    tags: ["新图"],
    category: fallbackAlbum?.name ?? "未分类",
    featured: false,
    sortOrder: nextSortOrder,
  }
}

function sanitizeNumber(value: string, fallback: number) {
  const next = Number.parseInt(value, 10)
  return Number.isFinite(next) ? next : fallback
}

function tagsToString(tags: string[]) {
  return tags.join(", ")
}

function stringToTags(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

export function PhotosListEditor({ items, albums }: { items: PhotoItem[]; albums: PhotoAlbum[] }) {
  const [editorState, setEditorState] = useState(() => {
    const photos = items.map(toEditablePhoto)
    return {
      photos,
      selectedKey: photos[0]?.clientKey ?? "",
    }
  })
  const [state, formAction] = useActionState(savePhotoItems, initialState)

  const { photos, selectedKey } = editorState

  const selectedPhoto = useMemo(
    () => photos.find((item) => item.clientKey === selectedKey) ?? photos[0] ?? null,
    [photos, selectedKey],
  )

  const albumMap = useMemo(() => new Map(albums.map((album) => [album.id, album.name])), [albums])

  function updatePhoto(clientKey: string, patch: Partial<PhotoItem>) {
    setEditorState((current) => ({
      ...current,
      photos: current.photos.map((item) => (item.clientKey === clientKey ? { ...item, ...patch } : item)),
    }))
  }

  function addPhoto() {
    setEditorState((current) => {
      const nextSortOrder = Math.max(...current.photos.map((item) => item.sortOrder), 0) + 1
      const nextPhoto = createEmptyPhoto(albums, nextSortOrder)
      return {
        photos: [...current.photos, nextPhoto],
        selectedKey: nextPhoto.clientKey,
      }
    })
  }

  function duplicatePhoto(clientKey: string) {
    setEditorState((current) => {
      const source = current.photos.find((item) => item.clientKey === clientKey)
      if (!source) return current

      const nextPhoto: EditablePhoto = {
        ...source,
        clientKey: createClientKey(),
        id: `${source.id}-copy-${current.photos.length + 1}`,
        sortOrder: Math.max(...current.photos.map((item) => item.sortOrder), 0) + 1,
      }

      return {
        photos: [...current.photos, nextPhoto],
        selectedKey: nextPhoto.clientKey,
      }
    })
  }

  function removePhoto(clientKey: string) {
    setEditorState((current) => {
      if (current.photos.length === 1) return current
      const nextPhotos = current.photos.filter((item) => item.clientKey !== clientKey)
      return {
        photos: nextPhotos,
        selectedKey: current.selectedKey === clientKey ? nextPhotos[0]?.clientKey ?? "" : current.selectedKey,
      }
    })
  }

  return (
    <AdminSectionCard
      title="照片工作台"
      description="现在可以逐条编辑照片记录、添加空白项、复制现有项，并在右侧实时预览。保存时仍写回同一份 photos.json。"
    >
      <form action={formAction} className="space-y-4">
        <textarea name="items" value={serializePhotos(photos)} readOnly className="hidden" />

        <div className="grid gap-4 xl:grid-cols-[0.58fr_0.92fr_0.9fr]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">照片记录</p>
              <Button type="button" variant="outline" size="sm" onClick={addPhoto}>
                <Plus className="h-4 w-4" />
                新增
              </Button>
            </div>

            <div className="max-h-[720px] space-y-2 overflow-y-auto pr-1">
              {photos.map((photo) => {
                const active = selectedPhoto?.clientKey === photo.clientKey

                return (
                  <button
                    key={photo.clientKey}
                    type="button"
                    onClick={() => setEditorState((current) => ({ ...current, selectedKey: photo.clientKey }))}
                    className={`w-full rounded-[1.15rem] border px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                        : "border-black/10 bg-slate-50/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{photo.alt}</p>
                        <p className={`mt-1 truncate text-xs ${active ? "text-white/70 dark:text-slate-700" : "text-slate-500 dark:text-slate-400"}`}>{photo.id}</p>
                      </div>
                      {photo.featured ? <Star className={`h-4 w-4 ${active ? "fill-current" : "text-amber-500"}`} /> : null}
                    </div>
                    <div className={`mt-2 flex items-center justify-between text-xs ${active ? "text-white/70 dark:text-slate-700" : "text-slate-500 dark:text-slate-400"}`}>
                      <span>{albumMap.get(photo.albumId) ?? photo.albumId}</span>
                      <span>{`#${photo.sortOrder}`}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedPhoto ? (
            <div className="space-y-4 rounded-[1.4rem] border border-black/10 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">照片字段</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">改完直接保存，不会影响其他内容域。</p>
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => duplicatePhoto(selectedPhoto.clientKey)}>
                    <Copy className="h-4 w-4" />
                    复制
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => removePhoto(selectedPhoto.clientKey)} disabled={photos.length === 1}>
                    <Trash2 className="h-4 w-4" />
                    删除
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>照片 ID</span>
                  <input
                    value={selectedPhoto.id}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { id: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>Alt 文案</span>
                  <input
                    value={selectedPhoto.alt}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { alt: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>图片地址</span>
                <input
                  value={selectedPhoto.src}
                  onChange={(event) => updatePhoto(selectedPhoto.clientKey, { src: event.target.value })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>宽度</span>
                  <input
                    type="number"
                    value={selectedPhoto.width}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { width: sanitizeNumber(event.target.value, selectedPhoto.width) })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>高度</span>
                  <input
                    type="number"
                    value={selectedPhoto.height}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { height: sanitizeNumber(event.target.value, selectedPhoto.height) })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>所属相册</span>
                  <select
                    value={selectedPhoto.albumId}
                    onChange={(event) =>
                      updatePhoto(selectedPhoto.clientKey, {
                        albumId: event.target.value,
                        category: albumMap.get(event.target.value) ?? selectedPhoto.category,
                      })
                    }
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  >
                    {albums.map((album) => (
                      <option key={album.id} value={album.id}>
                        {album.name} ({album.id})
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>分类显示名</span>
                  <input
                    value={selectedPhoto.category}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { category: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>日期</span>
                  <input
                    value={selectedPhoto.date}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { date: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>排序</span>
                  <input
                    type="number"
                    value={selectedPhoto.sortOrder}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { sortOrder: sanitizeNumber(event.target.value, selectedPhoto.sortOrder) })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-2.5 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={selectedPhoto.featured}
                    onChange={(event) => updatePhoto(selectedPhoto.clientKey, { featured: event.target.checked })}
                    className="h-4 w-4"
                  />
                  <span>首页精选</span>
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>标签</span>
                <input
                  value={tagsToString(selectedPhoto.tags)}
                  onChange={(event) => updatePhoto(selectedPhoto.clientKey, { tags: stringToTags(event.target.value) })}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </label>

              <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>说明文案</span>
                <textarea
                  value={selectedPhoto.caption}
                  onChange={(event) => updatePhoto(selectedPhoto.clientKey, { caption: event.target.value })}
                  rows={5}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </label>
            </div>
          ) : null}

          {selectedPhoto ? (
            <div className="space-y-4 rounded-[1.4rem] border border-black/10 bg-[linear-gradient(180deg,rgba(248,250,252,0.9),rgba(241,245,249,0.82))] p-4 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">实时预览</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">这里看到的就是这条照片卡片的主要呈现信息。</p>
              </div>

              <div className="overflow-hidden rounded-[1.25rem] border border-black/8 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950">
                <div className="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900">
                  <Image src={selectedPhoto.src} alt={selectedPhoto.alt} fill className="object-cover" sizes="(max-width: 1280px) 100vw, 420px" />
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    <span>{albumMap.get(selectedPhoto.albumId) ?? selectedPhoto.albumId}</span>
                    <span>{selectedPhoto.date}</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">{selectedPhoto.alt}</h3>
                  <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{selectedPhoto.caption}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-black/10 bg-slate-50 px-3 py-1 text-xs text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-black/8 bg-white/70 p-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                  <p className="text-xs tracking-[0.18em] text-slate-400 dark:text-slate-500">FRAME</p>
                  <p className="mt-2">{`${selectedPhoto.width} × ${selectedPhoto.height}`}</p>
                </div>
                <div className="rounded-[1rem] border border-black/8 bg-white/70 p-3 text-sm text-slate-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                  <p className="text-xs tracking-[0.18em] text-slate-400 dark:text-slate-500">FLAGS</p>
                  <p className="mt-2">{selectedPhoto.featured ? "Featured on home" : "Gallery only"}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存照片列表" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
