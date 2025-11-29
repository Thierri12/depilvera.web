"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  message: string
  type: "alert" | "confirm" | "prompt"
  defaultValue?: string
  onPromptSubmit?: (value: string) => void
}

export default function CustomDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type,
  defaultValue = "",
  onPromptSubmit,
}: CustomDialogProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirm = () => {
    if (type === "prompt") {
      const input = document.getElementById("prompt-input") as HTMLInputElement
      onPromptSubmit?.(input.value)
    } else if (type === "confirm") {
      onConfirm?.()
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title || "Atenção"}</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-sm text-foreground">{message}</p>

        {type === "prompt" && (
          <input
            id="prompt-input"
            type="text"
            defaultValue={defaultValue}
            className="mb-4 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm()
            }}
          />
        )}

        <div className="flex justify-end gap-3">
          {type !== "alert" && (
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button onClick={handleConfirm}>{type === "alert" ? "OK" : "Confirmar"}</Button>
        </div>
      </div>
    </div>
  )
}
