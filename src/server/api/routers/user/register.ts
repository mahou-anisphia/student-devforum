import { z } from "zod";
import { hash } from "bcrypt";
import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";

const registerSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
});

export const register = publicProcedure
  .input(registerSchema)
  .mutation(async ({ ctx, input }) => {
    // Check if username already exists
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

    // Hash password
    const hashedPassword = await hash(input.password, 10);

    // Create user
    const user = await ctx.db.user.create({
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

    return user;
  });
