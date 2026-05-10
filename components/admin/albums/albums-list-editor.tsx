"use client"

import { useActionState, useMemo, useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { saveAlbumItems } from "@/app/admin/actions"
import { AdminSectionCard } from "@/components/admin/shared/admin-section-card"
import { FormStatusMessage } from "@/components/admin/shared/form-status-message"
import { FormSubmitButton } from "@/components/admin/shared/form-submit-button"
import { Button } from "@/components/ui/button"
import type { PhotoAlbum } from "@/lib/content"

const initialState = { ok: false, message: "" }

interface EditableAlbum extends PhotoAlbum {
  clientKey: string
}

function createClientKey() {
  return `album-${Math.random().toString(36).slice(2, 10)}`
}

function toEditableAlbum(item: PhotoAlbum): EditableAlbum {
  return { ...item, clientKey: createClientKey() }
}

function serializeAlbums(items: EditableAlbum[]) {
  return items.map(({ clientKey: _clientKey, ...item }) => `${item.id} | ${item.name} | ${item.description}`).join("\n")
}

function createEmptyAlbum(): EditableAlbum {
  return {
    clientKey: createClientKey(),
    id: "album-new",
    name: "新相册",
    description: "写一点这个相册的说明",
  }
}

export function AlbumsListEditor({ items }: { items: PhotoAlbum[] }) {
  const [editorState, setEditorState] = useState(() => {
    const albums = items.map(toEditableAlbum)
    return {
      albums,
      selectedKey: albums[0]?.clientKey ?? "",
    }
  })
  const [state, formAction] = useActionState(saveAlbumItems, initialState)

  const { albums, selectedKey } = editorState

  const selectedAlbum = useMemo(
    () => albums.find((item) => item.clientKey === selectedKey) ?? albums[0] ?? null,
    [albums, selectedKey],
  )

  function updateAlbum(clientKey: string, patch: Partial<PhotoAlbum>) {
    setEditorState((current) => ({
      ...current,
      albums: current.albums.map((item) => (item.clientKey === clientKey ? { ...item, ...patch } : item)),
    }))
  }

  function addAlbum() {
    setEditorState((current) => {
      const nextAlbum = createEmptyAlbum()
      return {
        albums: [...current.albums, nextAlbum],
        selectedKey: nextAlbum.clientKey,
      }
    })
  }

  function removeAlbum(clientKey: string) {
    setEditorState((current) => {
      if (current.albums.length === 1) return current
      const nextAlbums = current.albums.filter((item) => item.clientKey !== clientKey)
      return {
        albums: nextAlbums,
        selectedKey: current.selectedKey === clientKey ? nextAlbums[0]?.clientKey ?? "" : current.selectedKey,
      }
    })
  }

  return (
    <AdminSectionCard title="相册列表" description="相册已经不是长文本输入了。你可以在这里新增、切换和编辑相册实体，再单独保存。">
      <form action={formAction} className="space-y-4">
        <textarea name="items" value={serializeAlbums(albums)} readOnly className="hidden" />

        <div className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">相册记录</p>
              <Button type="button" variant="outline" size="sm" onClick={addAlbum}>
                <Plus className="h-4 w-4" />
                新增
              </Button>
            </div>

            <div className="space-y-2">
              {albums.map((album) => {
                const active = selectedAlbum?.clientKey === album.clientKey

                return (
                  <button
                    key={album.clientKey}
                    type="button"
                    onClick={() => setEditorState((current) => ({ ...current, selectedKey: album.clientKey }))}
                    className={`w-full rounded-[1.15rem] border px-4 py-3 text-left transition-colors ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                        : "border-black/10 bg-slate-50/80 text-slate-700 hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.07]"
                    }`}
                  >
                    <p className="text-sm font-semibold">{album.name}</p>
                    <p className={`mt-1 text-xs ${active ? "text-white/70 dark:text-slate-700" : "text-slate-500 dark:text-slate-400"}`}>{album.id}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {selectedAlbum ? (
            <div className="space-y-4 rounded-[1.4rem] border border-black/10 bg-slate-50/70 p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100">相册详情</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">照片记录里的 `albumId` 会引用这里的 id。</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={() => removeAlbum(selectedAlbum.clientKey)} disabled={albums.length === 1}>
                  <Trash2 className="h-4 w-4" />
                  删除
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>相册 ID</span>
                  <input
                    value={selectedAlbum.id}
                    onChange={(event) => updateAlbum(selectedAlbum.clientKey, { id: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <span>相册名称</span>
                  <input
                    value={selectedAlbum.name}
                    onChange={(event) => updateAlbum(selectedAlbum.clientKey, { name: event.target.value })}
                    className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <span>相册描述</span>
                <textarea
                  value={selectedAlbum.description}
                  onChange={(event) => updateAlbum(selectedAlbum.clientKey, { description: event.target.value })}
                  rows={5}
                  className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                />
              </label>
            </div>
          ) : null}
        </div>

        <FormStatusMessage state={state} />
        <div className="flex justify-end">
          <FormSubmitButton label="保存相册列表" />
        </div>
      </form>
    </AdminSectionCard>
  )
}
