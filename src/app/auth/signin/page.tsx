"use client";

import { useEffect, useState } from "react";
import { type BuiltInProviderType } from "next-auth/providers";
import { type LiteralUnion, getProviders, signIn } from "next-auth/react";
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
import { Label } from "~/components/ui/label";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

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

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
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
              Continue with {provider.name}
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
            <form onSubmit={handleCredentialsSignIn} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Sign in with username
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            By signing in, you are agreeing to our privacy policy, terms of use
            and code of conduct.
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
