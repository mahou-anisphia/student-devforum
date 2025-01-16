// ~/app/posts/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Components } from "react-markdown";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Heart, MessageCircle, Bookmark, Loader2 } from "lucide-react";

// Markdown components configuration
const markdownComponents: Components = {
  code({
    inline,
    className,
    children,
    ...props
  }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
    inline?: boolean;
  }) {
    const match = /language-(\w+)/.exec(className ?? "");
    return !inline && match ? (
      <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div">
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default function PostPage() {
  const params = useParams();
  const postId = Number(params.id);

  const { data: post, isLoading } = api.post.getById.useQuery(postId, {
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-lg text-gray-500">Post not found</p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="mx-auto max-w-4xl p-8">
      <header className="mb-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={post.author.image ?? ""}
                alt={post.author.name ?? ""}
              />
              <AvatarFallback>{(post.author.name ?? "A")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">
                Posted on {formatDate(post.published_at!)}
              </p>
            </div>
          </div>
        </div>
        <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
        <div className="mb-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Button
              key={tag}
              variant="ghost"
              size="sm"
              className="rounded-full bg-gray-100 text-sm text-gray-600 hover:bg-gray-200"
            >
              #{tag}
            </Button>
          ))}
        </div>
      </header>

      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="mb-8 w-full rounded-lg"
        />
      )}

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown components={markdownComponents}>
          {post.content}
        </ReactMarkdown>
      </div>

      <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="space-x-1">
            <Heart className="h-5 w-5" />
            <span>0</span>
          </Button>
          <Button variant="ghost" size="sm" className="space-x-1">
            <MessageCircle className="h-5 w-5" />
            <span>{post._count.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
    </article>
  );
}
