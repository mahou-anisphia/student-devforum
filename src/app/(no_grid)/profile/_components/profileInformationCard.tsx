import { type FC } from "react";
import { Book, Code, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface ProfileInfoCardProps {
  title: string;
  content: string | null;
  icon: FC<{ className?: string }>;
}

const ProfileInfoCard: FC<ProfileInfoCardProps> = ({
  title,
  content,
  icon: Icon,
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {content ? (
          <p className="text-sm text-muted-foreground">{content}</p>
        ) : (
          <p className="text-sm italic text-muted-foreground">Not specified</p>
        )}
      </CardContent>
    </Card>
  );
};

interface ProfileInfoCardsProps {
  currentLearning: string | null;
  skills: string | null;
  currentProject: string | null;
}

export const ProfileInfoCards: FC<ProfileInfoCardsProps> = ({
  currentLearning,
  skills,
  currentProject,
}) => {
  return (
    <div className="space-y-4">
      <ProfileInfoCard
        title="Currently Learning"
        content={currentLearning}
        icon={Book}
      />
      <ProfileInfoCard
        title="Skills / Languages"
        content={skills}
        icon={Code}
      />
      <ProfileInfoCard
        title="Current Project"
        content={currentProject}
        icon={Rocket}
      />
    </div>
  );
};

export default ProfileInfoCards;
