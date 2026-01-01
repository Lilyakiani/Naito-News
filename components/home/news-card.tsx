'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link'; //

type NewsItem = {
  id: string;
  title: string;
  excerpt?: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
  image_url?: string;
};
type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  const displayImage = item.imageUrl || item.image_url;
  return (
    <Link href={`/news/${item.id}`} className="block h-full">
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {displayImage ? (
            <img
              src={displayImage}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground text-xs">
              No Image
            </div>
          )}
        </div>

        <CardHeader className="space-y-2 p-4">
          <Badge variant="secondary" className="w-fit capitalize text-[10px]">
            {item.category}
          </Badge>
          <h3 className="text-lg font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {item.title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 pt-0 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {item.excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/40">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {new Date(item.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
