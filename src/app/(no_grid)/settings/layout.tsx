import { SettingsSidebar } from "./_components/sidebar";
import { auth } from "~/server/auth";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="col-span-12">
      <div className="flex gap-8 bg-gray-50/50 px-6">
        <SettingsSidebar />
        <main className="flex-1 py-6">
          <div className="text-3xl font-bold text-blue-600">
            @{session?.user?.id}
          </div>
          <div className="my-4" />{" "}
          {/* Added space between user ID and children */}
          {children}
        </main>
      </div>
    </div>
  );
}
