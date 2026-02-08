"use client";

import { LockClosedIcon } from "@radix-ui/react-icons";
import { Avatar, Badge, Button, Flex, Text } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";
import { formatDateRange } from "../../lib/formatting";
import type { TEvent } from "../../types/event";

type EventCardProps = {
  event: TEvent;
  allEvents: TEvent[];
};

export function EventCard({ event, allEvents }: EventCardProps) {
  const { isAuthenticated } = useAuth();
  const isLocked = event.permission === "private" && !isAuthenticated;

  const relatedEvents = event.related_events
    .map((relatedId) => allEvents.find((candidate) => candidate.id === relatedId))
    .filter((candidate): candidate is TEvent => Boolean(candidate));

  const handleRelatedEventClick = (id: number) => {
    document.getElementById(`event-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <article
      id={`event-${event.id}`}
      className="rounded-[20px] border border-[rgba(104,119,150,0.34)] bg-[linear-gradient(165deg,rgba(0,0,0,0.98),rgba(0,0,0,0.94)),radial-gradient(circle_at_top_left,rgba(40,86,158,0.12),transparent_52%)] p-[1.45rem] shadow-[0_8px_28px_rgba(0,0,0,0.6)]"
    >
      <Flex justify="between" align="center" gap="3" mb="3">
        <Badge variant="soft" color="gray">
          {event.event_type.replace("_", " ")}
        </Badge>
        {event.permission === "private" ? (
          <Badge color="gray" variant="soft">
            {isLocked ? <LockClosedIcon /> : null}
            Private
          </Badge>
        ) : (
          <Badge color="gray" variant="soft">
            Public
          </Badge>
        )}
      </Flex>

      <Flex gap="1" wrap="wrap" mb="3">
        {event.speakers.length > 0 ? (
          event.speakers.slice(0, 4).map((speaker) => (
            <Avatar
              key={speaker.name}
              size="1"
              alt={speaker.name}
              fallback={speaker.name.slice(0, 1).toUpperCase()}
              src={speaker.profile_pic}
              radius="full"
            />
          ))
        ) : (
          <Text size="1" style={{ color: "var(--ink-soft)" }}>
            No speakers listed
          </Text>
        )}
      </Flex>

      <Text as="h3" size="6" weight="bold" mb="1">
        {event.name}
      </Text>
      <Text as="div" size="2" mb="3" style={{ color: "var(--ink-soft)" }}>
        {formatDateRange(event.start_time, event.end_time)}
      </Text>
      <Text as="p" size="3" style={{ color: "var(--ink-soft)", lineHeight: "1.55" }}>
        {event.description ?? "No description provided."}
      </Text>

      {relatedEvents.length > 0 ? (
        <Flex gap="1" wrap="wrap" mt="3">
          {relatedEvents.slice(0, 4).map((related) => (
            <Button key={related.id} size="1" variant="soft" color="gray" onClick={() => handleRelatedEventClick(related.id)}>
              {related.name}
            </Button>
          ))}
        </Flex>
      ) : null}
    </article>
  );
}
