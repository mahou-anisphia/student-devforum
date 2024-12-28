import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { createCaller } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { ProfileCard } from "../_components/profileCard";
import { ProfileActivityCard } from "../_components/profileActivityCard";
import { ProfilePostsCard } from "../_components/profilePostCard";
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
      <div>
        {/* Banner and Profile Card - full width */}
        <div className="w-full">
          <ProfileCard
            user={{
              ...userData,
              joined: new Date(),
            }}
            isOwnProfile={isOwnProfile}
          />
        </div>
        {/* Activity and Posts Cards - contained to profile card width */}
        <div className="relative mt-8">
          {" "}
          {/* Added mt-8 for margin-top spacing */}
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <ProfileActivityCard userId={userData.id} />
              </div>
              <div className="col-span-2">
                <ProfilePostsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
