'use client';
import { HomePage } from './homepage/page';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white [--pattern-fg:var(--color-neutral-950)]/5 dark:bg-neutral-950 dark:[--pattern-fg:var(--color-white)]/10">
      <Suspense fallback={<p className="text-center p-10">Loading News...</p>}>
        <HomePage />
      </Suspense>
    </div>
  );
}
