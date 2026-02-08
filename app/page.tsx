"use client";

import { useMemo, useState } from "react";
import { Button, Flex, Heading, Select, Text } from "@radix-ui/themes";
import { EventList } from "@/src/components/events/EventList";
import { FilterChips } from "@/src/components/filters/FilterChips";
import { SearchBar } from "@/src/components/filters/SearchBar";
import { Container } from "@/src/components/layout/Container";
import { Header } from "@/src/components/layout/Header";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useAuth } from "@/src/context/AuthContext";
import { useEvents } from "@/src/hooks/useEvents";
import { formatDateRange } from "@/src/lib/formatting";
import { filterByEventType, filterByPermission, filterBySearch, sortByStartTime } from "@/src/lib/filters";
import type { EventTypeFilter, TEvent } from "@/src/types/event";

type AccessFilter = "all" | "public" | "private";
type SortMode = "start" | "name" | "speakers";
const SORT_MODES: readonly SortMode[] = ["start", "name", "speakers"];

function isSortMode(value: string): value is SortMode {
  return SORT_MODES.includes(value as SortMode);
}

function sortEvents(events: TEvent[], mode: SortMode): TEvent[] {
  if (mode === "start") {
    return sortByStartTime(events);
  }

  if (mode === "name") {
    return [...events].sort((a, b) => a.name.localeCompare(b.name));
  }

  return [...events].sort((a, b) => b.speakers.length - a.speakers.length);
}

function UpcomingSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl bg-[rgba(255,255,255,0.02)] px-3 py-2.5 space-y-2">
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-3.5 w-2/3 rounded-md" />
        </div>
      ))}
    </>
  );
}

