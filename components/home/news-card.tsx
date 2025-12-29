'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type NewsItem = {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
};

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-md">
      {/* لینک نامرئی روی کل کارت */}
      <Link
        href={`/news/${item.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Open news: ${item.title}`}
      />

      {/* Image */}
      <div className="h-40 w-full bg-gray-200">
        {item.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <CardHeader className="space-y-2">
        <Badge className="w-fit capitalize">{item.category}</Badge>
        <h3 className="text-base font-semibold line-clamp-2">{item.title}</h3>
      </CardHeader>

      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {item.excerpt}
        </p>

        <span className="block text-xs text-muted-foreground">
          {new Date(item.publishedAt).toLocaleDateString()}
        </span>
      </CardContent>
    </Card>
  );
}
