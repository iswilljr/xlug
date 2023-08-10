export type PartialFields<T extends Record<string, unknown>, F extends keyof T> = Omit<T, F> & Partial<Pick<T, F>>

export type Arguments<T> = T extends (...args: infer Args) => unknown ? Args : never
