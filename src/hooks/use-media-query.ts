import { useCallback, useEffect, useState } from 'react'

export interface UseMediaQueryOptions {
  initialValue?: boolean
}

export function useMediaQuery(query: string, { initialValue = false }: UseMediaQueryOptions = {}): boolean {
  const [matches, setMatches] = useState(initialValue)

  const handleChange = useCallback(() => {
    const matchMedia = window.matchMedia(query)
    setMatches(matchMedia.matches)
    return matchMedia
  }, [query])

  useEffect(() => {
    const matchMedia = handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
  }, [handleChange])

  return matches
}
