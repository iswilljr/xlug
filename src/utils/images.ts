import { toBlob, toJpeg, toPng, toSvg } from 'html-to-image'
import type { Arguments } from '@/types/helpers'

export interface DownloadHtmlAsImageOptions {
  type?: 'svg' | 'png' | 'jpeg'
}

type Options = Arguments<typeof toBlob>[1]

const HTML_TO_IMAGE_TYPES = {
  jpeg: toJpeg,
  png: toPng,
  svg: toSvg,
}

const defaultOptions: Options = {
  canvasHeight: 1200,
  canvasWidth: 1200,
  skipFonts: true,
}

export async function copyHtmlAsImageToClipboard(element: HTMLElement) {
  const blob = await toBlob(element, defaultOptions)

  if (!blob) throw Error("Couldn't convert element to Blob")

  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ])
}

export const downloadHtmlAsImage = async (
  element: HTMLElement,
  name: string,
  { type = 'png' }: DownloadHtmlAsImageOptions = {}
) => {
  const filename = `${name}.${type}`
  const toImage = HTML_TO_IMAGE_TYPES[type]
  const dataUrl = await toImage(element, defaultOptions)
  const anchor = document.createElement('a')

  anchor.setAttribute('href', dataUrl)
  anchor.setAttribute('download', filename)
  anchor.click()
}
