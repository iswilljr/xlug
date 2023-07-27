import { UnstyledButton } from '@mantine/core'
import { IconCopy } from '@tabler/icons-react'
import { toast } from 'sonner'
import { useStyles } from './action.styles'

export interface ActionCopyProps {
  link: string
  buttonRef: React.ForwardedRef<HTMLButtonElement>
}

const copyToClipboard = async (txt: string) => {
  try {
    const clipboardItem = new ClipboardItem({
      'text/plain': new Blob([txt], { type: 'text/plain' }),
    })
    await navigator.clipboard.write([clipboardItem])
  } catch (error) {
    await navigator.clipboard.writeText(txt)
  }
  toast.success('Copied to clipboard!')
}

export function ActionCopy({ link, buttonRef }: ActionCopyProps) {
  const { classes } = useStyles()

  return (
    <UnstyledButton
      ref={buttonRef}
      aria-label='Copy the shortened link'
      className={classes.action}
      onClick={() => copyToClipboard(link)}
    >
      <IconCopy size={18} />
    </UnstyledButton>
  )
}
