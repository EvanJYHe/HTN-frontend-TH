import { Skeleton } from "@/src/components/ui/Skeleton";

export function EventCardSkeleton() {
  return (
    <article
      aria-hidden="true"
      className="relative isolate flex h-full min-h-[31rem] w-full flex-col overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.15)] bg-[linear-gradient(180deg,rgba(0,0,0,0.97),rgba(7,11,19,0.98))] p-3.5"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>

      <div className="mb-3 overflow-hidden rounded-[10px]">
        <Skeleton className="aspect-[4/5] w-full rounded-[10px]" />
      </div>

      <Skeleton className="h-8 w-4/5 rounded-md" />
      <Skeleton className="mt-2 h-4 w-3/5 rounded-md" />

      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-11/12 rounded-md" />
      </div>

      <div className="mt-auto flex justify-end pt-3">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </article>
  );
}
