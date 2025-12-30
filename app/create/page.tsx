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
import { ChevronLeft } from 'lucide-react'; // برای دکمه بازگشت اختیاری
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImagePlus, Link as LinkIcon } from 'lucide-react'; // نصب lucide-react الزامی است
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CreateNews = () => {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Add News</h1>
            <p className="text-muted-foreground text-sm">
              Create and publish a new article to your news feed.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Discard
            </Button>
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button size="sm">Publish News</Button>
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
                <form className="grid gap-6">
                  {/* Title Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="title" className="font-semibold">
                      Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      placeholder="e.g. Breaking: New Technology Trends in 2024"
                      className="focus-visible:ring-primary"
                      required
                    />
                  </div>

                  {/* Excerpt Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="excerpt" className="font-semibold">
                      Excerpt
                    </Label>
                    <Input
                      id="excerpt"
                      type="text"
                      placeholder="Brief summary of the news..."
                      required
                    />
                  </div>

                  {/* Editor Field */}
                  <div className="grid gap-2">
                    <Label htmlFor="content" className="font-semibold">
                      Body Content
                    </Label>
                    <div className=" rounded-md border bg-background">
                      <NewsEditor />
                    </div>
                  </div>
                </form>
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
                <Select defaultValue="draft">
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">
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
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
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
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 cursor-pointer transition-colors">
                      <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        Click to upload or drag and drop
                      </p>
                      <input type="file" className="hidden" id="image-upload" />
                    </div>
                  </TabsContent>

                  <TabsContent value="url">
                    <div className="space-y-2">
                      <Label htmlFor="img-url" className="text-xs">
                        Image Online Link
                      </Label>
                      <div className="relative">
                        <LinkIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="img-url"
                          placeholder="https://..."
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="pt-6">
                <div className="grid gap-2">
                  <Label htmlFor="id" className="text-sm font-medium">
                    Article ID
                  </Label>
                  <Input
                    id="id"
                    type="number"
                    placeholder="e.g. 1024"
                    className="h-8"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* (Settings/Metadata) 
          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Metadata</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="id">Article ID</Label>
                  <Input
                    id="id"
                    type="number"
                    placeholder="Auto-generated if empty"
                  />
                </div>
                 می‌توانید اینجا فیلد دسته‌بندی یا تصویر شاخص را هم اضافه کنید 
              </CardContent>
            </Card>*/}

          {/* <div className="rounded-lg border border-dashed p-4 text-center">
            <p className="text-xs text-muted-foreground">
              Tip: News with excerpts tend to perform better in search results.
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};
