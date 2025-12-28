
export type NewsItem = {
  id: string
  title: string
  description: string
  image: string
  category: string
  publishedAt: string
}

export type NewsResponse = {
  items: NewsItem[]
  total: number
  page: number
  pageSize: number
}
