'use server';

import { NEWS_DATA } from './news-data';
import { createSupabaseServerClient } from './supabase/server-client';

export async function fetchNews(params: {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from('news').select('*', { count: 'exact' });

  if (params.category && params.category !== 'all') {
    query = query.eq('category', params.category);
  }
  if (params.q) {
    query = query.ilike('title', `%${params.q}%`);
  }

  const { data: dbNews } = await query;

  const formattedDbNews = (dbNews || []).map((item) => ({
    ...item,
    id: String(item.id),
    image_url: item.image_url,
    publishedAt: item.created_at || new Date().toISOString(),
  }));

  const formattedStaticNews = NEWS_DATA.map((item) => ({
    id: item.id,
    title: item.title,
    excerpt: item.excerpt,
    category: item.category,
    image_url: item.imageUrl,
    publishedAt: item.publishedAt,
    content: `<p>${item.excerpt}</p>`,
  }));

  let allNews = [...formattedDbNews, ...formattedStaticNews];

  if (params.category && params.category !== 'all') {
    allNews = allNews.filter(
      (n) => n.category.toLowerCase() === params.category?.toLowerCase()
    );
  }
  if (params.q) {
    allNews = allNews.filter((n) =>
      n.title.toLowerCase().includes(params.q!.toLowerCase())
    );
  }
  allNews.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const page = params.page || 1;
  const pageSize = params.pageSize || 6;
  const total = allNews.length;
  const totalPages = Math.ceil(total / pageSize);
  const items = allNews.slice((page - 1) * pageSize, page * pageSize);

  return {
    items: allNews.slice((page - 1) * pageSize, page * pageSize),
    total: allNews.length,
    page,
    pageSize,
    totalPages,
  };
}
