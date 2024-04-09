import type { Tables, TablesInsert, TablesUpdate } from './supabase'

export type TableRow<T extends keyof Tables> = Tables[T]['Row']
export type TableRowInput<T extends keyof Tables> = Tables[T]['Insert']
export type TableRowUpdate<T extends keyof Tables> = Tables[T]['Update']

export type LinkRow = Tables<'links'>
export type LinkRowInput = TablesInsert<'links'>
export type LinkRowUpdate = TablesUpdate<'links'>
export type LinkRowVisits = Tables<'link_visits'>
