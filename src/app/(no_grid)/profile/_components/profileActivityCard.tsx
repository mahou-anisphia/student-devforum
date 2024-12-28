// components/profile/ProfileActivityCard.tsx
import { type FC } from "react";
import { MessageSquare, ScrollText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

interface ProfileActivityCardProps {
  userId: string;
}

export const ProfileActivityCard: FC<ProfileActivityCardProps> = async ({
  userId,
}) => {
  // Create tRPC context and caller
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);

  // Fetch activity data using server-side tRPC caller
  try {
    const activityCount = await caller.user.getUserActivityCount({
      userId,
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">
                  {activityCount?.postsCount ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">Posts published</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">
                  {activityCount?.commentsCount ?? 0}
                </p>
                <p className="text-sm text-muted-foreground">
                  Comments written
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  } catch (error) {
    // Handle error appropriately
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Unable to load activity data
          </p>
        </CardContent>
      </Card>
    );
  }
};
