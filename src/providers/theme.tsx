'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <NextThemesProvider attribute='class' defaultTheme='light' enableSystem>
      {children}
    </NextThemesProvider>
  )
}
