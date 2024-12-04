import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  providers: [
    DiscordProvider,
    GoogleProvider,
    GithubProvider,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            console.log("Missing credentials in auth attempt");
            return null;
          }
          const user = await db.user.findUnique({
            where: { username: credentials.username },
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
              username: true,
              password: true,
            },
          });

          if (!user?.password) {
            console.log("User not found or has no password");
            return null;
          }

          const isPasswordValid = user.password.startsWith("$2y$")
            ? await bcrypt.compare(
                credentials.password,
                user.password.replace("$2y$", "$2b$"),
              )
            : await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            console.log("Invalid password provided");
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token?.sub ?? user?.id,
      },
    }),
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
