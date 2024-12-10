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
    <div className="col-span-12 -mx-4 -mt-8">
      <div className="relative">
        {/* Background banner */}
        <div className="h-32 w-full bg-blue-500" />

        {/* Container to center the card */}
        <div className="mx-auto max-w-4xl px-4">
          {/* Card with shadow */}
          <Card className="relative -mt-6 shadow-lg">
            {/* Centered avatar at card top */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Avatar className="h-32 w-32 border-4 border-blue-500">
                <AvatarImage src={session.user.image ?? ""} />
                <AvatarFallback className="text-2xl">
                  {session.user.name?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            <CardContent className="pt-16">
              <div className="text-center">
                <h1 className="text-2xl font-bold">{session.user.name}</h1>
                <p className="text-muted-foreground">
                  @{session.user.name ?? "username"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
