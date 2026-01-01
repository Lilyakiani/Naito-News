import { createSupabaseServerClient } from '@/lib/supabase/server-client';
import { notFound } from 'next/navigation';
import { fetchNews } from '@/lib/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // فرض بر نصب بودن shadcn avatar
import { Separator } from '@/components/ui/separator'; // فرض بر نصب بودن shadcn separator

export default async function NewsDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: dbPost } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  let post = dbPost;

  if (!post) {
    const apiResponse = await fetchNews({ pageSize: 100 });
    post = apiResponse.items.find((item: any) => item.id.toString() === id);
  }

  if (!post) return notFound();
  return (
    <main className="min-h-screen mt-16 dark:bg-black dark:text-white selection:bg-white/20">
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10">
        <div className="w-full aspect-4/3 md:aspect-video bg-[#E5E5E5] rounded-2xl overflow-hidden flex items-center justify-center shadow">
          {post.image_url || post.imageUrl ? (
            <img
              src={post.image_url || post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          ) : (
            <div className="text-gray-500 font-medium">No Image Provided</div>
          )}
        </div>

        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-[0.2em] font-medium">
              {post.created_at
                ? new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'JAN 22, 2025'}
            </p>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
              {post.title}
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl"></p>
          </div>

          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-white/10">
              <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Admin</span>
              <span className="text-xs text-zinc-500 font-medium">
                Front End Developer
              </span>
            </div>
          </div>

          <Separator className="bg-zinc-800" />

          {post.content && (
            <article
              className="prose prose-invert prose-zinc max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          )}

          <div className="pt-8"></div>
        </div>
      </div>
    </main>
  );
}
