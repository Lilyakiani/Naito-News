export function NewsDetailsSkeleton() {
  return (
    <main className="min-h-screen mt-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="w-full aspect-[4/3] md:aspect-video bg-zinc-200 dark:bg-zinc-800 rounded-2xl animate-pulse" />

        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            <div className="h-12 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
