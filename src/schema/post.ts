// ~/schema/post.ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["draft", "published"]).default("draft"),
  featured_image: z.string().nullable().optional(),
  tags: z.array(z.string()).max(4).optional(),
});

export const getInfinitePostsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.number().nullable().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type GetInfinitePostsInput = z.infer<typeof getInfinitePostsSchema>;
