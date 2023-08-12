import { useMediaQuery } from './use-media-query'

export function useIsMobile(maxWidth = '639px') {
  return useMediaQuery(`(max-width: ${maxWidth})`)
}
