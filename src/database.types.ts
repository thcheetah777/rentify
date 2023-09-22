import type { PostgrestError } from "@supabase/supabase-js"

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          category: string
          created_at: string
          id: number
          photos: string[] | null
          price: number
          stars: number
        }
        Insert: {
          category?: string
          created_at?: string
          id?: number
          photos?: string[] | null
          price: number
          stars?: number
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          photos?: string[] | null
          price?: number
          stars?: number
        }
        Relationships: []
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

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U}> ? Exclude<U, null> : never;
export type DbResultError = PostgrestError;
