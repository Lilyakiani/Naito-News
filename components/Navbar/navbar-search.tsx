'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function NavbarSearch({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = React.useState('');

  // sync input with URL (so if you refresh, it keeps the query)
  React.useEffect(() => {
    setValue(searchParams.get('q') ?? '');
  }, [searchParams]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const q = value.trim();

    if (!q) params.delete('q');
    else params.set('q', q);

    // reset pagination when searching
    params.set('page', '1');

    // ✅ Always search on home (so HomePage query runs)
    const nextUrl = params.toString() ? `/?${params.toString()}` : `/`;
    router.push(nextUrl);
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search news..."
          className="h-9 w-[220px] pl-9"
        />
      </div>
    </form>
  );
}
