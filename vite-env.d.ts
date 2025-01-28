/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_SUPABASE_URL: string;
  readonly VITE_APP_API_KEY: string;
  // add more environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
