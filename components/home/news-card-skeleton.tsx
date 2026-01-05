import { Skeleton } from '@/components/ui/skeleton';

export function NewsCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[200px] w-full rounded-xl bg-zinc-800" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-zinc-800" />
        <Skeleton className="h-4 w-[80%] bg-zinc-800" />
      </div>
    </div>
  );
}
