'use client';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="w-full">
      <input
        placeholder="Search news..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
