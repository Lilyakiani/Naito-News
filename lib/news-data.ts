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
  content: string;
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
    content: `New chip architectures are enabling faster training and more efficient inference across devices.

In recent months, manufacturers have introduced designs that significantly improve memory bandwidth and reduce power consumption.

Analysts believe this shift will accelerate on-device AI, enable smarter applications, and reshape competition in the semiconductor industry.`,
    category: "technology",
    publishedAt: "2025-12-24T08:30:00Z",
    imageUrl: "https://picsum.photos/seed/news1/800/450",
  },

  {
    id: "2",
    title: "Local team secures dramatic win",
    excerpt:
      "A late goal changed everything as the underdogs pulled off an unexpected victory.",
    content: `The match seemed destined for a draw until the final minutes.

With a perfectly timed counterattack, the local team scored a decisive goal that stunned both fans and analysts.

Coaches praised the players' resilience and teamwork, calling the win a turning point for the season.`,
    category: "sports",
    publishedAt: "2025-12-23T17:10:00Z",
    imageUrl: "https://picsum.photos/seed/news2/800/450",
  },

  {
    id: "3",
    title: "Market reacts to new economic outlook",
    excerpt:
      "Investors are adjusting portfolios as analysts update forecasts for the next quarter.",
    content: `Global markets showed mixed reactions following the release of updated economic forecasts.

While some sectors benefited from renewed optimism, others faced pressure due to inflation concerns.

Experts advise investors to remain cautious amid continued uncertainty.`,
    category: "business",
    publishedAt: "2025-12-22T12:00:00Z",
    imageUrl: "https://picsum.photos/seed/news3/800/450",
  },

  {
    id: "4",
    title: "Privacy trends dominate tech conference",
    excerpt:
      "Regulations and tools are reshaping how companies handle user data and consent.",
    content: `This year's tech conference placed a strong focus on privacy-first development.

Speakers highlighted new regulations and the growing importance of transparent data practices.

Several startups unveiled tools designed to help businesses comply with global privacy laws.`,
    category: "technology",
    publishedAt: "2025-12-21T09:15:00Z",
    imageUrl: "https://picsum.photos/seed/news4/800/450",
  },

  {
    id: "5",
    title: "Policy debate intensifies ahead of vote",
    excerpt:
      "Key issues are drawing attention as lawmakers negotiate final terms this week.",
    content: `As the vote approaches, political leaders are intensifying discussions around key policy points.

Public opinion remains divided, with advocacy groups pushing for amendments.

The outcome is expected to have long-term implications for national governance.`,
    category: "politics",
    publishedAt: "2025-12-20T19:45:00Z",
    imageUrl: "https://picsum.photos/seed/news5/800/450",
  },

  {
    id: "6",
    title: "Startup raises funding for clean logistics",
    excerpt:
      "The new round aims to expand electric delivery fleets and optimize routing.",
    content: `The startup announced a successful funding round led by major investors.

The capital will be used to scale electric vehicle fleets and improve logistics software.

Founders say the goal is to reduce emissions while maintaining delivery efficiency.`,
    category: "business",
    publishedAt: "2025-12-19T10:05:00Z",
    imageUrl: "https://picsum.photos/seed/news6/800/450",
  },

  {
    id: "7",
    title: "Championship schedule announced",
    excerpt:
      "Organizers confirmed match dates and venues for the upcoming season.",
    content: `Sports officials released the full championship schedule earlier today.

Fans can expect a packed calendar with matches across multiple cities.

Ticket sales are expected to begin later this month.`,
    category: "sports",
    publishedAt: "2025-12-18T14:20:00Z",
    imageUrl: "https://picsum.photos/seed/news7/800/450",
  },

  {
    id: "8",
    title: "New regulation targets online platforms",
    excerpt:
      "Platforms will need clearer transparency reports and stronger enforcement tools.",
    content: `Lawmakers introduced new regulations aimed at increasing accountability for online platforms.

The rules focus on transparency, user protection, and enforcement mechanisms.

Companies have been given a transition period to comply.`,
    category: "politics",
    publishedAt: "2025-12-17T07:55:00Z",
    imageUrl: "https://picsum.photos/seed/news8/800/450",
  },

  {
    id: "9",
    title: "New sci-fi series breaks streaming records",
    excerpt:
      "The show’s premiere attracted millions, boosting subscriptions overnight.",
    content: `The highly anticipated sci-fi series premiered to record-breaking viewership.

Streaming platforms reported a significant spike in new subscriptions.

Critics praised the show's visuals and storytelling.`,
    category: "entertainment",
    publishedAt: "2025-12-16T16:40:00Z",
    imageUrl: "https://picsum.photos/seed/news9/800/450",
  },

  {
    id: "10",
    title: "Battery breakthrough promises longer range",
    excerpt:
      "Researchers report improved stability and faster charging in early tests.",
    content: `Scientists revealed a new battery technology that could significantly extend range.

Early tests show improved charging speed and long-term stability.

Industry experts believe this could accelerate adoption of electric vehicles.`,
    category: "technology",
    publishedAt: "2025-12-15T11:10:00Z",
    imageUrl: "https://picsum.photos/seed/news10/800/450",
  },

  {
    id: "11",
    title: "Coach reveals training changes for next season",
    excerpt:
      "A revamped schedule is designed to reduce injuries while improving performance.",
    content: `The coaching staff announced changes to the training program for the upcoming season.

The new approach focuses on recovery, flexibility, and data-driven analysis.

Players have welcomed the adjustments.`,
    category: "sports",
    publishedAt: "2025-12-14T09:00:00Z",
    imageUrl: "https://picsum.photos/seed/news11/800/450",
  },

  {
    id: "12",
    title: "Small businesses adapt to shifting consumer habits",
    excerpt:
      "New payment options and delivery partnerships are helping stores stay competitive.",
    content: `Small businesses are rapidly adapting to changes in consumer behavior.

Digital payments, delivery services, and social media marketing are becoming essential.

Experts say flexibility is key to long-term survival.`,
    category: "business",
    publishedAt: "2025-12-13T18:05:00Z",
    imageUrl: "https://picsum.photos/seed/news12/800/450",
  },
];
