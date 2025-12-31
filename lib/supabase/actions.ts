'use server';

import { createSupabaseServerClient } from './server-client';
import { revalidatePath } from 'next/cache';

export async function createNewsAction(
  formData: FormData,
  content: string,
  id?: number
) {
  const supabase = await createSupabaseServerClient();

  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;
  const imageFile = formData.get('imageFile') as File;
  const imageUrlLink = formData.get('img-url') as string;
  let finalImageUrl = imageUrlLink;

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('news_images')
      .upload(fileName, imageFile);

    if (uploadError)
      return {
        success: false,
        message: 'Upload failed: ' + uploadError.message,
      };

    const { data: publicUrl } = supabase.storage
      .from('news_images')
      .getPublicUrl(fileName);

    finalImageUrl = publicUrl.publicUrl;
  }

  const { error } = await supabase.from('news').insert([
    {
      title,
      excerpt,
      content,
      status,
      category,
      image_url: finalImageUrl,
    },
  ]);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath('/news');
  return { success: true };
}
export async function deleteNewsAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from('news').delete().eq('id', id);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
export async function saveNewsAction(
  formData: FormData,
  content: string,
  id?: number
) {
  const supabase = await createSupabaseServerClient();

  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const category = formData.get('category') as string;
  const status = formData.get('status') as string;

  const imageFile = formData.get('imageFile') as File;
  const imageUrlFromInput = formData.get('imageUrl') as string;

  let finalImageUrl = imageUrlFromInput;

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, '_')}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('news_images')
      .upload(fileName, imageFile);

    if (!uploadError) {
      const { data: publicUrl } = supabase.storage
        .from('news_images')
        .getPublicUrl(fileName);
      finalImageUrl = publicUrl.publicUrl;
    } else {
      console.error('Upload Error:', uploadError.message);
    }
  }

  const newsData = {
    title,
    excerpt,
    content,
    status,
    category,
    image_url: finalImageUrl,
  };

  let result;
  if (id) {
    result = await supabase.from('news').update(newsData).eq('id', id);
  } else {
    result = await supabase.from('news').insert([newsData]);
  }

  if (result.error) return { success: false, message: result.error.message };

  revalidatePath('/');
  revalidatePath('/news');
  revalidatePath('/dashboard');

  return { success: true };
}
