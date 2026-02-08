"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchEvents } from "../lib/api";
import type { TEvent } from "../types/event";

type UseEventsResult = {
  events: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function useEvents(): UseEventsResult {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch events.";
      setError(message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return { events, loading, error, refetch };
}
