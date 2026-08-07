export const API_BASE_URL = import.meta.env.COUNTRIES_API_URL;

export const API_ENDPOINTS = {
    COUNTRIES_ALL: `${API_BASE_URL}/all`,
  } as const;