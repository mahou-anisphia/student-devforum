// components/profile/ProfileCard.tsx
import { FC } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { z } from "zod";
import { profileSchema, type ProfileWithDetails } from "~/schema/profile";
import { ProfileInfoGrid } from "./profileInfoGrid";
import { ProfileSocialAndInfo } from "./profileSocialAndInfo";

const profileCardSchema = z.object({
  user: profileSchema,
  isOwnProfile: z.boolean(),
});

type ProfileCardProps = z.infer<typeof profileCardSchema>;

export const ProfileCard: FC<ProfileCardProps> = ({ user, isOwnProfile }) => {
  // Validate the user data
  const validatedUser = profileSchema.parse(user);
  const profileColor = validatedUser.profileColor ?? "#5877ba";

  return (
    <div className="relative">
      {/* Banner */}
      <div
        className="h-32 w-full rounded-t-lg"
        style={{ backgroundColor: profileColor }}
      />

      <div className="mx-auto max-w-4xl px-4">
        <Card className="relative -mt-6 shadow-lg">
          {/* Edit Profile Button */}
          {isOwnProfile && (
            <div className="absolute right-4 top-4">
              <Button
                asChild
                variant="default"
                size="sm"
                className="bg-blue-500 px-4 py-1.5 text-sm text-white hover:bg-blue-600"
              >
                <Link href="/settings">Edit Profile</Link>
              </Button>
            </div>
          )}

          {/* Avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Avatar
              className="h-32 w-32 border-8"
              style={{ borderColor: profileColor }}
            >
              <AvatarImage
                src={validatedUser.image ?? ""}
                alt={validatedUser.name ?? "Profile"}
              />
              <AvatarFallback className="text-2xl">
                {validatedUser.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardContent className="space-y-6 pt-16">
            {/* Basic Info */}
            <div className="text-center">
              <h1 className="text-2xl font-bold">{validatedUser.name}</h1>
              <p className="text-muted-foreground">@{validatedUser.username}</p>

              <p className="mt-4 text-muted-foreground">
                {validatedUser.profile?.bio ?? "404 bio not found"}
              </p>
            </div>

            {/* Social Links and Info */}
            <ProfileSocialAndInfo
              location={validatedUser.profile?.location ?? null}
              joined={validatedUser.joined}
              email={validatedUser.email}
              social={validatedUser.social}
            />

            {/* Separator */}
            <Separator className="my-6" />

            {/* Info Grid */}
            <ProfileInfoGrid
              education={validatedUser.profile?.education ?? null}
              pronouns={validatedUser.profile?.pronouns ?? null}
              work={validatedUser.profile?.work ?? null}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
