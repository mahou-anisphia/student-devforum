import { Navbar } from "~/app/_components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="max-w mx-auto py-8">
        <div className="grid grid-cols-12">{children}</div>
      </div>
    </div>
  );
}
