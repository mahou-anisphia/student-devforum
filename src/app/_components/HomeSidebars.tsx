import { FaHashtag, FaRegClock } from "react-icons/fa";
import { Card } from "~/components/ui/card"; // Assuming shadcn provides a Card component

import { FaHome, FaBook, FaTag, FaQuestionCircle } from "react-icons/fa";
import { SiX, SiFacebook, SiGithub, SiLinkedin } from "react-icons/si"; // Social media icons

export function HomeLeftSidebar() {
  return (
    <aside className="sticky top-16 col-span-2 min-h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 p-6">
      <div className="flex h-full flex-col">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">Navigation</h2>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-600 transition-colors hover:text-gray-900"
          >
            <FaHome className="flex-shrink-0 text-lg" />
            <span className="truncate">Home</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-600 transition-colors hover:text-gray-900"
          >
            <FaBook className="flex-shrink-0 text-lg" />
            <span className="truncate">Reading List</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-600 transition-colors hover:text-gray-900"
          >
            <FaTag className="flex-shrink-0 text-lg" />
            <span className="truncate">Tags</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 text-gray-600 transition-colors hover:text-gray-900"
          >
            <FaQuestionCircle className="flex-shrink-0 text-lg" />
            <span className="truncate">FAQ</span>
          </a>
        </nav>

        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Others</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="block truncate text-gray-600 transition-colors hover:text-gray-900"
              >
                Code of Conduct
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block truncate text-gray-600 transition-colors hover:text-gray-900"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block truncate text-gray-600 transition-colors hover:text-gray-900"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-auto pt-10">
          <hr className="mb-6 border-gray-200" />
          <div className="grid w-full max-w-[200px] grid-cols-4 gap-2">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <SiX className="text-xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <SiFacebook className="text-xl" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <SiGithub className="text-xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <SiLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function HomeRightSidebar() {
  return (
    <aside className="sticky top-16 col-span-3 min-h-[calc(100vh-4rem)] overflow-y-auto border-l border-gray-200 p-6">
      <h2 className="mb-6 text-xl font-semibold text-gray-800">Discover</h2>
      <div className="space-y-6">
        <Card className="rounded-lg bg-gray-50 p-4 shadow-md">
          <h3 className="mb-4 text-lg font-medium text-gray-700">
            Trending Topics
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaHashtag className="flex-shrink-0 text-gray-500" />
              <span className="truncate">javascript</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaHashtag className="flex-shrink-0 text-gray-500" />
              <span className="truncate">webdev</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaHashtag className="flex-shrink-0 text-gray-500" />
              <span className="truncate">programming</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaHashtag className="flex-shrink-0 text-gray-500" />
              <span className="truncate">beginners</span>
            </li>
          </ul>
        </Card>

        <Card className="rounded-lg bg-gray-50 p-4 shadow-md">
          <h3 className="mb-4 text-lg font-medium text-gray-700">
            Recent Posts
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaRegClock className="flex-shrink-0 text-gray-500" />
              <span className="truncate">Getting Started with React</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaRegClock className="flex-shrink-0 text-gray-500" />
              <span className="truncate">TypeScript Best Practices</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900">
              <FaRegClock className="flex-shrink-0 text-gray-500" />
              <span className="truncate">Web Development in 2024</span>
            </li>
          </ul>
        </Card>
      </div>
    </aside>
  );
}
