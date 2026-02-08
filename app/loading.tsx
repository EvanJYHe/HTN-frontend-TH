import { Container } from "@/src/components/layout/Container";
import { EventCardSkeleton } from "@/src/components/events/EventCardSkeleton";
import { Skeleton } from "@/src/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <Container>
        <header className="relative left-1/2 mb-6 w-screen -translate-x-1/2 min-h-[220px] overflow-hidden px-8 py-7 max-md:px-5 max-md:py-6 -mt-16 max-md:-mt-8">
          <div className="space-y-3 pt-5">
            <div className="flex flex-wrap items-center gap-3">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <Skeleton className="h-12 w-72 rounded-md" />
            <Skeleton className="h-7 w-52 rounded-md" />
          </div>
        </header>

        <main className="bg-black pb-8 pt-5">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_clamp(320px,28vw,420px)] lg:items-start">
            <section className="w-full space-y-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-28 rounded-md" />
                    <Skeleton className="h-8 w-28 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-end justify-between gap-3">
                  <Skeleton className="h-10 w-44 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,15.5rem),1fr))]">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <EventCardSkeleton key={index} />
                  ))}
                </div>
              </div>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-4">
              <Skeleton className="h-16 w-full rounded-md" />
              <section className="self-start rounded-[16px] bg-black/95 p-5 pt-0">
                <Skeleton className="mb-4 h-11 w-44 rounded-md" />
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-xl bg-[rgba(255,255,255,0.02)] px-3 py-2.5 space-y-2">
                      <Skeleton className="h-4 w-4/5 rounded-md" />
                      <Skeleton className="h-3.5 w-2/3 rounded-md" />
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </main>
      </Container>
    </div>
  );
}
