'use client';
import { NewsEditor } from '@/components/NewsEditor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImagePlus, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { saveNewsAction } from '@/lib/supabase/actions';
import { useEffect, useState } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabase/browser-client';

const CreateNews = ({ newsId }: { newsId?: string | number | null }) => {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('draft');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    async function loadNewsData() {
      if (!newsId) {
        setTitle('');
        setExcerpt('');
        setContent('');
        setCategory('');
        setStatus('draft');
        return;
      }

      try {
        setFetching(true);
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', newsId)
          .single<any>();

        if (error) throw error;

        if (data) {
          setTitle(data.title || '');
          setExcerpt(data.excerpt || '');
          setContent(data.content || '');
          setCategory(data.category || '');
          setStatus(data.status || 'draft');
          setImageUrl(data.image_url || '');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setFetching(false);
      }
    }

    loadNewsData();
  }, [newsId, supabase]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    formData.append('category', category);
    formData.append('status', status);

    if (imageFile) {
      formData.append('imageFile', imageFile);
    } else {
      formData.append('imageUrl', imageUrl);
    }

    const numericId = newsId ? Number(newsId) : undefined;
    const result = await saveNewsAction(formData, content, numericId);

    if (result.success) {
      alert(newsId ? 'Updated Successfully!' : 'Published Successfully!');
    } else {
      alert('Error: ' + result.message);
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading news data...</span>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              {newsId ? 'Edit News' : 'Add News'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {newsId
                ? 'Make changes to your article.'
                : 'Create and publish a new article.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
            >
              Discard
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStatus('draft')}
            >
              Save Draft
            </Button>

            <Button type="submit" disabled={loading} size="sm">
              {loading
                ? 'Submitting...'
                : newsId
                ? 'Update News'
                : 'Publish News'}
            </Button>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>News Content</CardTitle>
                <CardDescription>
                  Write the primary details and the body of your news article.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {/* Title Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="font-semibold">
                      Title
                    </Label>
                    <Input
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Excerpt Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt" className="font-semibold">
                      Excerpt
                    </Label>
                    <Input
                      name="excerpt"
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      required
                    />
                  </div>

                  {/* Editor Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="content" className="font-semibold">
                      Body Content
                    </Label>
                    <div className=" rounded-md border bg-background">
                      <NewsEditor value={content} onChange={setContent} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Sidebar Area */}
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={setStatus} defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-slate-400" />
                        <span>Draft</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Published</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="archived">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span>Archived</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Category</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span>Technology</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sports">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-orange-500" />
                        <span>Sports</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="politics">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        <span>Politics</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="business">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        <span>Business</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="entertainment">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500" />
                        <span>Entertainment</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                {imagePreview || imageUrl ? (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border">
                    <img
                      src={imagePreview || imageUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 h-6 w-6"
                      onClick={() => {
                        setImagePreview(null);
                        setImageFile(null);
                        setImageUrl('');
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                ) : null}

                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="upload" className="text-xs">
                      Upload
                    </TabsTrigger>
                    <TabsTrigger value="url" className="text-xs">
                      URL
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    <Label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        Click to upload from your computer
                      </p>
                      <input
                        name="image-upload"
                        type="file"
                        className="hidden"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Label>
                  </TabsContent>

                  <TabsContent value="url">
                    <div className="space-y-2">
                      <Label htmlFor="img-url" className="text-xs">
                        Image Online Link
                      </Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          name="img-url"
                          id="img-url"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setImagePreview(null);
                          }}
                          placeholder="https://..."
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="grid gap-2">
                  <Label htmlFor="id" className="text-sm font-medium">
                    Article ID
                  </Label>
                  <Input
                    name="id"
                    id="id"
                    type="number"
                    placeholder="e.g. 1024"
                    className="h-8"
                  />
                </div>
              </CardContent>
            </Card> */}
          </div>
          {/* <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Tip: News with excerpts tend to perform better in search results.
            </p>
          </div> */}
        </div>
      </div>
    </form>
  );
};
export default CreateNews;
