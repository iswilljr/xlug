import type { Database } from './supabase'

export type Tables = Database['public']['Tables']
export type TableRow<T extends keyof Tables> = Tables[T]['Row']
export type TableRowInput<T extends keyof Tables> = Tables[T]['Insert']
export type TableRowUpdate<T extends keyof Tables> = Tables[T]['Update']

export type LinkRow = TableRow<'links'>
export type LinkRowInput = TableRowInput<'links'>
export type LinkRowUpdate = TableRowUpdate<'links'>
