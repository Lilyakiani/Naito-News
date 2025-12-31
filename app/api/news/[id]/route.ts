
import { NextResponse } from "next/server";
import { NEWS_DATA } from "@/lib/news-data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const item = NEWS_DATA.find((n) => n.id === params.id);
  if (!item) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  const related = NEWS_DATA
    .filter((n) => n.category === item.category && n.id !== item.id)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return NextResponse.json({ ...item, related });
}
