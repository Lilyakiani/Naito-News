'use client';

import { useEffect, useMemo, useState } from 'react';
import { CategoryFilters } from '@/components/home/category-filters';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/lib/api';
import { NewsCard } from '@/components/home/news-card';
import type { NewsResponse } from '@/lib/types';

const PAGE_SIZE = 6;

export const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  
  const searchParamsString = searchParams.toString();

  const q = useMemo(() => {
    const params = new URLSearchParams(searchParamsString);
    return (params.get('q') ?? '').trim();
  }, [searchParamsString]);

  const categoryFromUrl = useMemo(() => {
    const params = new URLSearchParams(searchParamsString);
    return (params.get('category') ?? 'all').trim();
  }, [searchParamsString]);

  const [page, setPage] = useState<number>(1);
  const [categoryValue, setCategoryValue] = useState<string>(categoryFromUrl);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setCategoryValue(categoryFromUrl || 'all');
    setPage(1);
  }, [categoryFromUrl]);


  useEffect(() => {
    setPage(1);
  }, [q]);

  
  useEffect(() => {
    
    if ((categoryFromUrl || 'all') === categoryValue) return;

    const params = new URLSearchParams(searchParamsString);

    if (categoryValue === 'all') params.delete('category');
    else params.set('category', categoryValue);

    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, [categoryValue, categoryFromUrl, pathname, router, searchParamsString]);

  const { data, isLoading, isError } = useQuery<NewsResponse, Error>({
    queryKey: ['news', q, categoryValue, page],
    queryFn: () =>
      fetchNews({
        q: q || undefined,
        category: categoryValue,
        page,
        pageSize: PAGE_SIZE,
      }),
    
    placeholderData: (prev) => prev,
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-8">
        <CategoryFilters
          value={categoryValue}
          onChange={(val) => {
            setCategoryValue(val);
            setPage(1);
          }}
        />
      </section>

      <section className="mb-8">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading news</p>}

        {!isLoading && !isError && items.length === 0 && (
          <p className="text-sm text-muted-foreground">No results found.</p>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={page <= 1}
          >
            Prev
          </button>

          <span className="text-sm">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
