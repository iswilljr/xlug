'use client'

import { useRef } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { type Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface SessionProviderProps extends React.PropsWithChildren {
  initialSession?: Session | null
}

export function SessionProvider({ children, initialSession }: SessionProviderProps) {
  const supabaseRef = useRef(createClientComponentClient())

  return (
    <SessionContextProvider supabaseClient={supabaseRef.current} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  )
}
