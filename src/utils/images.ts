import html2canvas from 'html2canvas'

export async function copyHtmlAsImageToClipboard(element: HTMLElement) {
  const canvas = await html2canvas(element, { scale: 10 })
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw Error('')

  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ])
}

export const downloadHtmlAsImage = async (element: HTMLElement, filename: string) => {
  const canvas = await html2canvas(element, { scale: 10 })

  const dataUrl = canvas.toDataURL('image/png')
  const anchor = document.createElement('a')
  anchor.setAttribute('hidden', 'true')
  anchor.setAttribute('class', 'sr-only')
  anchor.setAttribute('href', dataUrl)
  anchor.setAttribute('download', filename)

  anchor.click()
  anchor.remove()
}
