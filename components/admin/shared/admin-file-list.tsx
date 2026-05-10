import { FileJson2 } from "lucide-react"

export function AdminFileList({ files }: { files: string[] }) {
  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file}
          className="flex items-center gap-2 rounded-[1rem] border border-black/8 bg-white/80 px-3 py-2 text-sm text-slate-600 dark:border-white/8 dark:bg-white/[0.04] dark:text-slate-300"
        >
          <FileJson2 className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          <code className="text-xs">{file}</code>
        </div>
      ))}
    </div>
  )
}
