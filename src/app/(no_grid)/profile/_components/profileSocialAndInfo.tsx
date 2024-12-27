//ProfileSocialAndInfo.tsx
import { FC } from "react";
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
import { z } from "zod";
import { profileSchema } from "~/schema/profile";

const profileSocialAndInfoSchema = z.object({
  location: z.string().nullable(),
  joined: z.date(),
  email: z.string().email().nullable(),
  social: profileSchema.shape.social,
});

type ProfileSocialAndInfoProps = z.infer<typeof profileSocialAndInfoSchema>;

export const ProfileSocialAndInfo: FC<ProfileSocialAndInfoProps> = ({
  location,
  joined,
  email,
  social,
}) => {
  const formatLocation = (location: string) => {
    const parts = location.split(",").map((part) => part.trim());
    return parts[parts.length - 1];
  };

  const joinedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(joined);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
      {location && (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          <span>{formatLocation(location)}</span>
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
          >
            <Linkedin className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
