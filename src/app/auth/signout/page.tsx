"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export default function SignOutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign out</CardTitle>
          <CardDescription>Are you sure you want to sign out?</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            className="w-full"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Yes, sign me out
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">No, take me back</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            You can always sign back in later
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
