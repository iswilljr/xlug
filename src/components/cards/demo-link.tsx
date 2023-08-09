'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useMemo, useState } from 'react'
import { Check, Copy, MoreVert, QrCode, Trash } from 'iconoir-react'
import { CopyButton } from '@/ui/copy-button'
import { generateHostIconFromUrl, generateShortLink, prettyUrl } from '@/utils/links'
import { Button } from '@/ui/button'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { QRCodeDialog } from '../dialogs/qr-code'
import type { Link as LinkSchema } from '@/utils/schemas'

interface LinkCardProps extends Omit<LinkSchema, 'key'> {
  shortLink: string
  onDelete?: () => void
  withRemove?: boolean
}

const onCopy = () => toast.success('Short link copied to the clipboard.')

export function DemoLinkCard({ description, destination, shortLink, withRemove = false, onDelete }: LinkCardProps) {
  const [isQRCodeDialogOpen, setQRCodeDialogOpen] = useState(false)
  const data = useMemo(
    () => ({
      link: generateShortLink(shortLink),
      logo: generateHostIconFromUrl(destination),
      destination: prettyUrl(destination),
    }),
    [destination, shortLink]
  )

  return (
    <div className='flex h-[4.75rem] max-w-full gap-2 rounded-lg border border-neutral-200 bg-white p-4 shadow-lg'>
      <div className='flex-shrink-0'>
        <Image
          width={40}
          height={40}
          loading='lazy'
          src={data.logo}
          alt={shortLink}
          className='h-10 w-10 rounded-full object-cover'
        />
      </div>
      <div className='flex-1 overflow-hidden'>
        <div className='flex max-w-[80%] items-center gap-1'>
          <Link href={data.link} target='_blank' className='truncate font-medium hover:underline' rel='noreferrer'>
            {shortLink}
          </Link>
          <CopyButton
            size='icon'
            variant='secondary'
            aria-label='Copy Short Link'
            className='h-6 w-6 rounded-full bg-neutral-200 px-0.5 text-neutral-600'
            copied={<Check className='h-4 w-4 text-green-800' />}
            idle={<Copy className='h-4 w-4' />}
            value={data.link}
            onSuccess={onCopy}
          />
        </div>
        <div className='flex items-center gap-2'>
          <Link
            href={destination}
            target='_blank'
            className='truncate text-sm text-neutral-700 hover:underline'
            rel='noreferrer'
          >
            {data.destination}
          </Link>
        </div>
      </div>
      <div className='flex flex-shrink-0 items-center justify-center'>
        <DropdownMenu
          align='end'
          classNames={{ item: 'text-neutral-500 focus:text-neutral-700' }}
          items={[
            {
              label: 'Qr Code',
              icon: <QrCode className='h-4 w-4' />,
              onClick: () => setQRCodeDialogOpen(true),
            },
            ...(withRemove
              ? [
                  {
                    label: 'Delete',
                    icon: <Trash className='h-4 w-4' />,
                    className: 'text-red-500 focus:text-red-500',
                    onClick: onDelete,
                  },
                ]
              : []),
          ]}
          trigger={
            <Button size='icon' variant='ghost' aria-label='Open more options menu' className='w-auto px-1'>
              <MoreVert className='h-5 w-5' />
            </Button>
          }
        />
        <QRCodeDialog
          open={isQRCodeDialogOpen}
          onOpenChange={setQRCodeDialogOpen}
          link={{ key: shortLink, description, destination }}
        />
      </div>
    </div>
  )
}
