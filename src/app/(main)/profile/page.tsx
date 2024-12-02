import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-xl">Welcome, {session.user.name}</p>
        <p className="mt-2 text-gray-600">Profile page coming soon...</p>
      </div>
    </div>
  );
}
