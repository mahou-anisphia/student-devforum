import Link from "next/link";
import { auth } from "~/server/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 justify-between">
          <div className="flex space-x-8">
            <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/posts"
              className="inline-flex items-center px-1 pt-1 text-lg font-medium text-gray-500 hover:text-gray-900"
            >
              Posts
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <Link
                  href="/profile"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Profile
                </Link>
                <Link
                  href="/api/auth/signout"
                  className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                >
                  Sign out
                </Link>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
