declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string
      SUPABASE_STORAGE_BUCKET: string
      UPSTASH_REDIS_REST_URL: string
      UPSTASH_REDIS_REST_TOKEN: string
      UPLOADS_PER_HOUR: string
    }
  }
}

export {}
