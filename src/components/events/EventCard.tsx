"use client";

import { ArrowRightIcon, Cross2Icon, GlobeIcon, LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { Avatar, Badge, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatDateRange } from "../../lib/formatting";
import type { TEvent } from "../../types/event";

type EventCardProps = {
  event: TEvent;
  allEvents: TEvent[];
};

type OpenEventModalDetail = {
  eventId: number;
};

export function EventCard({ event, allEvents }: EventCardProps) {
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLocked = event.permission === "private" && !isAuthenticated;
  const leadSpeaker = event.speakers[0];
  const leadSpeakerInitials =
    leadSpeaker?.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") ?? "?";

  const relatedEvents = useMemo(
    () =>
      event.related_events
        .map((relatedId) => allEvents.find((candidate) => candidate.id === relatedId))
        .filter((candidate): candidate is TEvent => Boolean(candidate)),
    [allEvents, event.related_events],
  );

  const eventUrl = event.permission === "private" ? event.private_url : event.public_url;

  useEffect(() => {
    const handleOpenModal = (incomingEvent: Event) => {
      const customEvent = incomingEvent as CustomEvent<OpenEventModalDetail>;
      if (customEvent.detail?.eventId === event.id) {
        setIsModalOpen(true);
      }
    };

    window.addEventListener("open-event-modal", handleOpenModal);
    return () => window.removeEventListener("open-event-modal", handleOpenModal);
  }, [event.id]);

  const handleRelatedEventClick = (id: number) => {
    setIsModalOpen(false);
    window.dispatchEvent(new CustomEvent<OpenEventModalDetail>("open-event-modal", { detail: { eventId: id } }));
  };

  return (
    <>
      <article
        id={`event-${event.id}`}
        className="group relative isolate flex h-full min-h-[31rem] w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.15)] bg-[linear-gradient(180deg,rgba(0,0,0,0.97),rgba(7,11,19,0.98))] p-3.5 shadow-[0_10px_24px_rgba(0,0,0,0.38)]"
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(keyEvent) => {
          if (keyEvent.key === "Enter" || keyEvent.key === " ") {
            keyEvent.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[16px] border border-[rgba(248,230,178,0.1)] [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]" />

        <Flex justify="between" align="center" gap="3" mb="3">
          <Badge variant="soft" color="gray" radius="full">
            {event.event_type.replace("_", " ")}
          </Badge>
          <span
            aria-label={event.permission === "private" ? "Private event" : "Public event"}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.04)] text-[var(--ink-soft)]"
          >
            {event.permission === "private" ? <LockClosedIcon /> : <LockOpen1Icon />}
          </span>
        </Flex>

        <div className="mb-3 overflow-hidden rounded-[10px] bg-[linear-gradient(140deg,rgba(39,48,68,0.86),rgba(10,13,22,0.92))]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[10px]">
            {leadSpeaker?.profile_pic ? (
              <Avatar
                size="9"
                alt={leadSpeaker.name}
                src={leadSpeaker.profile_pic}
                fallback={leadSpeakerInitials}
                radius="none"
                className="!h-full !w-full grayscale contrast-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-5xl font-bold tracking-[0.04em] text-[rgba(255,255,255,0.78)]">
                {leadSpeakerInitials}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.34)_90%)]" />
          </div>
        </div>

        <Heading
          as="h3"
          size="6"
          mb="1"
          style={{
            lineHeight: "1.08",
            letterSpacing: "0.01em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.name}
        </Heading>
        <Text as="div" size="2" mb="2" style={{ color: "var(--ink-soft)" }}>
          {formatDateRange(event.start_time, event.end_time)}
        </Text>

        <Text
          as="p"
          size="2"
          style={{
            color: "var(--ink-soft)",
            lineHeight: "1.5",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description ?? "No description provided."}
        </Text>

        <div className="mt-auto flex justify-end pt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center text-[var(--ink-soft)] transition hover:text-white"
            aria-label={`Open details for ${event.name}`}
          >
            <ArrowRightIcon />
          </button>
        </div>

        <Text as="span" size="1" className="sr-only">
          {event.permission === "private" ? "Private event card" : "Public event card"}
        </Text>
      </article>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${event.name} details`}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="max-h-[84vh] w-full max-w-[min(92vw,980px)] overflow-y-auto rounded-[18px] border border-[rgba(255,255,255,0.15)] bg-[linear-gradient(180deg,rgba(0,0,0,0.98),rgba(6,10,18,0.99))] px-5 pb-5 pt-3 md:px-7 md:pb-7 md:pt-4 lg:px-8 lg:pb-8 lg:pt-4 shadow-[0_24px_64px_rgba(0,0,0,0.55)]"
            onClick={(eventClick) => eventClick.stopPropagation()}
          >
            <Flex justify="between" align="center" mb="6" gap="3">
              <Flex align="center" gap="2" wrap="wrap">
                <Badge variant="soft" color="gray" radius="full">
                  {event.event_type.replace("_", " ")}
                </Badge>
                <Badge variant="soft" color="gray" radius="full">
                  {event.permission === "private" ? "Private" : "Public"}
                </Badge>
              </Flex>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.04)] text-[var(--ink-soft)] hover:bg-[rgba(255,255,255,0.12)]"
                aria-label="Close details"
              >
                <Cross2Icon />
              </button>
            </Flex>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-7">
              <div className="overflow-hidden rounded-[12px] bg-[linear-gradient(140deg,rgba(39,48,68,0.86),rgba(10,13,22,0.92))]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] sm:aspect-[4/5] lg:max-h-[420px]">
                  {leadSpeaker?.profile_pic ? (
                    <Avatar
                      size="9"
                      alt={leadSpeaker.name}
                      src={leadSpeaker.profile_pic}
                      fallback={leadSpeakerInitials}
                      radius="none"
                      className="!h-full !w-full grayscale contrast-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-bold tracking-[0.04em] text-[rgba(255,255,255,0.78)]">
                      {leadSpeakerInitials}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex h-full flex-col gap-6 md:gap-7">
                <div className="space-y-3">
                  <Heading as="h3" size="7" style={{ lineHeight: "1.06" }}>
                    {event.name}
                  </Heading>
                  <Text as="div" size="2" style={{ color: "var(--ink-soft)" }}>
                    {formatDateRange(event.start_time, event.end_time)}
                  </Text>
                </div>

                <Text as="p" size="3" style={{ color: "var(--ink-soft)", lineHeight: "1.65", maxWidth: "72ch" }}>
                  {event.description ?? "No description provided."}
                </Text>

                <div className="space-y-4 border-t border-[rgba(255,255,255,0.1)] pt-6">
                  {eventUrl ? (
                    isLocked ? (
                      <Text as="div" size="2" style={{ color: "var(--ink-soft)" }}>
                        <GlobeIcon />
                        {" "}
                        Event page locked
                      </Text>
                    ) : (
                      <a
                        href={eventUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-base font-medium text-[var(--ink-strong)] underline underline-offset-4 transition hover:text-white"
                      >
                        Open event page
                        <ArrowRightIcon />
                      </a>
                    )
                  ) : null}

                  {relatedEvents.length > 0 ? (
                    <div className="pt-4">
                      <Text
                        as="div"
                        size="1"
                        className="uppercase tracking-[0.08em]"
                        style={{ color: "var(--ink-soft)", fontFamily: "var(--font-display)" }}
                      >
                        Related events
                      </Text>
                      <Flex gap="2" wrap="wrap" className="pt-2">
                        {relatedEvents.slice(0, 6).map((related) => (
                          <button
                            key={related.id}
                            type="button"
                            className="rounded-md border border-[rgba(255,255,255,0.15)] px-3 py-1.5 text-xs text-[var(--ink-soft)] transition hover:border-[rgba(255,255,255,0.28)] hover:text-white"
                            onClick={() => handleRelatedEventClick(related.id)}
                          >
                            {related.name}
                          </button>
                        ))}
                      </Flex>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
