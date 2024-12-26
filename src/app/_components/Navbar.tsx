import Link from "next/link";
import Image from "next/image";
import { auth } from "~/server/auth";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { BellIcon } from "lucide-react";
import { CiSearch } from "react-icons/ci";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center space-x-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/favicon.png"
                alt="DEV Community"
                width={50}
                height={40}
                className="h-10"
              />
            </Link>
            <div className="w-full max-w-md">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-9"
                />
                <CiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  <Link href="/posts/create">Create Post</Link>
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
                    0
                  </span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                      />
                      <AvatarFallback>
                        {session.user.name?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback>
                          {session.user.name?.[0] ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        href="/profile/me"
                        className="flex flex-col space-y-0.5 hover:opacity-80"
                      >
                        <p className="text-sm font-medium">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {session.user.id.length > 8
                            ? `@${session.user.id.slice(0, 10)}...`
                            : `@${session.user.id}`}
                        </p>
                      </Link>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/posts/create">Create Post</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/reading-list">Reading list</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signout">Sign Out</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign in</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                  asChild
                >
                  <Link href="/auth/signup">Create account</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
