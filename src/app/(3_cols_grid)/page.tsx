// ~/app/page.tsx
"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
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
import { api } from "~/trpc/react";
import { Heart, MessageCircle, Bookmark, Loader2 } from "lucide-react";

export default function HomePage() {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    api.post.getFeed.useInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage().catch((error) => {
        console.error("Error fetching next page:", error);
      });
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <>
        <div className="col-span-2">
          <HomeLeftSidebar />
        </div>
        <main className="col-span-7 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </main>
        <div className="col-span-3">
          <HomeRightSidebar />
        </div>
      </>
    );
  }

  const formatDate = (date: Date) => {
    const minutes = Math.round(
      (Date.now() - new Date(date).getTime()) / 1000 / 60,
    );
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <div className="col-span-2">
        <HomeLeftSidebar />
      </div>
      <main className="col-span-7 flex min-h-[calc(100vh-4rem)] flex-col space-y-4 px-4">
        {data?.pages.map((page) =>
          page.items.map((post) => (
            <Card key={post.id} className="hover:border-gray-300">
              <Link href={`/posts/${post.id}`}>
                <CardHeader className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={post.author.image ?? ""}
                        alt={post.author.name}
                      />
                      <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(post.published_at!)} ·{" "}
                        {estimateReadTime(post.content)}
                      </p>
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
              </Link>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>0</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.commentCount}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )),
        )}
        <div ref={ref} className="py-4">
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          )}
        </div>
      </main>
      <div className="col-span-3">
        <HomeRightSidebar />
      </div>
    </>
  );
}
