'use client'

import { forwardRef, useCallback } from 'react'
import { useClipboard, type UseClipboardOptions } from 'use-clipboard-copy'
import { Button, type ButtonProps } from './button'

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'onError'>, UseClipboardOptions {
  copied: React.ReactNode
  idle: React.ReactNode
  value: string
}

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ copied, idle, value, copiedTimeout = 1500, onError, onSuccess, selectOnCopy, selectOnError, ...props }, ref) => {
    const { copied: _copied, copy } = useClipboard({ copiedTimeout, onError, onSuccess, selectOnCopy, selectOnError })

    const onCopy = useCallback(() => {
      copy(value)
    }, [copy, value])

    return (
      <Button ref={ref} onClick={onCopy} {...props}>
        {_copied ? copied : idle}
      </Button>
    )
  }
)

CopyButton.displayName = 'CopyButton'

export { CopyButton }
