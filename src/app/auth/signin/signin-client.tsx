"use client";

import { useEffect, useState } from "react";
import { type BuiltInProviderType } from "next-auth/providers";
import { type LiteralUnion, getProviders, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaGoogle, FaDiscord, FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type SignInSchema = z.infer<typeof signInSchema>;

const getProviderIcon = (providerId: string) => {
  switch (providerId) {
    case "google":
      return <FaGoogle className="mr-2 h-4 w-4" />;
    case "discord":
      return <FaDiscord className="mr-2 h-4 w-4" />;
    case "github":
      return <FaGithub className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

export default function SignInClient() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType>,
    {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    }
  > | null>(null);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const fetchProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    fetchProviders().catch(console.error);
  }, []);

  if (!providers) {
    return null;
  }

  const oauthProviders = Object.values(providers).filter(
    (provider) => provider.type === "oauth" || provider.type === "oidc",
  );
  const credentialsProvider = Object.values(providers).find(
    (provider) => provider.type === "credentials",
  );

  const onSubmit = async (data: SignInSchema) => {
    await signIn("credentials", {
      username: data.username,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="max-w-l w-xl mx-auto">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/favicon.png"
              alt="Chiyu Lab Logo"
              width={64}
              height={64}
            />
          </div>
          <CardTitle className="text-center text-2xl font-bold">
            Join the Chiyu Lab DEV community
          </CardTitle>
          <CardDescription className="text-center">
            Chiyu Lab is a community founded by 4 amazing student developers
          </CardDescription>
          {error && (
            <p className="text-sm text-red-500">
              {error === "CredentialsSignin"
                ? "Invalid username or password"
                : "Something went wrong"}
            </p>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          {oauthProviders.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="w-full"
              onClick={() => void signIn(provider.id, { callbackUrl: "/" })}
            >
              <div className="relative flex w-full items-center justify-center">
                <div className="absolute left-0">
                  {getProviderIcon(provider.id)}
                </div>
                <div>Continue with {provider.name}</div>
              </div>
            </Button>
          ))}

          {oauthProviders.length > 0 && credentialsProvider && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
          )}

          {credentialsProvider && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Sign in with username
                </Button>
              </form>
            </Form>
          )}
          <p className="mx-8 text-center text-sm italic text-muted-foreground">
            By signing in, you are agreeing to our{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              privacy policy
            </Link>
            ,{" "}
            <Link href="/terms-of-use" className="text-primary hover:underline">
              terms of use,{" "}
            </Link>
            and{" "}
            <Link
              href="/code-of-conduct"
              className="text-primary hover:underline"
            >
              code of conduct
            </Link>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2 text-xs">
            <span className="text-muted-foreground">
              New to Chiyu Developer Community?
            </span>
            <Link
              href="/auth/signup"
              className="font-medium text-primary hover:underline"
            >
              Create account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
