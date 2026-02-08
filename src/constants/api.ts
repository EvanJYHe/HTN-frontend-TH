export const API_BASE_URL = "https://api.hackthenorth.com/v3";

export const API_ENDPOINTS = {
  events: "/events",
  eventById: (id: number) => `/events/${id}`,
} as const;
