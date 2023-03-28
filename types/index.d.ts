import type { Database } from "./supabase";

export type Xlug = Database["public"]["Tables"]["xlugs"]["Row"];

export type CreateXlug = Database["public"]["Tables"]["xlugs"]["Insert" | "Update"];
