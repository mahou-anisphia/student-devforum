"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import Link from "next/link";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useToast } from "~/hooks/use-toast";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { toast } = useToast();

  const registerMutation = api.user.register.useMutation({
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      // Sign in the user after successful registration
      await signIn("credentials", {
        username: data.username,
        password: form.getValues("password"),
        callbackUrl: "/",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      name: "",
    },
    mode: "onChange", // Enable validation on change
  });

  const onSubmit = async (data: SignUpSchema) => {
    await registerMutation.mutate(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <Card className="w-full max-w-md">
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
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
            Join the Chiyu Lab developer community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="mahou-anisphia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="anisphia@magicology.com"
                        {...field}
                      />
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
              <Button
                type="submit"
                className="w-full"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            By signing up, you are agreeing to our{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:underline"
            >
              privacy policy
            </Link>
            ,{" "}
            <Link href="/terms-of-use" className="text-primary hover:underline">
              terms of use
            </Link>
            , and{" "}
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
              Already have an account?
            </span>
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
