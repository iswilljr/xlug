import '@/styles/globals.css'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { DefaultSeo } from 'next-seo'
import { defaultSeo } from '@/config/next-seo'
import { HomeLayout } from '@/layout/home/layout'
import type { AppProps } from 'next/app'

const Toaster = dynamic(async () => (await import('sonner')).Toaster, { ssr: false })
const NavigationProgress = dynamic(async () => (await import('@/components/NavigationProgress')).NavigationProgress, {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  const supabaseClient = useRef(createPagesBrowserClient()).current
  const { layoutProps } = Component as any

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.session}>
      <HomeLayout {...layoutProps}>
        <DefaultSeo {...defaultSeo} />
        <Component {...pageProps} />
        <NavigationProgress />
        <Toaster position='bottom-right' theme='dark' closeButton richColors />
      </HomeLayout>
    </SessionContextProvider>
  )
}
