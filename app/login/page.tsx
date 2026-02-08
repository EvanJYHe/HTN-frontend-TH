"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Heading } from "@radix-ui/themes";
import { LoginForm } from "@/src/components/auth/LoginForm";
import { Container } from "@/src/components/layout/Container";
import { useAuth } from "@/src/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleSuccess = () => {
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed left-4 top-4 z-20 md:left-8 md:top-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm tracking-[0.02em] text-neutral-300 transition-colors hover:text-white"
        >
          <ArrowUpIcon width={16} height={16} />
          <span>Back to Events</span>
        </Link>
      </div>

      <Container>
        <main className="pb-20 pt-6 md:pb-24 md:pt-8">
          <div className="mx-auto w-full max-w-2xl">
            <div>
              <Heading
                size="8"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em", lineHeight: 0.95 }}
              >
                Login
              </Heading>
              <div className="mt-6 md:mt-7">
                <LoginForm onSuccess={handleSuccess} />
              </div>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}
