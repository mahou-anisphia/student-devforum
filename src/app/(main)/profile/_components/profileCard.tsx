// ProfileCard.tsx
import { Card, CardContent } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Sparkles,
  Wrench,
  Settings,
} from "lucide-react";
import Link from "next/link";
import type { User } from "@prisma/client";
import { ProfileInfoSection } from "./profileInfoSection";
import { ProfileSocial } from "./profileSocial";

type ProfileWithDetails = {
  id: string;
  username: string | null;
  email: string | null;
  name: string | null;
  emailVerified: Date | null;
  image: string | null;
  joined: Date;
  profileColor: string | null;
  profile?: {
    bio: string | null;
    location: string | null;
    currentLearning: string | null;
    availableFor: string | null;
    skills: string | null;
    currentProject: string | null;
    work: string | null;
    education: string | null;
  } | null;
  social: {
    website: string | null;
    twitter: string | null;
    github: string | null;
    linkedin: string | null;
    facebook: string | null;
  } | null;
};

interface ProfileCardProps {
  user: ProfileWithDetails;
  isOwnProfile: boolean;
}

export function ProfileCard({ user, isOwnProfile }: ProfileCardProps) {
  const profileColor = user.profileColor ?? "#5877ba";

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
              className="h-32 w-32 border-4"
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

              {user.profile?.bio && (
                <p className="mt-4 text-muted-foreground">{user.profile.bio}</p>
              )}

              {/* Social Links */}
              <ProfileSocial social={user.social} />
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-3">
              <ProfileInfoSection
                title="Location"
                content={user.profile?.location}
                icon={<MapPin className="h-4 w-4" />}
              />
              <ProfileInfoSection
                title="Work"
                content={user.profile?.work}
                icon={<Briefcase className="h-4 w-4" />}
              />
              <ProfileInfoSection
                title="Education"
                content={user.profile?.education}
                icon={<GraduationCap className="h-4 w-4" />}
              />
              <ProfileInfoSection
                title="Skills"
                content={user.profile?.skills}
                icon={<Settings className="h-4 w-4" />}
              />
              <ProfileInfoSection
                title="Currently Learning"
                content={user.profile?.currentLearning}
                icon={<Sparkles className="h-4 w-4" />}
              />
              <ProfileInfoSection
                title="Current Project"
                content={user.profile?.currentProject}
                icon={<Wrench className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
