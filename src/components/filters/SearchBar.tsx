"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function SearchBar({ value, onChange, disabled = false }: SearchBarProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    const timer = window.setTimeout(() => onChange(draft), 250);
    return () => window.clearTimeout(timer);
  }, [draft, onChange]);

  return (
    <div className="space-y-2">
      <Flex mb="1" justify="between" align="center" gap="2">
        <Text
          as="label"
          htmlFor="event-search"
          size="2"
          className="text-sm uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Search
        </Text>
      </Flex>
      <TextField.Root
        className="!bg-black/95"
        id="event-search"
        size="3"
        aria-label="Search events"
        placeholder="Search events, speakers, or topics"
        value={draft}
        disabled={disabled}
        onChange={(event) => setDraft(event.target.value)}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
