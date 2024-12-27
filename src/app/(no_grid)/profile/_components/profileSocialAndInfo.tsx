import { type FC } from "react";
import {
  MapPin,
  Cake,
  Mail,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import type { UserResponse } from "~/server/api/routers/user/schema";

type ProfileSocialAndInfoProps = {
  location: NonNullable<UserResponse["profile"]>["location"];
  joined: Date;
  email: UserResponse["email"];
  social: UserResponse["social"];
};

export const ProfileSocialAndInfo: FC<ProfileSocialAndInfoProps> = ({
  location,
  joined,
  email,
  social,
}) => {
  const formatLocation = (loc: string | null) => {
    if (!loc) return null;
    const parts = loc.split(",").map((part) => part.trim());
    return parts[parts.length - 1];
  };

  const joinedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(joined);

  const formattedLocation = location ? formatLocation(location) : null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      {formattedLocation && (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{formattedLocation}</span>
        </div>
      )}
      <div className="flex items-center gap-1">
        <Cake className="h-4 w-4" />
        <span>Joined on {joinedDate}</span>
      </div>
      {email && (
        <div className="flex items-center gap-1">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>
      )}
      {social?.website && (
        <Link
          href={social.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Website</span>
        </Link>
      )}
      <div className="flex items-center gap-3">
        {social?.github && (
          <Link
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </Link>
        )}
        {social?.twitter && (
          <Link
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="Twitter Profile"
          >
            <Twitter className="h-4 w-4" />
          </Link>
        )}
        {social?.linkedin && (
          <Link
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
