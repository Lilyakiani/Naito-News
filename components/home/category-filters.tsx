'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/lib/categories";

type CategoryFiltersProps = {
  value: string;
  onChange: (value: string) => void;
};

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <TabsTrigger
            key={cat.value}          
            value={cat.value}
            className="capitalize"
          >
            {cat.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
