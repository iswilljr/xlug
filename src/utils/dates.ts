import {
  addDays,
  differenceInSeconds,
  eachDayOfInterval,
  format,
  formatDistanceToNowStrict,
  isSameYear,
  subDays,
} from 'date-fns'
import { secondsInMinute, secondsInMonth } from 'date-fns/constants'

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

export function formatDay(date: number | string | Date) {
  try {
    const now = new Date()
    const parsed = new Date(date)

    return format(addDays(parsed, 1), isSameYear(now, parsed) ? 'LLL d' : 'PP')
  } catch (error) {
    return 'Today'
  }
}

export function getRangeOfDays(days = 30) {
  const now = new Date()
  return eachDayOfInterval({ start: subDays(now, days), end: now })
}
