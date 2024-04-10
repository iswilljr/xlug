import {
  differenceInSeconds,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMinuteOfInterval,
  format,
  formatDistanceToNowStrict,
  isSameDay,
  isSameYear,
  subDays,
  subHours,
} from 'date-fns'
import { secondsInMinute, secondsInMonth } from 'date-fns/constants'
import type { IntervalEnumSchema } from './schemas'
import type { z } from 'zod'

export function formatDateToNow(date: number | string | Date) {
  try {
    const now = new Date()
    const parsed = new Date(date)
    const differenceOfSeconds = differenceInSeconds(now, parsed)

    if (differenceOfSeconds >= secondsInMonth) {
      const pattern = parsed.getFullYear() !== now.getFullYear() ? 'PP' : 'LLL d'
      return format(parsed, pattern)
    }

    if (differenceOfSeconds <= secondsInMinute) return 'now'

    return formatDistanceToNowStrict(parsed, { addSuffix: true })
  } catch (error) {
    return 'now'
  }
}

export function formatDay(date: number | string | Date, interval: Interval = '30d') {
  try {
    const now = new Date()
    const parsed = new Date(date)

    if (interval === '1h' || interval === '24h') {
      return format(parsed, isSameDay(now, parsed) ? 'p' : 'LLL d p')
    }

    return format(parsed, isSameYear(now, parsed) ? 'LLL d' : 'PP')
  } catch (error) {
    return 'Today'
  }
}

type Interval = z.infer<typeof IntervalEnumSchema>

interface Options {
  interval: Interval
  start: string
}

const values = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
}

export function getRangeOfDays({ interval, start }: Options) {
  const now = new Date()

  if (interval === '1h') {
    return eachMinuteOfInterval({ start: subHours(now, 1), end: now })
  }

  if (interval === '24h') {
    return eachHourOfInterval({ start: subDays(now, 1), end: now })
  }

  if (interval === 'all') {
    return eachDayOfInterval({ start: new Date(start), end: now })
  }

  return eachDayOfInterval({ start: subDays(now, values[interval]), end: now })
}

export function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}
