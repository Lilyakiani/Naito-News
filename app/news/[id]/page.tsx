
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  publishedAt: string;
  imageUrl: string;
};

type NewsByIdResponse = NewsItem & {
  related?: NewsItem[];
};

async function getNewsById(id: string): Promise<NewsByIdResponse | null> {
  
  const res = await fetch(`/api/news/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getNewsById(params.id);

  if (!data) notFound();

  const news = data;
  const fullText = news.content?.trim() ? news.content : news.excerpt;

  
  const related = (data.related ?? []).filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <main className="container mx-auto px-4 py-10 space-y-8">
      {/* Back */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 underline underline-offset-4"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Hero Image */}
      <section className="space-y-4">
        <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-muted">
          <Image
            src={news.imageUrl}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Meta + Title */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3 text-sm opacity-70">
            <span className="capitalize">{news.category}</span>
            <span>•</span>
            <span>
              {new Date(news.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            {news.title}
          </h1>
        </div>
      </section>

      {/* Full Content */}
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        {fullText.split("\n").map((p, idx) => {
          const t = p.trim();
          if (!t) return <br key={idx} />;
          return <p key={idx}>{t}</p>;
        })}
      </section>

      {/* Related News */}
      <section className="space-y-4 pt-6 border-t">
        <h2 className="text-lg font-semibold">Related news</h2>

        {related.length === 0 ? (
          <p className="text-sm opacity-70">
            No related news found for this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/news/${item.id}`}
                className="group rounded-xl border bg-background/60 hover:bg-background transition overflow-hidden"
              >
                <div className="relative h-40 w-full bg-muted">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs opacity-70 capitalize">{item.category}</p>
                  <h3 className="font-semibold leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm opacity-80 line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
