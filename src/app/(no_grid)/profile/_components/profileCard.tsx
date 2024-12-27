import { type FC } from "react";
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { type UserResponse } from "~/server/api/routers/user/schema";
import { ProfileInfoGrid } from "./profileInfoGrid";
import { ProfileSocialAndInfo } from "./profileSocialAndInfo";
import { SiComsol } from "react-icons/si";

interface ProfileCardProps {
  user: UserResponse;
  isOwnProfile: boolean;
}

export const ProfileCard: FC<ProfileCardProps> = ({ user, isOwnProfile }) => {
  const profileColor = user.profileColor ?? "#5877ba";
  const defaultBio = "404 bio not found";
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
                src={user.image ?? ""}
                alt={user.name ?? "Profile"}
              />
              <AvatarFallback className="text-2xl">
                {user.name?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          <CardContent className="space-y-6 pt-16">
            {/* Basic Info */}
            <div className="text-center">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>

              <p className="mt-4 text-muted-foreground">
                {user.profile?.bio ?? defaultBio}
              </p>
            </div>

            {/* Social Links and Info */}
            <ProfileSocialAndInfo
              location={user.profile?.location ?? null}
              joined={user.joined}
              email={user.email}
              social={user.social}
            />

            {/* Separator */}
            <Separator className="my-6" />

            {/* Info Grid */}
            <ProfileInfoGrid
              education={user.profile?.education ?? null}
              pronouns={user.profile?.pronouns ?? null}
              work={user.profile?.work ?? null}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
