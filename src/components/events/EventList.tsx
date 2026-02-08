"use client";

import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import type { TEvent } from "../../types/event";
import { EventCard } from "./EventCard";
import { EventCardSkeleton } from "./EventCardSkeleton";
import { Skeleton } from "../ui/Skeleton";

type EventListProps = {
  allEvents: TEvent[];
  filteredEvents: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function EventList({ allEvents, filteredEvents, loading, error, refetch }: EventListProps) {
  if (loading) {
    return (
      <section aria-label="Events list" aria-busy="true">
        <Flex justify="between" align="end" mb="5" gap="3">
          <div className="space-y-2">
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </Flex>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,15.5rem),1fr))]">
          {Array.from({ length: 8 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <Flex direction="column" gap="3">
        <Text color="red">Failed to load events: {error}</Text>
        <Button variant="soft" color="gray" onClick={refetch}>
          Retry
        </Button>
      </Flex>
    );
  }

  if (filteredEvents.length === 0) {
    return <Text size="3">No events found.</Text>;
  }

  return (
    <section aria-label="Events list">
      <Flex justify="between" align="end" mb="5" gap="3">
        <div className="space-y-2">
          <Heading
            size="7"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 0.95 }}
          >
            Event Feed
          </Heading>
        </div>
        <Badge size="2" variant="soft" color="gray">
          {filteredEvents.length} results
        </Badge>
      </Flex>

      <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,15.5rem),1fr))]">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} allEvents={allEvents} event={event} />
        ))}
      </div>
    </section>
  );
}
