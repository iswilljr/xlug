import '@/styles/globals.css'
import { inter } from '@/utils/fonts'
import { generateBaseMetadata } from '@/utils/metadata'
import { SessionProvider } from '@/providers/session'
import { Toaster } from '@/providers/toaster'

export const metadata = generateBaseMetadata()

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}
