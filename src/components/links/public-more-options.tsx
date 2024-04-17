'use client'

import useSWR from 'swr'
import axios from 'redaxios'
import useLocalStorage from 'use-local-storage-state'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { useClipboard } from 'use-clipboard-copy'
import { CopyIcon, ExpandIcon, MoreVerticalIcon, QrCodeIcon, BarChartIcon, TrashIcon } from 'lucide-react'
import { LINKS_DATA_KEY, PUBLIC_DEFAULT_LINK_KEY } from '@/config/constants'
import { generateShortLink } from '@/utils/links'
import { formatHumanReadable } from '@/utils/formatter'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { pushModal } from '@/components/dialogs'
import { Skeleton } from '@/ui/skeleton'
import type { LinkRow, StatsRow } from '@/types/tables'

export interface PublicLinkMoreOptionsButtonProps {
  link: LinkRow
  disableStatsOption?: boolean
  disableDeleteOption?: boolean
}

export function PublicLinkMoreOptionsButton({
  link,
  disableDeleteOption = false,
  disableStatsOption = false,
}: PublicLinkMoreOptionsButtonProps) {
  const [, setLinks] = useLocalStorage<LinkRow[]>(LINKS_DATA_KEY, {
    defaultValue: [],
    storageSync: false,
  })
  const clipboard = useClipboard()

  const copyAction = useCallback(() => {
    try {
      if (!clipboard.isSupported()) throw Error('Clipboard not supported')

      clipboard.copy(generateShortLink(link.key))
      toast.success('Short Link Copied')
    } catch (error) {
      toast.error('Your browser does not support copying values')
    }
  }, [clipboard, link.key])

  const deleteAction = useCallback(() => {
    setLinks(prev => prev.filter(storeLink => storeLink.key !== link.key))
  }, [link.key, setLinks])

  const isPublicDefaultLink = link.key === PUBLIC_DEFAULT_LINK_KEY

  const { data: totalOfClicksData, isLoading } = useSWR(`/api/links/stats?public`, async key =>
    isPublicDefaultLink ? await axios.get<StatsRow[]>(key).then(res => res.data) : null
  )

  return (
    <div className='flex flex-shrink-0 items-center justify-center gap-1'>
      {isPublicDefaultLink && (
        <>
          {isLoading ? (
            <Skeleton className='h-7 w-20' />
          ) : (
            <button
              onClick={() => pushModal('LinkStats', { link })}
              className='inline-flex shrink-0 items-center gap-1 rounded-md bg-neutral-200/50 px-2 py-1 text-sm dark:bg-neutral-800/80'
            >
              <BarChartIcon className='size-4' />
              {`${formatHumanReadable(totalOfClicksData?.[0]?.value ?? 0)} Clicks`}
            </button>
          )}
        </>
      )}
      <DropdownMenu
        align='end'
        items={[
          {
            label: 'Expand',
            icon: <ExpandIcon className='h-4 w-4' />,
            onClick: () => pushModal('ExpandedLink', { link }),
          },
          {
            label: 'Stats',
            disabled: disableStatsOption,
            icon: <BarChartIcon className='h-4 w-4' />,
            shortcut: <p className='rounded-full bg-sky-500 px-2 py-0.5 text-[10px] font-bold text-white'>New</p>,
            onClick: () => pushModal('LinkStats', { link }),
          },
          {
            label: 'Copy',
            icon: <CopyIcon className='h-4 w-4' />,
            onClick: copyAction,
          },
          {
            label: 'Qr Code',
            icon: <QrCodeIcon className='h-4 w-4' />,
            onClick: () => pushModal('QRCode', { link }),
          },
          {
            label: 'Delete',
            disabled: disableDeleteOption,
            icon: <TrashIcon className='h-4 w-4' />,
            className:
              'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-300 dark:focus:bg-red-800',
            onClick: deleteAction,
          },
        ]}
        trigger={
          <Button size='icon' variant='ghost' aria-label='Open more options menu' className='size-auto p-1'>
            <MoreVerticalIcon className='h-5 w-5' />
          </Button>
        }
      />
    </div>
  )
}
