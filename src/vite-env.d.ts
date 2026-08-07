/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly COUNTRIES_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }