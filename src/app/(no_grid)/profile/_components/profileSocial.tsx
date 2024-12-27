//profileSocial.tsx

import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

interface SocialLinksProps {
  social: {
    website?: string | null;
    twitter?: string | null;
    github?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
  } | null;
}

export function ProfileSocial({ social }: SocialLinksProps) {
  if (!social) return null;

  const socialLinks = [
    { url: social.website, icon: Globe, label: "Website" },
    { url: social.twitter, icon: Twitter, label: "Twitter" },
    { url: social.github, icon: Github, label: "GitHub" },
    { url: social.linkedin, icon: Linkedin, label: "LinkedIn" },
  ].filter((link) => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <div className="mt-4 flex justify-center gap-4">
      {socialLinks.map(({ url, icon: Icon, label }) => (
        <Link
          key={label}
          href={url!}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary"
          title={label}
        >
          <Icon className="h-5 w-5" />
        </Link>
      ))}
    </div>
  );
}
