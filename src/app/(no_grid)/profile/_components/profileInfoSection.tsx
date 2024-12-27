interface ProfileInfoSectionProps {
  title: string;
  content: string | null | undefined;
  icon: React.ReactNode;
}

export function ProfileInfoSection({
  title,
  content,
  icon,
}: ProfileInfoSectionProps) {
  if (!content) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span className="font-medium">{title}:</span>
      <span>{content}</span>
    </div>
  );
}
