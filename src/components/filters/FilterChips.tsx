"use client";

import { Badge, Button, Flex, Text } from "@radix-ui/themes";
import type { EventTypeFilter } from "../../hooks/useEventFilters";

type FilterChipsProps = {
  selected: EventTypeFilter;
  onChange: (type: EventTypeFilter) => void;
  counts: {
    all: number;
    workshop: number;
    tech_talk: number;
    activity: number;
  };
};

const FILTERS: Array<{ label: string; value: EventTypeFilter; key: keyof FilterChipsProps["counts"] }> = [
  { label: "All", value: "all", key: "all" },
  { label: "Workshop", value: "workshop", key: "workshop" },
  { label: "Tech Talk", value: "tech_talk", key: "tech_talk" },
  { label: "Activity", value: "activity", key: "activity" },
];

export function FilterChips({ selected, onChange, counts }: FilterChipsProps) {
  return (
    <div>
      <Text
        as="div"
        mb="2"
        size="2"
        className="text-sm uppercase tracking-[0.08em]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Categories
      </Text>
      <Flex wrap="wrap" gap="2">
        {FILTERS.map((filter) => {
          const active = filter.value === selected;

          return (
            <Button
              key={filter.value}
              color="gray"
              variant={active ? "solid" : "soft"}
              onClick={() => onChange(filter.value)}
            >
              {filter.label}
              <Badge color="gray">{counts[filter.key]}</Badge>
            </Button>
          );
        })}
      </Flex>
    </div>
  );
}
