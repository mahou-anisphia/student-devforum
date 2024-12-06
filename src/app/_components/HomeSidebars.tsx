export function HomeLeftSidebar() {
  return (
    <aside className="col-span-2 min-h-[calc(100vh-4rem)] border-r border-gray-200 p-4">
      <h2 className="mb-4 font-semibold">Navigation</h2>
      <nav className="space-y-2">
        <a href="#" className="block text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="#" className="block text-gray-600 hover:text-gray-900">
          Reading List
        </a>
        <a href="#" className="block text-gray-600 hover:text-gray-900">
          Tags
        </a>
        <a href="#" className="block text-gray-600 hover:text-gray-900">
          FAQ
        </a>
      </nav>
    </aside>
  );
}

export function HomeRightSidebar() {
  return (
    <aside className="col-span-3 min-h-[calc(100vh-4rem)] border-l border-gray-200 p-4">
      <h2 className="mb-4 font-semibold">Discover</h2>
      <div className="space-y-4">
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-medium">Trending Topics</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 hover:text-gray-900">#javascript</li>
            <li className="text-gray-600 hover:text-gray-900">#webdev</li>
            <li className="text-gray-600 hover:text-gray-900">#programming</li>
            <li className="text-gray-600 hover:text-gray-900">#beginners</li>
          </ul>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <h3 className="mb-2 font-medium">Recent Posts</h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-600 hover:text-gray-900">
              Getting Started with React
            </li>
            <li className="text-gray-600 hover:text-gray-900">
              TypeScript Best Practices
            </li>
            <li className="text-gray-600 hover:text-gray-900">
              Web Development in 2024
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
