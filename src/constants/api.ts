export const API_BASE_URL = import.meta.env.VITE_COUNTRIES_API_URL;
export const API_BASE_URL_MOCK = import.meta.env.VITE_COUNTRIES_API_URL_MOCK;

export const API_ENDPOINTS = {
    COUNTRIES_ALL: `${API_BASE_URL}/all`,
    COUNTRIES_ALL_MOCK: `${API_BASE_URL_MOCK}/countries.json`,
  } as const;