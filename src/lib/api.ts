import { API_BASE_URL, API_ENDPOINTS } from "../constants/api";
import type { TEvent } from "../types/event";

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed (${response.status} ${response.statusText})`);
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new Error("Failed to parse API response as JSON.");
  }
}

/**
 * Fetches all events from the HTN API.
 */
export async function fetchEvents(): Promise<TEvent[]> {
  return requestJson<TEvent[]>(API_ENDPOINTS.events);
}

/**
 * Fetches one event by id from the HTN API.
 */
export async function fetchEventById(id: number): Promise<TEvent> {
  return requestJson<TEvent>(API_ENDPOINTS.eventById(id));
}
