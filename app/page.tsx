'use client';
import NewsLetter from '@/components/NewsLetter';
import { Suspense } from 'react';
import { Header } from '@/components/Header';
import HomePage from './homepage/page';

export default function Home() {
  return (
    <div className="min-h-screen bg-white [--pattern-fg:var(--color-neutral-950)]/5 dark:bg-neutral-950 dark:[--pattern-fg:var(--color-white)]/10">
      <Suspense fallback={<p className="text-center p-10">Loading News...</p>}>
        <Header />
        <HomePage />
        <NewsLetter />
      </Suspense>
    </div>
  );
}
