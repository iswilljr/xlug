export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      xlugs: {
        Row: {
          created_at: string | null;
          description: string | null;
          destination: string;
          id: number;
          xlug: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          destination: string;
          id?: number;
          xlug: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          destination?: string;
          id?: number;
          xlug?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database["public"]["Enums"]["app_permission"];
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_permission: "channels.delete" | "messages.delete";
      app_role: "admin" | "moderator";
      user_status: "ONLINE" | "OFFLINE";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
