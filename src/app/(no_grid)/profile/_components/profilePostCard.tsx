// components/profile/ProfilePostsCard.tsx
import { type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const ProfilePostsCard: FC = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-center justify-center text-muted-foreground">
          Posts content will go here
        </div>
      </CardContent>
    </Card>
  );
};
