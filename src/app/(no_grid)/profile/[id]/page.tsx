import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { ProfileCard } from "../_components/profileCard";
import { auth } from "~/server/auth";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);

  try {
    const userData = await caller.user.getProfile({
      userId: resolvedParams.id,
    });
    return {
      title: `${userData.name ?? "Profile"} | Chiyu Lab`,
      description: userData.profile?.bio ?? `View ${userData.name}'s profile`,
    };
  } catch {
    return {
      title: "Profile Not Found | Chiyu Lab",
      description: "This profile could not be found.",
    };
  }
}

export default async function ProfilePage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);
  const session = await auth();

  try {
    const userData = await caller.user.getProfile({
      userId: resolvedParams.id,
    });
    const isOwnProfile = session?.user?.id === userData.id;

    return (
      <div className="col-span-12 -mx-4 -mt-8">
        <ProfileCard
          user={{
            ...userData,
            // Add any missing required fields from UserResponse type
            joined: new Date(), // You might want to get this from the actual user data
          }}
          isOwnProfile={isOwnProfile}
        />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
