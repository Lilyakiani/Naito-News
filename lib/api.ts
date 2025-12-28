export type NewsListResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function fetchNews(params: {
  q?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const sp = new URLSearchParams();

  if (params.q) sp.set("q", params.q);
  if (params.category) sp.set("category", params.category);
  if (params.page) sp.set("page", String(params.page));
  if (params.pageSize) sp.set("pageSize", String(params.pageSize));

  const res = await fetch(`/api/news?${sp.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch news");

  return res.json();
}
