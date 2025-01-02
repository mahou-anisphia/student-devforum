"use client";
import React, { useState, KeyboardEvent, ChangeEvent, FocusEvent } from "react";
import {
  Image,
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Heading,
  Quote,
  Code,
  Zap,
  LucideIcon,
  CodeSquare,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Card, CardContent } from "~/components/ui/card";

interface FormatButton {
  icon: LucideIcon;
  label: string;
}

type FocusedSection = "title" | "tags" | "editor" | null;

const PostEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [focusedSection, setFocusedSection] = useState<FocusedSection>(null);

  const formatButtons: FormatButton[] = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Link, label: "Link" },
    { icon: List, label: "Bulleted list" },
    { icon: ListOrdered, label: "Numbered list" },
    { icon: Heading, label: "Heading" },
    { icon: Quote, label: "Quote" },
    { icon: Code, label: "Inline code" },
    { icon: CodeSquare, label: "Code block" },
    { icon: Zap, label: "Embed" },
    { icon: Image, label: "Image" },
  ];

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.currentTarget.value && tags.length < 4) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (indexToRemove: number): void => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const TipsContent = () => {
    switch (focusedSection) {
      case "title":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Writing a Great Post Title
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                Think of your post title as a super short (but compelling!)
                description — like an overview of the actual post in one short
                sentence.
              </li>
              <li>
                Use keywords where appropriate to help ensure people can find
                your post by search.
              </li>
            </ul>
          </div>
        );
      case "tags":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tagging Guidelines</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                Tags help people find your post - think of them as the topics or
                categories that best describe your post.
              </li>
              <li>
                Add up to four comma-separated tags per post. Use existing tags
                whenever possible.
              </li>
              <li>
                Some tags have special posting guidelines - double check to make
                sure your post complies with them.
              </li>
            </ul>
          </div>
        );
      case "editor":
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Editor Basics</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Use Markdown to write and format posts.</li>
              <li>
                Embed rich content such as Tweets, YouTube videos, etc. Use the
                complete URL: {`{% embed https://... %}`}. See a list of
                supported embeds.
              </li>
              <li>
                In addition to images for the post&apos;s content, you can also
                drag and drop a cover image.
              </li>
            </ul>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
              <h4 className="mb-4 text-sm font-medium text-gray-900">
                Commonly used syntax
              </h4>
              <div className="space-y-3 font-mono text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600"># Header</div>
                  <div>H1 Header</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">*italics* or _italics_</div>
                  <div className="italic">italics</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">**bold** </div>
                  <div className="font-bold">bold</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">[Link](https://...)</div>
                  <div className="text-blue-600">Link</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">
                    * item 1<br />* item 2
                  </div>
                  <div>
                    • item 1<br />• item 2
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">
                    1. item 1<br />
                    2. item 2
                  </div>
                  <div>
                    1. item 1<br />
                    2. item 2
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">&gt; quoted text</div>
                  <div className="border-l-4 border-gray-300 pl-2">
                    quoted text
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">`inline code`</div>
                  <div className="rounded bg-gray-100 px-1 font-mono">
                    inline code
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="mb-6">
              <button
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-800 transition-colors hover:bg-gray-50"
                type="button"
              >
                Add a cover image
              </button>
            </div>

            <input
              type="text"
              placeholder="New post title here..."
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              onFocus={() => setFocusedSection("title")}
              className="mb-4 w-full border-none p-2 text-4xl font-bold placeholder-gray-600 outline-none"
            />

            <div className="mb-4">
              <input
                type="text"
                placeholder="Add up to 4 tags..."
                onKeyDown={handleAddTag}
                onFocus={() => setFocusedSection("tags")}
                className="w-full border-none p-2 placeholder-gray-400 outline-none"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
                  >
                    #{tag}
                    <button
                      onClick={() => removeTag(index)}
                      type="button"
                      className="text-gray-500 hover:text-gray-700"
                      aria-label={`Remove tag ${tag}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="border-b border-t border-gray-200 py-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  {formatButtons.map((button, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          className="rounded-md p-2 text-gray-600 transition-colors hover:bg-gray-100"
                          aria-label={button.label}
                        >
                          <button.icon size={20} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>

            <textarea
              placeholder="Write your post content here..."
              value={content}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              onFocus={() => setFocusedSection("editor")}
              className="mt-4 h-96 w-full resize-none border-none p-2 text-lg leading-relaxed placeholder-gray-400 outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            variant="default"
            className="bg-blue-600 px-6 text-white hover:bg-blue-700"
          >
            Publish
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Save draft
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:bg-gray-50">
            Revert new changes
          </Button>
        </div>
      </div>

      <div className="col-span-1">
        <Card className="sticky top-4">
          <CardContent className="pt-6">
            <TipsContent />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostEditor;
