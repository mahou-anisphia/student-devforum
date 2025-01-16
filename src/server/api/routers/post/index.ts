// ~/server/api/routers/post.ts
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createPostSchema, getInfinitePostsSchema } from "~/schema/post";

export const postRouter = createTRPCRouter({
  getFeed: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.number().nullable().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const posts = await ctx.db.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: [{ published_at: "desc" }, { id: "desc" }],
        where: {
          status: "published",
          published_at: {
            not: null,
          },
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: posts.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          published_at: post.published_at,
          author: {
            name: post.author.name ?? "Anonymous",
            image: post.author.image,
          },
          tags: post.tags.map((t) => t.tag.name),
          commentCount: post._count.comments,
        })),
        nextCursor,
      };
    }),
  getById: publicProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findUnique({
      where: { id: input },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Post not found",
      });
    }

    return {
      ...post,
      tags: post.tags.map((t) => t.tag.name),
    };
  }),
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, content, status, featured_image, tags } = input;

      return ctx.db.post.create({
        data: {
          title,
          content,
          status,
          featured_image,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          published_at: status === "published" ? new Date() : null,
          tags: tags
            ? {
                create: tags.map((tag) => ({
                  tag: {
                    connectOrCreate: {
                      where: { name: tag },
                      create: {
                        name: tag,
                        slug: tag.toLowerCase().replace(/\s+/g, "-"),
                      },
                    },
                  },
                })),
              }
            : undefined,
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
    }),

  infinitePosts: publicProcedure
    .input(getInfinitePostsSchema)
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const items = await ctx.db.post.findMany({
        take: limit + 1,
        where: {
          status: "published",
          published_at: {
            not: null,
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          published_at: "desc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