function EventsPageContent() {
  const { isAuthenticated } = useAuth();
  const { events, loading, error, refetch } = useEvents();
  const [searchQuery, setSearchQuery] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState<EventTypeFilter>("all");
  const [accessFilter, setAccessFilter] = useState<AccessFilter>("all");
  const [sortMode, setSortMode] = useState<SortMode>("start");

  const permissionScopedEvents = useMemo(
    () => filterByPermission(events, isAuthenticated),
    [events, isAuthenticated],
  );

  const searchScopedEvents = useMemo(
    () => filterBySearch(permissionScopedEvents, searchQuery),
    [permissionScopedEvents, searchQuery],
  );

  const typeScopedEvents = useMemo(
    () => filterByEventType(searchScopedEvents, eventTypeFilter),
    [searchScopedEvents, eventTypeFilter],
  );

  const accessScopedForCategories = useMemo(() => {
    if (accessFilter === "public") {
      return searchScopedEvents.filter((event) => event.permission === "public");
    }

    if (accessFilter === "private" && isAuthenticated) {
      return searchScopedEvents.filter((event) => event.permission === "private");
    }

    return searchScopedEvents;
  }, [searchScopedEvents, accessFilter, isAuthenticated]);

  const eventTypeCounts = useMemo(
    () => ({
      all: accessScopedForCategories.length,
      workshop: accessScopedForCategories.filter((event) => event.event_type === "workshop").length,
      tech_talk: accessScopedForCategories.filter((event) => event.event_type === "tech_talk").length,
      activity: accessScopedForCategories.filter((event) => event.event_type === "activity").length,
    }),
    [accessScopedForCategories],
  );

  const topStats = useMemo(
    () => ({
      totalEvents: permissionScopedEvents.length,
      publicEvents: permissionScopedEvents.filter((event) => event.permission === "public").length,
      speakerCount: permissionScopedEvents.reduce((sum, event) => sum + event.speakers.length, 0),
    }),
    [permissionScopedEvents],
  );

  const accessCounts = useMemo(() => {
    const publicEvents = typeScopedEvents.filter((event) => event.permission === "public").length;
    const privateEvents = typeScopedEvents.filter((event) => event.permission === "private").length;
    return {
      all: typeScopedEvents.length,
      public: publicEvents,
      private: privateEvents,
    };
  }, [typeScopedEvents]);

  const filteredEvents = useMemo(() => {
    let scoped = typeScopedEvents;
    if (accessFilter === "public") {
      scoped = scoped.filter((event) => event.permission === "public");
    }

    if (accessFilter === "private" && isAuthenticated) {
      scoped = scoped.filter((event) => event.permission === "private");
    }

    return sortEvents(scoped, sortMode);
  }, [typeScopedEvents, accessFilter, isAuthenticated, sortMode]);

  return (
    <div className="min-h-screen bg-black">
      <Container>
        <Header
          publicEvents={topStats.publicEvents}
          speakerCount={topStats.speakerCount}
          totalEvents={topStats.totalEvents}
          loading={loading}
        />

        <main className="bg-black pb-8 pt-5">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(320px,28vw,420px)] lg:items-start">
            <section className="w-full space-y-8">
              <div className="space-y-5">
                <SearchBar value={searchQuery} onChange={setSearchQuery} disabled={loading} />

                <div className="space-y-4">
                  <FilterChips
                    counts={eventTypeCounts}
                    selected={eventTypeFilter}
                    onChange={setEventTypeFilter}
                    disabled={loading}
                  />

                  <Flex wrap="wrap" gap="2" align="center" justify="between">
                    <Flex wrap="wrap" gap="2">
                      <Button
                        color="gray"
                        variant={accessFilter === "all" ? "solid" : "soft"}
                        disabled={loading}
                        onClick={() => setAccessFilter("all")}
                      >
                        All Access {accessCounts.all}
                      </Button>
                      <Button
                        color="gray"
                        variant={accessFilter === "public" ? "solid" : "soft"}
                        disabled={loading}
                        onClick={() => setAccessFilter("public")}
                      >
                        Public {accessCounts.public}
                      </Button>
                      {isAuthenticated ? (
                        <Button
                          color="gray"
                          variant={accessFilter === "private" ? "solid" : "soft"}
                          disabled={loading}
                          onClick={() => setAccessFilter("private")}
                        >
                          Private {accessCounts.private}
                        </Button>
                      ) : null}
                    </Flex>
                  </Flex>
                </div>
              </div>

              <EventList
                allEvents={permissionScopedEvents}
                error={error}
                filteredEvents={filteredEvents}
                loading={loading}
                refetch={refetch}
              />
            </section>

            <aside className="space-y-5 lg:sticky lg:top-4">
              <label className="block w-full">
                <Text
                  as="div"
                  mb="1"
                  size="2"
                  className="text-sm uppercase tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Sort
                </Text>
                <Select.Root
                  size="3"
                  value={sortMode}
                  disabled={loading}
                  onValueChange={(value) => {
                    if (isSortMode(value)) {
                      setSortMode(value);
                    }
                  }}
                >
                  <Select.Trigger className="h-11 !w-full justify-between !bg-black/95" style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="start">Start Time</Select.Item>
                    <Select.Item value="name">Name</Select.Item>
                    <Select.Item value="speakers">Speaker Count</Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>

              <section className="self-start rounded-[16px] bg-black/95 p-5 pt-0">
                <Heading
                  size="7"
                  mt="0"
                  mb="4"
                  style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 0.95 }}
                >
                  Upcoming
                </Heading>
                <Flex direction="column" gap="3">
                  {loading ? (
                    <UpcomingSkeleton />
                  ) : null}
                  {error ? (
                    <Text size="2" color="red">
                      Failed to load upcoming events.
                    </Text>
                  ) : null}
                  {!loading && !error
                    ? filteredEvents.slice(0, 8).map((event) => (
                        <div key={event.id} className="rounded-xl bg-[rgba(255,255,255,0.02)] px-3 py-2.5">
                          <Text as="div" size="3" weight="medium" style={{ lineHeight: "1.3" }}>
                            {event.name}
                          </Text>
                          <Text as="div" size="2" mt="1" style={{ color: "var(--ink-soft)" }}>
                            {formatDateRange(event.start_time, event.end_time)}
                          </Text>
                        </div>
                      ))
                    : null}
                </Flex>
              </section>
            </aside>
          </div>
        </main>
      </Container>
    </div>
  );
}

export default function Home() {
  return <EventsPageContent />;
}
