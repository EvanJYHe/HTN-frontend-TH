"use client";

import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import type { TEvent } from "../../types/event";
import { EventCard } from "./EventCard";

type EventListProps = {
  allEvents: TEvent[];
  filteredEvents: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export function EventList({ allEvents, filteredEvents, loading, error, refetch }: EventListProps) {
  if (loading) {
    return <Text size="3">Loading events...</Text>;
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
    <section className="grid grid-cols-1 gap-9 xl:grid-cols-[minmax(0,1fr)_270px]" aria-label="Events list">
      <div>
        <Flex justify="between" align="end" mb="4" gap="3">
          <div className="space-y-2">
            <Text
              as="div"
              size="1"
              className="uppercase tracking-[0.14em] pb-2"
              style={{ color: "var(--ink-soft)", fontFamily: "var(--font-display)" }}
            >
              Live Schedule
            </Text>
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

        <div className="grid grid-cols-1 gap-6 min-[960px]:grid-cols-2">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} allEvents={allEvents} event={event} />
          ))}
        </div>
      </div>

      <aside className="self-start rounded-[16px] bg-black/95 p-5 pt-0 xl:sticky xl:top-4">
        <Text
          as="div"
          size="1"
          className="uppercase tracking-[0.14em] pb-2"
          style={{ color: "var(--ink-soft)", fontFamily: "var(--font-display)" }}
        >
          Next Up
        </Text>
        <Heading
          size="7"
          mt="2"
          mb="4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 0.95 }}
        >
          Upcoming
        </Heading>
        <div>
          <Flex direction="column" gap="3">
            {filteredEvents.slice(0, 8).map((event) => (
              <div key={event.id} className="rounded-xl bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
                <Text as="div" size="3" weight="medium" style={{ lineHeight: "1.3" }}>
                  {event.name}
                </Text>
                <Text as="div" size="2" mt="1" style={{ color: "var(--ink-soft)" }}>
                  {new Date(event.start_time * 1000).toLocaleString()}
                </Text>
              </div>
            ))}
          </Flex>
        </div>
      </aside>
    </section>
  );
}
