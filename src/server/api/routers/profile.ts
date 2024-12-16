import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Schema for social links
const socialSchema = z.object({
  website: z.string().url().nullish(),
  twitter: z.string().url().nullish(),
  github: z.string().url().nullish(),
  linkedin: z.string().url().nullish(),
  facebook: z.string().url().nullish(),
});

// Schema for profile information
const profileSchema = z.object({
  bio: z.string().max(500).nullable(),
  location: z.string().max(100).nullable(),
  currentLearning: z.string().max(200).nullable(),
  availableFor: z.string().max(200).nullable(),
  skills: z.string().max(200).nullable(),
  currentProject: z.string().max(200).nullable(),
  pronouns: z.boolean().nullable(),
  work: z.string().max(200).nullable(),
  education: z.string().max(200).nullable(),
});

// Combined schema for all profile settings
const profileSettingsSchema = z.object({
  user: z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    name: z.string().min(2),
    profileColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  }),
  profile: profileSchema,
  social: socialSchema,
});

// Partial schemas for individual updates
const partialUserSchema = z
  .object({
    username: z.string().min(3).max(20).optional(),
    email: z.string().email().optional(),
    name: z.string().min(2).optional(),
    profileColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
      .optional(),
  })
  .partial();

const partialProfileSchema = z
  .object({
    bio: z.string().max(500).nullable(),
    location: z.string().max(100).nullable(),
    currentLearning: z.string().max(200).nullable(),
    availableFor: z.string().max(200).nullable(),
    skills: z.string().max(200).nullable(),
    currentProject: z.string().max(200).nullable(),
    pronouns: z.boolean().nullable(),
    work: z.string().max(200).nullable(),
    education: z.string().max(200).nullable(),
  })
  .partial();

const partialSocialSchema = z
  .object({
    website: z.string().url().nullish(),
    twitter: z.string().url().nullish(),
    github: z.string().url().nullish(),
    linkedin: z.string().url().nullish(),
    facebook: z.string().url().nullish(),
  })
  .partial();

export const profileRouter = createTRPCRouter({
  // Get all profile settings
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const user = await ctx.db.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        social: true,
      },
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
    }

    return user;
  }),

  // Update profile settings
  updateSettings: protectedProcedure
    .input(profileSettingsSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      // Update user
      const updatedUser = await ctx.db.user.update({
        where: { id: userId },
        data: {
          username: input.user.username,
          email: input.user.email,
          name: input.user.name,
          profileColor: input.user.profileColor,
          // Upsert profile
          profile: {
            upsert: {
              create: input.profile,
              update: input.profile,
            },
          },
          // Upsert social
          social: {
            upsert: {
              create: input.social,
              update: input.social,
            },
          },
        },
        include: {
          profile: true,
          social: true,
        },
      });

      return updatedUser;
    }),

  // Update user information only
  updateUser: protectedProcedure
    .input(partialUserSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.db.user.update({
        where: { id: userId },
        data: input,
      });
    }),

  // Update profile information only
  updateProfile: protectedProcedure
    .input(partialProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.db.profile.upsert({
        where: { userId },
        create: { ...input, userId },
        update: input,
      });
    }),

  // Update social links only
  updateSocial: protectedProcedure
    .input(partialSocialSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await ctx.db.social.upsert({
        where: { userId },
        create: { ...input, userId },
        update: input,
      });
    }),
});
