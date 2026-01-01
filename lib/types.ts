export type NewsCategory =
  | "sports"
  | "business"
  | "technology"
  | "politics"
  | "entertainment";

export type NewsItem = {
  id: string;
  title: string;
  excerpt?: string;
  description?: string;
  content?: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
};


export type NewsResponse = {
  items: NewsItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

