"use client";

import Link from "next/link";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";
import { LogoutButton } from "../auth/LogoutButton";
import { Skeleton } from "../ui/Skeleton";

type HeaderProps = {
  totalEvents: number;
  publicEvents: number;
  speakerCount: number;
  loading?: boolean;
};

export function Header({ totalEvents, publicEvents, speakerCount, loading = false }: HeaderProps) {
  const { isAuthenticated } = useAuth();

  return (
    <header className="relative left-1/2 mb-6 w-screen -translate-x-1/2 min-h-[220px] overflow-hidden px-8 py-7 max-md:px-5 max-md:py-6 -mt-16 max-md:-mt-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="header-banner-image absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.44)_72%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_72%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.78)_100%)]" />
      </div>
      <Flex className="relative z-10" justify="between" align={{ initial: "start", sm: "center" }} gap="4" direction={{ initial: "column", sm: "row" }}>
        <div className="relative z-10 pt-5">
          <Flex wrap="wrap" gap="3" align="center" className="leading-none">
            {loading ? (
              <>
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </>
            ) : (
              <>
                <Text className="text-sm uppercase tracking-[0.08em] leading-none tabular-nums" style={{ color: "#d4d4d4", fontFamily: "var(--font-display)" }}>
                  {totalEvents} Events
                </Text>
                <Text className="text-sm uppercase tracking-[0.08em] leading-none tabular-nums" style={{ color: "#c5c5c5", fontFamily: "var(--font-display)" }}>
                  {publicEvents} Public
                </Text>
                <Text className="text-sm uppercase tracking-[0.08em] leading-none tabular-nums" style={{ color: "#b5b5b5", fontFamily: "var(--font-display)" }}>
                  {speakerCount} Speakers
                </Text>
              </>
            )}
          </Flex>

          <Heading size="9" className="mt-3" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em", lineHeight: 0.95 }}>
            Hack The North
          </Heading>
          <Text size="5" className="mt-2 block leading-tight" style={{ color: "var(--ink-soft)" }}>
            Explore Events
          </Text>
        </div>

        {loading ? (
          <Skeleton className="h-10 w-24 rounded-md" />
        ) : isAuthenticated ? (
          <LogoutButton />
        ) : (
          <Button asChild size="3" variant="solid">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </Flex>
    </header>
  );
}
