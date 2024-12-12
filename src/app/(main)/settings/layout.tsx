import { SettingsSidebar } from "./_components/sidebar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-12">
      <div className="flex gap-8 bg-gray-50/50 px-6">
        <SettingsSidebar />
        <main className="flex-1 py-6">{children}</main>
      </div>
    </div>
  );
}
