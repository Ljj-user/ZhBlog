import type { Metadata } from "next"
import { PhotoGallery } from "@/components/photo-gallery"

export const metadata: Metadata = {
  title: "照片",
  description: "记录生活中的光线、路途、风景与零碎片刻。",
}

const photos = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=1400&fit=crop",
    alt: "风从山脊吹过",
    width: 1000,
    height: 1400,
    album: "旅行",
    date: "2024-01-15",
    caption: "云海铺满山谷，像一层缓慢移动的雾。",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&h=1400&fit=crop",
    alt: "晨光落在树梢",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2024-01-10",
    caption: "天刚亮的时候，山里的空气像被洗过一遍。",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1000&h=1400&fit=crop",
    alt: "一片安静的湖",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2024-01-05",
    caption: "湖面把云和山都折叠进了一层倒影里。",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1000&h=1400&fit=crop",
    alt: "雾中的山谷",
    width: 1000,
    height: 1400,
    album: "旅行",
    date: "2024-01-01",
    caption: "远处什么都不急着显现，像一页留白。",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&h=1400&fit=crop",
    alt: "阳光穿过树林",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2023-12-28",
    caption: "树影落下来时，地面像被轻轻描过一遍。",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1000&h=1400&fit=crop",
    alt: "山间公路",
    width: 1000,
    height: 1400,
    album: "旅行",
    date: "2023-12-25",
    caption: "有些风景适合坐车经过，有些适合停下来。",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1000&h=1400&fit=crop",
    alt: "日落草原",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2023-12-20",
    caption: "光线往下落的时候，颜色会突然温柔很多。",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1000&h=1400&fit=crop",
    alt: "瀑布",
    width: 1000,
    height: 1400,
    album: "旅行",
    date: "2023-12-15",
    caption: "水声很大，站在旁边反而会安静下来。",
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1400&fit=crop",
    alt: "城市夜景",
    width: 1000,
    height: 1400,
    album: "城市",
    date: "2023-12-10",
    caption: "夜里亮起的窗户，总让城市像还醒着。",
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1000&h=1400&fit=crop",
    alt: "雪山星空",
    width: 1000,
    height: 1400,
    album: "旅行",
    date: "2023-12-05",
    caption: "抬头的时候，会突然觉得自己也被放轻了。",
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=1000&h=1400&fit=crop",
    alt: "傍晚的海边",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2023-12-01",
    caption: "海浪反复把傍晚推回来一点点。",
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=1000&h=1400&fit=crop",
    alt: "秋天森林",
    width: 1000,
    height: 1400,
    album: "自然",
    date: "2023-11-28",
    caption: "颜色在季节里慢慢变旧，也慢慢变深。",
  },
]

const albums = Array.from(new Set(photos.map((photo) => photo.album)))

export default function PhotosPage() {
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2.4rem] border border-white/70 bg-white/78 p-6 shadow-[0_28px_90px_rgba(31,41,55,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
          <p className="text-sm tracking-[0.28em] text-slate-400 dark:text-slate-500">PHOTO LOGBOOK</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-[2.3rem] dark:text-slate-100">
            照片
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400">
            记录一些风景、路途和日常碎片。比起整齐的图库，我更想让这里像一本被翻阅过的拍立得相册。
          </p>
        </section>

        <div className="mt-6">
          <PhotoGallery photos={photos} albums={albums} />
        </div>
      </div>
    </main>
  )
}
