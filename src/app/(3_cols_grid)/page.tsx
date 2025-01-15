import {
  HomeLeftSidebar,
  HomeRightSidebar,
} from "~/app/_components/HomeSidebars";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Bookmark } from "lucide-react";

export default function HomePage() {
  const placeholderPosts = [
    {
      id: 1,
      title: "Understanding TypeScript Generics: A Comprehensive Guide",
      author: {
        name: "Sarah Developer",
        username: "sarahdev",
        avatar: "/api/placeholder/32/32",
      },
      tags: ["typescript", "javascript", "webdev"],
      readTime: "5 min read",
      reactions: 42,
      comments: 15,
    },
    {
      id: 2,
      title: "Building Scalable APIs with tRPC and Next.js",
      author: {
        name: "John Coder",
        username: "johncoder",
        avatar: "/api/placeholder/32/32",
      },
      tags: ["nextjs", "trpc", "api"],
      readTime: "8 min read",
      reactions: 38,
      comments: 12,
    },
    {
      id: 3,
      title: "The Ultimate Guide to Tailwind CSS in 2024",
      author: {
        name: "Alice WebDev",
        username: "alicewebdev",
        avatar: "/api/placeholder/32/32",
      },
      tags: ["css", "tailwind", "frontend"],
      readTime: "6 min read",
      reactions: 55,
      comments: 23,
    },
  ];

  return (
    <>
      <div className="col-span-2">
        <HomeLeftSidebar />
      </div>
      <main className="col-span-7 flex min-h-[calc(100vh-4rem)] flex-col space-y-4 px-4">
        {placeholderPosts.map((post) => (
          <Card key={post.id} className="hover:border-gray-300">
            <CardHeader className="space-y-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={"https://placehold.co/600x400"}
                    alt={post.author.name}
                  />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-gray-500">{post.readTime}</p>
                </div>
              </div>
              <h2 className="text-xl font-bold hover:text-blue-600">
                {post.title}
              </h2>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{post.reactions}</span>
                </Button>
                <Button variant="ghost" size="sm" className="space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>
      <div className="col-span-3">
        <HomeRightSidebar />
      </div>
    </>
  );
}
