import { NextResponse } from "next/server";
import { NEWS_DATA } from "@/lib/news-data";

const DEFAULT_PAGE_SIZE = 6;

export async function GET(request: Request) {
  const url = new URL(request.url);

  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  const category = (url.searchParams.get("category") ?? "all").trim().toLowerCase();
  const pageRaw = url.searchParams.get("page") ?? "1";
  const pageSizeRaw = url.searchParams.get("pageSize");

  const page = Math.max(1, Number.parseInt(pageRaw, 10) || 1);
  const pageSize = Math.max(1, Number.parseInt(pageSizeRaw ?? "", 10) || DEFAULT_PAGE_SIZE);


  let filtered = NEWS_DATA;

  if (category !== "all") {
    filtered = filtered.filter((n) => n.category.toLowerCase() === category);
  }

  if (q) {
    filtered = filtered.filter((n) => {
      const haystack = `${n.title} ${n.excerpt}`.toLowerCase();
      return haystack.includes(q);
    });
  }

 
  filtered = [...filtered].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const items = filtered.slice(start, end);

  
  return NextResponse.json({
    items,
    page: safePage,
    pageSize,
    total,
    totalPages,
  });
}
