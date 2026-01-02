import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Category pills skeleton */}
      <div className="mb-8 flex gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-9 w-20 rounded-full bg-neutral-200/70 dark:bg-muted"
          />
        ))}
      </div>

      {/* News cards skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border bg-card p-4 shadow-sm"
          >
            <Skeleton className="h-40 w-full rounded-lg bg-neutral-200/70 dark:bg-muted" />
            <Skeleton className="mt-4 h-4 w-1/3 bg-neutral-200/80 dark:bg-muted" />
            <Skeleton className="mt-2 h-4 w-3/4 bg-neutral-200/70 dark:bg-muted" />
            <Skeleton className="mt-2 h-4 w-2/3 bg-neutral-200/60 dark:bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
