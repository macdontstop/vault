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
      files: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          size: number
          type: string
          key: string
          share_id: string
          download_count: number
          expires_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          size: number
          type: string
          key: string
          share_id?: string
          download_count?: number
          expires_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          size?: number
          type?: string
          key?: string
          share_id?: string
          download_count?: number
          expires_at?: string | null
        }
      }
    }
  }
}
