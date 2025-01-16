// ~/server/api/routers/post.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { createPostSchema, getInfinitePostsSchema } from "~/schema/post";

export const postRouter = createTRPCRouter({
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
