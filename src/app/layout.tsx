import '@/styles/globals.css'
import { inter } from '@/utils/fonts'
import { generateBaseMetadata } from '@/utils/metadata'
import { SessionProvider } from '@/providers/session'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/providers/toaster'
import { cn } from '@/utils/cn'

export const metadata = generateBaseMetadata()

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'bg-white dark:bg-neutral-950')}>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
