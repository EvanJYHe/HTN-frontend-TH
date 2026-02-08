"use client";

import { useState } from "react";
import { Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { useAuth } from "../../context/AuthContext";
import { LoginForm } from "../auth/LoginForm";
import { LogoutButton } from "../auth/LogoutButton";

type HeaderProps = {
  totalEvents: number;
  publicEvents: number;
  speakerCount: number;
};

export function Header({ totalEvents, publicEvents, speakerCount }: HeaderProps) {
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

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
            <Text className="text-sm uppercase tracking-[0.08em] leading-none" style={{ color: "#d4d4d4", fontFamily: "var(--font-display)" }}>
              {totalEvents} Events
            </Text>
            <Text className="text-sm uppercase tracking-[0.08em] leading-none" style={{ color: "#c5c5c5", fontFamily: "var(--font-display)" }}>
              {publicEvents} Public
            </Text>
            <Text className="text-sm uppercase tracking-[0.08em] leading-none" style={{ color: "#b5b5b5", fontFamily: "var(--font-display)" }}>
              {speakerCount} Speakers
            </Text>
          </Flex>

          <Heading size="9" className="mt-3" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.03em", lineHeight: 0.95 }}>
            Hack The North
          </Heading>
          <Text size="5" className="mt-2 block leading-tight" style={{ color: "var(--ink-soft)" }}>
            Explore Events
          </Text>
        </div>

        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <Button size="3" variant="solid" onClick={() => setShowLogin((value) => !value)}>
            Login
          </Button>
        )}
      </Flex>

      {!isAuthenticated && showLogin ? (
        <>
          <Separator my="4" size="4" />
          <LoginForm onClose={() => setShowLogin(false)} />
        </>
      ) : null}
    </header>
  );
}
