import { CheckCircle2, CircleDashed } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminSaveBar({
  note = "这一页先是骨架占位，下一阶段会接真实写入和局部保存。",
}: {
  note?: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] border border-black/10 bg-white/86 px-4 py-3 dark:border-white/10 dark:bg-white/[0.05]">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <CircleDashed className="h-4 w-4" />
        <span>{note}</span>
      </div>
      <Button type="button" disabled>
        <CheckCircle2 className="h-4 w-4" />
        保存能力待接入
      </Button>
    </div>
  )
}
