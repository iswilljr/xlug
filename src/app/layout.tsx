import '@/styles/globals.css'
import { inter } from '@/utils/fonts'
import { CommandMenu } from '@/components/command-menu'
import { ModalProvider } from '@/components/dialogs'
import { generateBaseMetadata } from '@/utils/metadata'
import { SessionProvider } from '@/providers/session'
import { TimeZoneProvider } from '@/store/stats-interval'
import { SWRProvider } from '@/providers/swr'
import { ThemeProvider } from '@/providers/theme'
import { Toaster } from '@/providers/toaster'
import { cn } from '@/utils/cn'

export const metadata = generateBaseMetadata()

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang='en'
      suppressHydrationWarning // next-themes package adds extra attributes to the html element in dark mode
    >
      <body className={cn(inter.className, 'bg-white dark:bg-neutral-950')}>
        <SessionProvider>
          <ThemeProvider>
            <SWRProvider>
              {children}
              <Toaster />
              <CommandMenu />
              <ModalProvider />
              <TimeZoneProvider />
            </SWRProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
