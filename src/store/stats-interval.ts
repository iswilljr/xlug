'use client'

import { getTimeZone } from '@/utils/dates'
import { useEffect } from 'react'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Interval = '1h' | '24h' | '7d' | '30d' | '90d' | 'all'

interface StatsInterval {
  timeZone: string
  interval: Interval
  searchParams: string
  setInterval: (interval: Interval) => void
}

export const useStatsInterval = create(
  persist<StatsInterval>(
    (set, get) => ({
      interval: '30d',
      timeZone: '',
      searchParams: '&interval=30d',
      setInterval(interval) {
        set({ interval, searchParams: `interval=${interval}&timeZone=${get().timeZone}` })
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
    const timeZone = getTimeZone()

    useStatsInterval.setState({
      timeZone,
      searchParams: `interval=${useStatsInterval.getState().interval}&timeZone=${timeZone}`,
    })
  }, [])

  return null
}
