import type { Tables, TablesInsert, TablesUpdate } from './supabase'

export type TableRow<T extends keyof Tables> = Tables[T]['Row']
export type TableRowInput<T extends keyof Tables> = Tables[T]['Insert']
export type TableRowUpdate<T extends keyof Tables> = Tables[T]['Update']

export type LinkRow = Tables<'links'>
export type LinkRowInput = TablesInsert<'links'>
export type LinkRowUpdate = TablesUpdate<'links'>
export type LinkRowVisits = Tables<'link_visits'>

type Stats = Tables<
  'stats_browser' | 'stats_city' | 'stats_clicks' | 'stats_country' | 'stats_device' | 'stats_os' | 'stats_referrer'
>

export type StatsRow = {
  [T in keyof Stats]: Exclude<Stats[T], null>
} & {
  country?: string
}
