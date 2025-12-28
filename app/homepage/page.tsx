'use client';

import { useEffect, useMemo, useState } from 'react';
import { SearchBar } from '@/components/home/search-bar';
import { CategoryFilters } from '@/components/home/category-filters';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '@/lib/api';
import { NewsCard } from '@/components/home/news-card';
import type { NewsResponse } from '@/lib/types';

export const HomePage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [page, setPage] = useState(1);

  const searchParamsString = searchParams.toString();

  const initialQ = useMemo(() => {
    const params = new URLSearchParams(searchParamsString);
    return params.get('q') ?? '';
  }, [searchParamsString]);

  const initialCategory = useMemo(() => {
    const params = new URLSearchParams(searchParamsString);
    return params.get('category') ?? 'all';
  }, [searchParamsString]);

  const [searchValue, setSearchValue] = useState(initialQ);
  const [categoryValue, setCategoryValue] = useState(initialCategory);

  const debouncedSearch = useDebounce(searchValue, 500);
  const { data, isLoading, isError } = useQuery<NewsResponse>({
    queryKey: ['news', debouncedSearch, categoryValue, page],
    queryFn: () =>
      fetchNews({
        q: debouncedSearch.trim() || undefined,
        category: categoryValue,
        page,
        pageSize: 6,
      }),
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParamsString);

    const trimmed = debouncedSearch.trim();
    if (!trimmed) params.delete('q');
    else params.set('q', trimmed);

    if (categoryValue === 'all') params.delete('category');
    else params.set('category', categoryValue);

    const qs = params.toString();
    const nextUrl = qs ? `${pathname}?${qs}` : pathname;

    router.replace(nextUrl);
  }, [debouncedSearch, categoryValue, pathname, router, searchParamsString]);
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <section className="mb-8">
        <SearchBar value={searchValue} onChange={setSearchValue} />
      </section>

      <section className="mb-8">
        <CategoryFilters value={categoryValue} onChange={setCategoryValue} />
      </section>

      <section className="mb-8">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading news</p>}

        {data && data.items?.length === 0 && (
          <p className="text-sm text-muted-foreground">No results found.</p>
        )}

        {data?.items?.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No results found.</p>
        )}
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="text-sm">Page {page}</span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-md border px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
