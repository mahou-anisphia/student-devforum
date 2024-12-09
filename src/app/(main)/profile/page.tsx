import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>{session.user.name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl">{session.user.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Profile page coming soon...</p>
        </CardContent>
      </Card>
    </div>
  );
}
