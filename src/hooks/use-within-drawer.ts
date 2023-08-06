import { useCallback, useEffect, useState } from 'react'
import { useIsMobile } from './use-is-mobile'

export interface UseWithinDrawerOptions {
  defaultOpen?: boolean
  onOpenChange?: (value: boolean) => void
  open?: boolean
}

export function useWithinDrawer({ defaultOpen, onOpenChange, open }: UseWithinDrawerOptions = {}) {
  const isMobile = useIsMobile()
  const [modalOpen, setModalOpen] = useState(defaultOpen ?? open ?? false)

  const onModalOpenChange = useCallback(
    (value: boolean) => {
      setModalOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  useEffect(() => {
    if (typeof open === 'boolean' && modalOpen !== open) {
      setModalOpen(open)
    }
  }, [modalOpen, open])

  return {
    isMobile,
    modalOpen,
    onModalOpenChange,
  }
}
