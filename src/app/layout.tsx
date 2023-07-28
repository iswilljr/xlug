import '@/styles/globals.css'
import { inter } from '@/utils/fonts'
import { generateBaseMetadata } from '@/utils/metadata'

export const metadata = generateBaseMetadata()

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
