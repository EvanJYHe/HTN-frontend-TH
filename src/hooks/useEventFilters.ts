"use client";

import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  filterByEventType,
  filterByPermission,
  filterBySearch,
  sortByStartTime,
} from "../lib/filters";
import type { EventTypeFilter, TEvent } from "../types/event";

type UseEventFiltersOptions = {
  searchQuery?: string;
  eventTypeFilter?: EventTypeFilter;
  showPrivate?: boolean;
};

type UseEventFiltersResult = {
  filteredEvents: TEvent[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  eventTypeFilter: EventTypeFilter;
  setEventTypeFilter: (type: EventTypeFilter) => void;
  showPrivate: boolean;
  setShowPrivate: (value: boolean) => void;
};

export function useEventFilters(
  events: TEvent[],
  options?: UseEventFiltersOptions,
): UseEventFiltersResult {
  const { isAuthenticated } = useAuth();
  const [internalSearchQuery, setSearchQuery] = useState(
    options?.searchQuery ?? "",
  );
  const [eventTypeFilter, setEventTypeFilter] = useState<EventTypeFilter>(
    options?.eventTypeFilter ?? "all",
  );
  const [internalShowPrivate, setShowPrivate] = useState<boolean>(
    options?.showPrivate ?? true,
  );

  const activeSearchQuery = options?.searchQuery ?? internalSearchQuery;
  const activeEventTypeFilter = options?.eventTypeFilter ?? eventTypeFilter;
  const activeShowPrivate = options?.showPrivate ?? internalShowPrivate;

  const filteredEvents = useMemo(() => {
    let result = filterByPermission(events, isAuthenticated);

    if (isAuthenticated && !activeShowPrivate) {
      result = result.filter((event) => event.permission === "public");
    }

    result = filterBySearch(result, activeSearchQuery);
    result = filterByEventType(result, activeEventTypeFilter);
    return sortByStartTime(result);
  }, [
    events,
    isAuthenticated,
    activeShowPrivate,
    activeSearchQuery,
    activeEventTypeFilter,
  ]);

  return {
    filteredEvents,
    searchQuery: activeSearchQuery,
    setSearchQuery,
    eventTypeFilter: activeEventTypeFilter,
    setEventTypeFilter,
    showPrivate: activeShowPrivate,
    setShowPrivate,
  };
}
