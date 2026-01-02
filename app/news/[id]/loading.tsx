import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      {/* back link */}
      <Skeleton className="h-4 w-20 bg-neutral-200/70 dark:bg-muted" />

      {/* hero image */}
      <Skeleton className="h-[280px] w-full rounded-xl bg-neutral-200/70 dark:bg-muted" />

      {/* meta */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24 bg-neutral-200/80 dark:bg-muted" />
        <Skeleton className="h-8 w-3/4 bg-neutral-200/70 dark:bg-muted" />
        <Skeleton className="h-4 w-32 bg-neutral-200/60 dark:bg-muted" />
      </div>

      {/* content paragraphs */}
      <div className="space-y-3 pt-2">
        <Skeleton className="h-4 w-full bg-neutral-200/60 dark:bg-muted" />
        <Skeleton className="h-4 w-11/12 bg-neutral-200/60 dark:bg-muted" />
        <Skeleton className="h-4 w-10/12 bg-neutral-200/60 dark:bg-muted" />
        <Skeleton className="h-4 w-9/12 bg-neutral-200/60 dark:bg-muted" />
        <Skeleton className="h-4 w-10/12 bg-neutral-200/60 dark:bg-muted" />
      </div>

      {/* related section placeholder */}
      <div className="pt-6 border-t space-y-4">
        <Skeleton className="h-5 w-40 bg-neutral-200/70 dark:bg-muted" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 shadow-sm">
              <Skeleton className="h-24 w-full rounded-lg bg-neutral-200/70 dark:bg-muted" />
              <Skeleton className="mt-3 h-4 w-1/2 bg-neutral-200/70 dark:bg-muted" />
              <Skeleton className="mt-2 h-4 w-3/4 bg-neutral-200/60 dark:bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
