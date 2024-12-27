// schemas/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  joined: z.date(),
  profileColor: z.string().nullable(),
  profile: z
    .object({
      bio: z.string().nullable(),
      location: z.string().nullable(),
      pronouns: z.boolean().nullable(),
      work: z.string().nullable(),
      education: z.string().nullable(),
    })
    .nullable(),
  social: z
    .object({
      website: z.string().url().nullable(),
      twitter: z.string().url().nullable(),
      github: z.string().url().nullable(),
      linkedin: z.string().url().nullable(),
      facebook: z.string().url().nullable(),
    })
    .nullable(),
});

// Derive TypeScript type from Zod schema
export type ProfileWithDetails = z.infer<typeof profileSchema>;
