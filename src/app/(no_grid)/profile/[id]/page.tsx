import { Metadata } from "next";
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
    const userData = await caller.profile.getProfileById(resolvedParams.id);
    return {
      title: `${userData.name ?? "Profile"} | Your App Name`,
      description: `View ${userData.name}'s profile`,
    };
  } catch {
    return {
      title: "Profile Not Found | Your App Name",
    };
  }
}

export default async function ProfilePage({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const context = await createTRPCContext({ headers: new Headers() });
  const caller = createCaller(context);
  const session = await auth();

  try {
    const userData = await caller.profile.getProfileById(id);
    const isOwnProfile = session?.user?.id === userData.id;

    return (
      <div className="col-span-12 -mx-4 -mt-8">
        <ProfileCard
          user={{
            ...userData,
            email: userData.email ?? null,
            profileColor: userData.profileColor ?? null,
            profile: userData.profile
              ? {
                  bio: userData.profile.bio,
                  location: userData.profile.location,
                  pronouns: userData.profile.pronouns,
                  work: userData.profile.work,
                  education: userData.profile.education,
                }
              : null,
          }}
          isOwnProfile={isOwnProfile}
        />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
