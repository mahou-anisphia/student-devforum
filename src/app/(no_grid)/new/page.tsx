/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ~/components/features/post/PostEditor.tsx
"use client";

import React, {
  useState,
  KeyboardEvent,
  ChangeEvent,
  useCallback,
} from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import type { Components } from "react-markdown";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
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
  Eye,
  Edit,
  type LucideIcon,
  CodeSquare,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { EditorTips } from "./_components/EditorTips";

// Types
interface FormatButton {
  icon: LucideIcon;
  label: string;
  markdown: string;
}

type FocusedSection = "title" | "tags" | "editor" | null;

const formatButtons: FormatButton[] = [
  { icon: Bold, label: "Bold", markdown: "**text**" },
  { icon: Italic, label: "Italic", markdown: "*text*" },
  { icon: Link, label: "Link", markdown: "[text](url)" },
  { icon: List, label: "Bulleted list", markdown: "- item" },
  { icon: ListOrdered, label: "Numbered list", markdown: "1. item" },
  { icon: Heading, label: "Heading", markdown: "## Heading" },
  { icon: Quote, label: "Quote", markdown: "> quote" },
  { icon: Code, label: "Inline code", markdown: "`code`" },
  { icon: CodeSquare, label: "Code block", markdown: "```\ncode\n```" },
  { icon: Zap, label: "Embed", markdown: "{% embed url %}" },
  { icon: Image, label: "Image", markdown: "![alt](url)" },
];

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

const PostEditor = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("## Markdown Preview");
  const [tags, setTags] = useState<string[]>([]);
  const [focusedSection, setFocusedSection] = useState<FocusedSection>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.currentTarget.value && tags.length < 4) {
      setTags([...tags, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const removeTag = (indexToRemove: number): void => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const insertMarkdown = useCallback((markdown: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    let insertedText = markdown;
    if (selected) {
      insertedText = markdown.replace("text", selected);
    }

    setContent(before + insertedText + after);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + insertedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }, []);

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <div className="mb-6">
              <Button
                variant="outline"
                className="text-gray-800 hover:bg-gray-50"
                type="button"
              >
                Add a cover image
              </Button>
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
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="rounded-md p-2 text-gray-600 hover:bg-gray-100"
                          aria-label={button.label}
                          onClick={() => insertMarkdown(button.markdown)}
                        >
                          <button.icon size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        <p>{button.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </TooltipProvider>
              </div>
            </div>

            <Tabs
              defaultValue="write"
              value={activeTab}
              onValueChange={(value) =>
                setActiveTab(value as "write" | "preview")
              }
              className="mt-4"
            >
              <TabsList className="mb-4">
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Write
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" /> Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="mt-0">
                <textarea
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setContent(e.target.value)
                  }
                  onFocus={() => setFocusedSection("editor")}
                  className="h-96 w-full resize-none border-none p-2 text-lg leading-relaxed placeholder-gray-400 outline-none"
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <div className="prose h-96 max-w-none overflow-y-auto rounded-lg border border-gray-200 bg-white p-4">
                  <ReactMarkdown components={markdownComponents}>
                    {content}
                  </ReactMarkdown>
                </div>
              </TabsContent>
            </Tabs>
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
        <EditorTips focusedSection={focusedSection} />
      </div>
    </div>
  );
};

export default PostEditor;
