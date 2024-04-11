'use client'

import { create } from 'zustand'

interface CommandMenuState {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const useCommandMenu = create<CommandMenuState>(set => ({
  open: false,
  onOpenChange(open) {
    set({ open })
  },
}))
