export type NewsCategory =
  | "sports"
  | "business"
  | "technology"
  | "politics"
  | "entertainment";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: NewsCategory;
  publishedAt: string; 
  imageUrl: string;
};

export const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "AI chips push performance to new levels",
    excerpt:
      "New chip architectures are enabling faster training and more efficient inference across devices.",
    category: "technology",
    publishedAt: "2025-12-24T08:30:00Z",
    imageUrl: "https://picsum.photos/seed/news1/800/450",
  },
  {
    id: "2",
    title: "Local team secures dramatic win",
    excerpt:
      "A late goal changed everything as the underdogs pulled off an unexpected victory.",
    category: "sports",
    publishedAt: "2025-12-23T17:10:00Z",
    imageUrl: "https://picsum.photos/seed/news2/800/450",
  },
  {
    id: "3",
    title: "Market reacts to new economic outlook",
    excerpt:
      "Investors are adjusting portfolios as analysts update forecasts for the next quarter.",
    category: "business",
    publishedAt: "2025-12-22T12:00:00Z",
    imageUrl: "https://picsum.photos/seed/news3/800/450",
  },
  {
    id: "4",
    title: "Privacy trends dominate tech conference",
    excerpt:
      "Regulations and tools are reshaping how companies handle user data and consent.",
    category: "technology",
    publishedAt: "2025-12-21T09:15:00Z",
    imageUrl: "https://picsum.photos/seed/news4/800/450",
  },
  {
    id: "5",
    title: "Policy debate intensifies ahead of vote",
    excerpt:
      "Key issues are drawing attention as lawmakers negotiate final terms this week.",
    category: "politics",
    publishedAt: "2025-12-20T19:45:00Z",
    imageUrl: "https://picsum.photos/seed/news5/800/450",
  },
  {
    id: "6",
    title: "Startup raises funding for clean logistics",
    excerpt:
      "The new round aims to expand electric delivery fleets and optimize routing.",
    category: "business",
    publishedAt: "2025-12-19T10:05:00Z",
    imageUrl: "https://picsum.photos/seed/news6/800/450",
  },
  {
    id: "7",
    title: "Championship schedule announced",
    excerpt:
      "Organizers confirmed match dates and venues for the upcoming season.",
    category: "sports",
    publishedAt: "2025-12-18T14:20:00Z",
    imageUrl: "https://picsum.photos/seed/news7/800/450",
  },
  {
    id: "8",
    title: "New regulation targets online platforms",
    excerpt:
      "Platforms will need clearer transparency reports and stronger enforcement tools.",
    category: "politics",
    publishedAt: "2025-12-17T07:55:00Z",
    imageUrl: "https://picsum.photos/seed/news8/800/450",
  },
  {
    id: "9",
    title: "New sci-fi series breaks streaming records",
    excerpt:
      "The show’s premiere attracted millions, boosting subscriptions overnight.",
    category: "entertainment",
    publishedAt: "2025-12-16T16:40:00Z",
    imageUrl: "https://picsum.photos/seed/news9/800/450",
  },
  {
    id: "10",
    title: "Battery breakthrough promises longer range",
    excerpt:
      "Researchers report improved stability and faster charging in early tests.",
    category: "technology",
    publishedAt: "2025-12-15T11:10:00Z",
    imageUrl: "https://picsum.photos/seed/news10/800/450",
  },
  {
    id: "11",
    title: "Coach reveals training changes for next season",
    excerpt:
      "A revamped schedule is designed to reduce injuries while improving performance.",
    category: "sports",
    publishedAt: "2025-12-14T09:00:00Z",
    imageUrl: "https://picsum.photos/seed/news11/800/450",
  },
  {
    id: "12",
    title: "Small businesses adapt to shifting consumer habits",
    excerpt:
      "New payment options and delivery partnerships are helping stores stay competitive.",
    category: "business",
    publishedAt: "2025-12-13T18:05:00Z",
    imageUrl: "https://picsum.photos/seed/news12/800/450",
  },
];
