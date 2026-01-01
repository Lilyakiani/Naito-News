"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.id}`} className="block">
      <Card className="overflow-hidden transition-shadow hover:shadow-md cursor-pointer">
        <div className="h-40 w-full bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
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
    </Link>
  );
}
