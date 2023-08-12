import { useMemo } from 'react'
import { cn } from '@/utils/cn'
import type { ClassNames, ClassNamesInput } from '@/types/classnames'

export function useClasses<Classes extends string>(
  defaultClassNames: ClassNamesInput<Classes>,
  classNames?: ClassNamesInput<Classes>
) {
  const classes: ClassNames<Classes> = useMemo(() => {
    const obj: ClassNames<Classes> = {} as any
    const _classNames = { ...classNames, ...defaultClassNames }

    for (const key in _classNames) {
      const className = cn(defaultClassNames[key], classNames?.[key])

      obj[key] = className
    }

    return obj
  }, [classNames, defaultClassNames])

  return classes
}

export type * from '@/types/classnames'
