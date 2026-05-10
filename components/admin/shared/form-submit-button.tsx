"use client"

import { LoaderCircle, Save } from "lucide-react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"

export function FormSubmitButton({ label = "保存" }: { label?: string }) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
      {pending ? "保存中..." : label}
    </Button>
  )
}
