import type { Tables, TablesInsert, TablesUpdate, PublicSchema } from './supabase'

export type Functions<T extends keyof PublicSchema['Functions']> = PublicSchema['Functions'][T]['Returns']

export type LinkRow = Tables<'links'>
export type LinkRowInput = TablesInsert<'links'>
export type LinkRowUpdate = TablesUpdate<'links'>
export type LinkRowVisits = Tables<'link_visits'>

export type StatsRow = Functions<
  'stats_browser' | 'stats_city' | 'stats_clicks' | 'stats_country' | 'stats_device' | 'stats_os' | 'stats_referrer'
>[0] & {
  country?: string
}
