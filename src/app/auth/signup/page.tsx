"use client";

import { useEffect, useState } from "react";
import { type BuiltInProviderType } from "next-auth/providers";
import { type LiteralUnion, getProviders, signIn } from "next-auth/react";
import { FaGoogle, FaDiscord, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";

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

export default function SignUpPage() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="max-w-l w-xl mx-auto my-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Image
              src="/favicon.png"
              alt="Chiyu Lab Logo"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-center text-2xl font-bold">
            Create your account
          </h1>
          <p className="text-center text-muted-foreground">
            Join the Chiyu Lab DEV community - it&apos;s free and easy!
          </p>
        </div>
        <div className="mt-8 grid gap-4">
          {oauthProviders.map((provider) => (
            <Button
              key={provider.id}
              variant="outline"
              className="w-full"
              onClick={() =>
                void signIn(provider.id, {
                  callbackUrl: "/",
                  redirect: true,
                  error: "/auth/signup",
                })
              }
            >
              <div className="relative flex w-full items-center justify-center">
                <div className="absolute left-0">
                  {getProviderIcon(provider.id)}
                </div>
                <div>Sign up with {provider.name}</div>
              </div>
            </Button>
          ))}

          <Link href="/auth/signup/signup-by-email" className="w-full">
            <Button variant="outline" className="w-full">
              <div className="relative flex w-full items-center justify-center">
                <div className="absolute left-0">
                  <MdEmail className="mr-2 h-4 w-4" />
                </div>
                <div>Sign up with Email</div>
              </div>
            </Button>
          </Link>

          <p className="mx-8 text-center text-sm italic text-muted-foreground">
            By signing up, you are agreeing to our{" "}
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
        </div>
        <div className="mt-8 flex flex-col items-center">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-2 text-xs">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
