import { NewsEditor } from '@/components/NewsEditor';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const CreateNews = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center py-4 px-4">
        <header className="flex items-center justify-end space-x-60 py-4  ">
          <h1 className="text-4xl">Add News</h1>
          <div className="flex gap-2 ">
            <Button variant="secondary">Discard</Button>
            <Button variant="outline">Save Draft</Button>
            <Button>Publish</Button>
          </div>
        </header>
        <div>
          <div>
            <Card>
              <CardHeader>News Details</CardHeader>
              <CardContent>
                <form>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Enter The News Title"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <div className="grid gap-2">
                          <Label htmlFor="excerpt">Excerpt</Label>
                          <Input
                            id="excerpt"
                            type="text"
                            placeholder="Enter The News Excerpt"
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="id">Id</Label>
                          <Input
                            id="id"
                            type="number"
                            placeholder="Enter The News ID"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="content">Content</Label>
                      <NewsEditor />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
