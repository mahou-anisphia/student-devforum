"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";
import { useForm } from "react-hook-form";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const form = useForm();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setName("");
    },
  });

  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Latest Post</CardTitle>
      </CardHeader>
      <CardContent>
        {latestPost ? (
          <p className="truncate text-muted-foreground">
            Your most recent post: {latestPost.name}
          </p>
        ) : (
          <p className="text-muted-foreground">You have no posts yet.</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({ name });
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" disabled={createPost.isPending}>
            {createPost.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
