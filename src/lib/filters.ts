import type { TEvent, TEventType } from "../types/event";

export function filterByPermission(
  events: TEvent[],
  isAuthenticated: boolean,
): TEvent[] {
  if (isAuthenticated) {
    return events;
  }

  return events.filter((event) => event.permission === "public");
}

export function filterByEventType(
  events: TEvent[],
  type: TEventType | "all",
): TEvent[] {
  if (type === "all") {
    return events;
  }

  return events.filter((event) => event.event_type === type);
}

export function filterBySearch(events: TEvent[], query: string): TEvent[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return events;
  }

  return events.filter((event) => {
    const name = event.name.toLowerCase();
    const description = event.description?.toLowerCase() ?? "";
    const speakers = event.speakers
      .map((speaker) => speaker.name.toLowerCase())
      .join(" ");

    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      speakers.includes(normalizedQuery)
    );
  });
}

export function sortByStartTime(events: TEvent[]): TEvent[] {
  return [...events].sort((a, b) => a.start_time - b.start_time);
}
