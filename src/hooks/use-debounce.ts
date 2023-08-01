import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce<T>(defaultValue: T, delay = 300) {
  const [value, setValue] = useState(defaultValue)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const clear = useCallback(() => clearTimeout(timeoutRef.current), [])

  useEffect(() => clear, [clear])

  const debouncedSetValue = useCallback(
    (newValue: T) => {
      clear()

      const timeout = setTimeout(() => setValue(newValue), delay)
      timeoutRef.current = timeout
    },
    [clear, delay]
  )

  return [value, debouncedSetValue] as const
}
