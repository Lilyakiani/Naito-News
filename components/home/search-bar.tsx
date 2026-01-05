'use client';

import { Search } from 'lucide-react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md mx-auto group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-indigo-500 transition-colors">
        <Search size={18} />
      </div>

      <input
        type="text"
        placeholder="Search news..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 
          bg-zinc-100 dark:bg-white/5 
          text-zinc-900 dark:text-white 
          text-sm rounded-lg border border-input 
          placeholder:text-muted-foreground shadow-sm transition-all 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}
