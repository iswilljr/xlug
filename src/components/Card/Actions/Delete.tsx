import { Text, UnstyledButton } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import axios from 'redaxios'
import { useStyles } from './action.styles'
import { toast } from 'sonner'
import { useRouter } from 'next/router'
import { IconTrash } from '@tabler/icons-react'

export interface ActionDeleteProps {
  id: string
  buttonRef: React.ForwardedRef<HTMLButtonElement>
  onDelete?: () => void
}

export function ActionDelete({ id, buttonRef, onDelete }: ActionDeleteProps) {
  const router = useRouter()
  const { classes, cx } = useStyles()

  return (
    <UnstyledButton
      ref={buttonRef}
      aria-label='Delete the shortened link'
      className={cx(classes.action, classes.dangerAction)}
      onClick={() =>
        openConfirmModal({
          title: (
            <Text weight='bold' size='md'>
              Confirm to delete
            </Text>
          ),
          children:
            'Are you sure about deleting this xlug? This action cannot be reversed and you will not be able to restore all data.',
          labels: {
            cancel: 'Cancel',
            confirm: 'Delete',
          },

          cancelProps: {
            px: 'xl',
            py: 'xs',
            size: 'xs',
          },
          confirmProps: {
            px: 'xl',
            py: 'xs',
            size: 'xs',
          },
          onConfirm: async () => {
            try {
              if (onDelete) {
                onDelete()
              } else {
                await axios.post('/api/xlug/delete', { id })
                void router.push('/dashboard', undefined, { scroll: false })
              }

              toast.success('Successfully deleted your xlug')
            } catch (error: any) {
              const message = typeof error?.data?.message === 'string' ? error.data.message : null
              toast.error(message ?? 'Something went wrong, try again')
            }
          },
        })
      }
    >
      <IconTrash size={18} />
    </UnstyledButton>
  )
}
