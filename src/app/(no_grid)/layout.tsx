import { Navbar } from "../_components/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <div className="mx-auto max-w-7xl py-8">{children}</div>
    </div>
  );
}
