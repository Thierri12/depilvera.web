"use client"

import { useState } from "react"

interface DialogState {
  isOpen: boolean
  type: "alert" | "confirm" | "prompt"
  title?: string
  message: string
  defaultValue?: string
  onConfirm?: () => void
  onPromptSubmit?: (value: string) => void
}

export function useDialog() {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: "alert",
    message: "",
  })

  const showAlert = (message: string, title?: string) => {
    setDialogState({
      isOpen: true,
      type: "alert",
      message,
      title,
    })
  }

  const showConfirm = (message: string, onConfirm: () => void, title?: string) => {
    setDialogState({
      isOpen: true,
      type: "confirm",
      message,
      title,
      onConfirm,
    })
  }

  const showPrompt = (message: string, onSubmit: (value: string) => void, defaultValue = "", title?: string) => {
    setDialogState({
      isOpen: true,
      type: "prompt",
      message,
      title,
      defaultValue,
      onPromptSubmit: onSubmit,
    })
  }

  const closeDialog = () => {
    setDialogState((prev) => ({ ...prev, isOpen: false }))
  }

  return {
    dialogState,
    showAlert,
    showConfirm,
    showPrompt,
    closeDialog,
  }
}
