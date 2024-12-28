import { z } from "zod";

// Base schemas
export const socialSchema = z
  .object({
    website: z.string().url().nullish(),
    twitter: z.string().url().nullish(),
    github: z.string().url().nullish(),
    linkedin: z.string().url().nullish(),
    facebook: z.string().url().nullish(),
  })
  .nullable();

export const profileSchema = z
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
  .nullable();

// Input schemas
export const registerInputSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
});

export const profileIdSchema = z.object({
  userId: z.string(),
});

export const updateProfileInputSchema = z.object({
  user: z
    .object({
      username: z.string().min(3).max(20).optional(),
      email: z.string().email().optional(),
      name: z.string().min(2).optional(),
      profileColor: z
        .string()
        .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .optional(),
    })
    .partial(),
  profile: profileSchema.unwrap().partial(),
  social: socialSchema.unwrap().partial(),
});

// Response schemas
export const userResponseSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  profileColor: z.string().nullable(),
  image: z.string().nullable(),
  profile: profileSchema,
  social: socialSchema,
  joined: z.date(),
});

export const userActivityCountSchema = z.object({
  userId: z.string(),
});

export const userActivityCountResponseSchema = z.object({
  postsCount: z.number(),
  commentsCount: z.number(),
});

// Type exports
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;
export type RegisterInput = z.infer<typeof registerInputSchema>;
export type ProfileId = z.infer<typeof profileIdSchema>;
export type UserActivityCountResponse = z.infer<
  typeof userActivityCountResponseSchema
>;
