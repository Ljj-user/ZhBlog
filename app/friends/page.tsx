import Link from "next/link"
import type { Metadata } from "next"
import { ArrowUpRight, Link2, MessageCircleHeart, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "友链",
  description: "收藏一些喜欢的网站、朋友的博客与值得常逛的角落。",
}

const friends = [
  {
    name: "留白日志",
    url: "https://example.com",
    description: "记录设计、写作和慢节奏生活的个人空间，排版很舒服。",
    tag: "Design / Writing",
  },
  {
    name: "山野程序员",
    url: "https://example.com",
    description: "前端工程、效率工具和长期主义实践，内容扎实也很真诚。",
    tag: "Frontend / Tooling",
  },
  {
    name: "微光相册",
    url: "https://example.com",
    description: "摄影、旅行和日常观察，适合偶尔点进去发发呆。",
    tag: "Photo / Travel",
  },
  {
    name: "产品散步",
    url: "https://example.com",
    description: "聊产品感受、交互细节和互联网观察，更新频率稳定。",
    tag: "Product / UX",
  },
]

export default function FriendsPage() {
  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="rounded-[2.4rem] border border-black/10 bg-white/68 p-6 shadow-[0_28px_90px_rgba(30,23,15,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/6 dark:shadow-none sm:p-8 lg:p-10">
          <p className="text-sm tracking-[0.28em] text-slate-400 dark:text-slate-500">FRIENDS & LINKS</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-[2.2rem] dark:text-slate-100">
            友链
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-500 dark:text-slate-400">
            这里放一些我愿意长期回访的网站。它们也许在写技术，也许在记录生活，但都有很鲜明的作者气质。
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {friends.map((friend) => (
              <Link
                key={friend.name}
                href={friend.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-[1.9rem] border border-black/10 bg-white/62 p-6 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-white/78 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/6 dark:hover:bg-white/[0.08]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-black/10 px-3 py-1 text-xs tracking-[0.18em] text-slate-500 dark:border-white/10 dark:text-slate-400">
                    {friend.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-slate-500" />
                </div>
                <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em] text-slate-800 dark:text-slate-100">
                  {friend.name}
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">{friend.description}</p>
                <p className="mt-6 text-xs text-slate-400 dark:text-slate-500">{friend.url}</p>
              </Link>
            ))}
          </div>

          <div className="space-y-6">
            <section className="rounded-[2rem] border border-black/10 bg-[#181716] p-6 text-white dark:border-white/10">
              <div className="flex items-center gap-2 text-sm text-white/68">
                <Sparkles className="h-4 w-4" />
                <span>链接偏好</span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-white/68">
                  更偏爱有长期更新习惯、内容真实、个人风格明显的站点。
                </div>
                <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-white/68">
                  不一定要很“专业”，但希望它是有人味的，而不是纯模板化输出。
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-black/10 bg-white/62 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <MessageCircleHeart className="h-4 w-4" />
                <span>想交换友链</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                如果你的小站也想来这里串门，可以轻轻敲我一下，说不定很快就会一起并排晒太阳。
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
              >
                去关于页联系我
                <Link2 className="h-4 w-4" />
              </Link>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
