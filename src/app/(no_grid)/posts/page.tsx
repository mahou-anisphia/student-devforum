import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Posts</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Posts page coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
