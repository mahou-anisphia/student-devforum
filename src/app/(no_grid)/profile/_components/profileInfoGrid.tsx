import { FC } from "react";
import { z } from "zod";

const profileInfoGridSchema = z.object({
  education: z.string().nullable(),
  pronouns: z.string().nullable(),
  work: z.string().nullable(),
});

type ProfileInfoGridProps = z.infer<typeof profileInfoGridSchema>;

export const ProfileInfoGrid: FC<ProfileInfoGridProps> = ({
  education,
  pronouns,
  work,
}) => {
  const sections = [
    { title: "Education", content: education },
    { title: "Pronouns", content: pronouns },
    { title: "Work", content: work },
  ].filter((section) => section.content);

  if (sections.length === 0) return null;

  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
    }[sections.length] ?? "grid-cols-3";

  return (
    <div className={`grid ${gridCols} w-full gap-6`}>
      {sections.map(({ title, content }) => (
        <div
          key={title}
          className="flex w-full max-w-xs flex-col items-center justify-self-center text-center"
        >
          <h3 className="mb-2 text-sm text-muted-foreground">{title}</h3>
          <p className="text-foreground">{content}</p>
        </div>
      ))}
    </div>
  );
};
