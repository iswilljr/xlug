import { differenceInSeconds, format, formatDistanceToNowStrict } from 'date-fns'
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
