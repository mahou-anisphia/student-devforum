"use client";
import { cn } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSmile, FaCog } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { PiPlantFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi";
import { IoFlash } from "react-icons/io5";

const sidebarItems = [
  {
    title: "Profile",
    href: "/settings",
    icon: FaSmile,
    color: "text-yellow-500",
  },
  {
    title: "Customization",
    href: "/settings/customization",
    icon: FaCog,
    color: "text-gray-500",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: FaEnvelope,
    color: "text-blue-500",
  },
  {
    title: "Account",
    href: "/settings/account",
    icon: PiPlantFill,
    color: "text-green-500",
  },
  {
    title: "Organization",
    href: "/settings/organization",
    icon: HiUserGroup,
    color: "text-purple-500",
  },
  {
    title: "Extensions",
    href: "/settings/extensions",
    icon: IoFlash,
    color: "text-orange-500",
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64">
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-4 py-2 text-[15px] transition-colors",
              pathname === item.href
                ? "bg-white font-medium text-gray-900 shadow-sm"
                : "text-gray-600 hover:bg-white hover:text-gray-900",
            )}
          >
            <item.icon className={cn("h-5 w-5", item.color)} />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
