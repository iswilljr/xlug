'use client'

import { getTimeZone } from '@/utils/dates'
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Interval = '1h' | '24h' | '7d' | '30d' | '90d' | 'all'

interface StatsInterval {
  timeZone: string
  interval: Interval
  setInterval: (interval: Interval) => void
}

export const useStatsInterval = create(
  persist<StatsInterval>(
    set => ({
      interval: '30d',
      timeZone: '',
      setInterval(interval) {
        set({ interval })
      },
    }),
    {
      name: 'stats-interval',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export function TimeZoneProvider() {
  useEffect(() => {
    useStatsInterval.setState({ timeZone: getTimeZone() })
  }, [])

  return null
}
