import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  registerInputSchema,
  updateProfileInputSchema,
  userResponseSchema,
  profileIdSchema,
  userActivityCountResponseSchema,
  userActivityCountSchema,
  type UserResponse,
  type UserActivityCountResponse,
} from "./schema";

export const userRouter = createTRPCRouter({
  // Public procedures

  getUserActivityCount: publicProcedure
    .input(userActivityCountSchema)
    .output(userActivityCountResponseSchema)
    .query(async ({ ctx, input }): Promise<UserActivityCountResponse> => {
      const [postsCount, commentsCount] = await Promise.all([
        ctx.db.post.count({
          where: { authorId: input.userId },
        }),
        ctx.db.comment.count({
          where: { authorId: input.userId },
        }),
      ]);

      return {
        postsCount,
        commentsCount,
      };
    }),

  register: publicProcedure
    .input(registerInputSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findFirst({
        where: {
          OR: [
            { username: input.username },
            ...(input.email ? [{ email: input.email }] : []),
          ],
        },
      });

      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            existingUser.username === input.username
              ? "Username already taken"
              : "Email already registered",
        });
      }

      const hashedPassword = await hash(input.password, 10);

      return ctx.db.user.create({
        data: {
          username: input.username,
          password: hashedPassword,
          ...(input.email && { email: input.email }),
          ...(input.name && { name: input.name }),
        },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
        },
      });
    }),

  getProfile: publicProcedure
    .input(profileIdSchema)
    .output(userResponseSchema)
    .query(async ({ ctx, input }): Promise<UserResponse> => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          image: true,
          profileColor: true,
          joined: true,
          profile: true,
          social: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      // Ensure the returned data matches the schema
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        profileColor: user.profileColor,
        profile: user.profile,
        social: user.social,
        image: user.image,
        joined: user.joined,
      };
    }),

  // Protected procedures
  getCurrentProfile: protectedProcedure
    .output(userResponseSchema)
    .query(async ({ ctx }): Promise<UserResponse> => {
      const userId = ctx.session.user.id;

      const user = await ctx.db.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          image: true,
          profileColor: true,
          joined: true,
          profile: true,
          social: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        profileColor: user.profileColor,
        profile: user.profile,
        social: user.social,
        image: user.image,
        joined: user.joined,
      };
    }),

  updateProfile: protectedProcedure
    .input(updateProfileInputSchema)
    .output(userResponseSchema)
    .mutation(async ({ ctx, input }): Promise<UserResponse> => {
      const userId = ctx.session.user.id;

      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          ...input.user,
          profile: input.profile
            ? {
                upsert: {
                  create: input.profile,
                  update: input.profile,
                },
              }
            : undefined,
          social: input.social
            ? {
                upsert: {
                  create: input.social,
                  update: input.social,
                },
              }
            : undefined,
        },
        include: {
          profile: true,
          social: true,
        },
      });

      // Ensure the returned data matches the schema
      return {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        profileColor: updatedUser.profileColor,
        profile: updatedUser.profile,
        social: updatedUser.social,
        image: updatedUser.image,
        joined: updatedUser.joined,
      };
    }),
});
