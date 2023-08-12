'use client'

import Image from 'next/image'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'
import { useCallback, useMemo, useRef } from 'react'
import { Download, JpegFormat, PasteClipboard, PngFormat, SvgFormat } from 'iconoir-react'
import { generateHostIconFromUrl, generateShortLink } from '@/utils/links'
import { Button } from '@/ui/button'
import { Dialog } from '@/ui/dialog'
import { DropdownMenu } from '@/ui/dropdown-menu'
import { Separator } from '@/ui/separator'
import { type DownloadHtmlAsImageOptions, copyHtmlAsImageToClipboard, downloadHtmlAsImage } from '@/utils/images'
import type { Link } from '@/utils/schemas'

export interface QRCodeDialogProps {
  open: boolean
  link: Link
  trigger?: React.ReactNode
  onOpenChange: (value: boolean) => void
}

export function QRCodeDialog({ open, link, trigger, onOpenChange }: QRCodeDialogProps) {
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const data = useMemo(
    () => ({
      logo: generateHostIconFromUrl(link.destination),
      alt: link.key,
      value: generateShortLink(link.key),
      level: 'Q',
    }),
    [link]
  )

  const copyQRCodeToClipboard = useCallback(async () => {
    if (!qrCodeRef.current) return
    try {
      await copyHtmlAsImageToClipboard(qrCodeRef.current)
      toast.success('QR Code copied to the clipboard.')
    } catch (error) {
      toast.error('Your browser does not support copying images to the clipboard.')
    }
  }, [])

  const downloadImage = useCallback(
    async (options?: DownloadHtmlAsImageOptions) => {
      if (!qrCodeRef.current) return
      try {
        await downloadHtmlAsImage(qrCodeRef.current, link.key, options)
      } catch (error) {
        toast.error("Couldn't download the qr code.")
      }
    },
    [link.key]
  )

  return (
    <Dialog
      open={open}
      trigger={trigger}
      withCloseButton={false}
      onOpenChange={onOpenChange}
      className='overflow-hidden p-0 pt-2 dark:bg-neutral-900 sm:max-w-sm sm:pt-0'
    >
      <div className='space-y-2 p-8 text-center'>
        <Image alt={data.alt} src={data.logo} width={40} height={40} className='mx-auto h-10 w-10 rounded-full' />
        <h3 className='text-lg font-semibold'>Download QR Code</h3>
      </div>
      <Separator />
      <div className='space-y-8 bg-neutral-50 p-8 text-left dark:bg-darker'>
        <div className='mx-auto w-fit rounded-lg border-2 border-neutral-200 bg-white p-4'>
          <div className='m-0 h-32 w-32 p-0' ref={qrCodeRef}>
            <QRCode level={data.level} value={data.value} className='h-32 w-32' />
          </div>
        </div>
        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button
            className='w-full'
            onClick={copyQRCodeToClipboard}
            icon={<PasteClipboard className='h-4 w-4 stroke-2' />}
          >
            Copy
          </Button>
          <DropdownMenu
            side='top'
            align='center'
            items={[
              {
                label: 'As JPEG',
                icon: <JpegFormat />,
                onClick: () => downloadImage({ type: 'jpeg' }),
              },
              {
                label: 'As PNG',
                icon: <PngFormat />,
                onClick: () => downloadImage({ type: 'png' }),
              },
              {
                label: 'As SVG',
                icon: <SvgFormat />,
                onClick: () => downloadImage({ type: 'svg' }),
              },
            ]}
            trigger={
              <Button className='w-full' icon={<Download className='h-4 w-4 stroke-2' />}>
                Export
              </Button>
            }
          />
        </div>
      </div>
    </Dialog>
  )
}
