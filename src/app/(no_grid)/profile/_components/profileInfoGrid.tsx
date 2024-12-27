import { type FC } from "react";
import type { UserResponse } from "~/server/api/routers/user/schema";

type ProfileInfoGridProps = {
  education: NonNullable<UserResponse["profile"]>["education"];
  pronouns: NonNullable<UserResponse["profile"]>["pronouns"];
  work: NonNullable<UserResponse["profile"]>["work"];
};

export const ProfileInfoGrid: FC<ProfileInfoGridProps> = ({
  education,
  pronouns,
  work,
}) => {
  const sections = [
    { title: "Education", content: education },
    { title: "Pronouns", content: pronouns ? "He / Him" : null },
    { title: "Work", content: work },
  ].filter((section) => section.content);

  if (sections.length === 0) return null;

  const gridCols =
    sections.length === 1
      ? "grid-cols-1"
      : sections.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

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
