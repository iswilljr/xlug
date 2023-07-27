export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      xlugs: {
        Row: {
          created_at: string
          description: string | null
          destination: string
          id: string
          user_id: string | null
          xlug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          destination: string
          id?: string
          user_id?: string | null
          xlug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          destination?: string
          id?: string
          user_id?: string | null
          xlug?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
