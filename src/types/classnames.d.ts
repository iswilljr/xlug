import type { ClassValue } from 'clsx'

type _ClassNames<Classes extends string, Value> = Partial<Record<Classes, Value>>
export type ClassNames<Classes extends string> = _ClassNames<Classes, string>
export type ClassNamesInput<Classes extends string> = _ClassNames<Classes, ClassValue>

export interface ClassNamesProps<Classes extends string> {
  classNames?: ClassNamesInput<Classes>
}
