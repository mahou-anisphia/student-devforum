import {
  HomeLeftSidebar,
  HomeRightSidebar,
} from "~/app/_components/HomeSidebars";

export default function HomePage() {
  return (
    <>
      <HomeLeftSidebar />
      <main className="col-span-7 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to DevTo Clone</h1>
        <p className="mt-4 text-xl text-gray-600">
          A place to share knowledge and better understand the world
        </p>
      </main>
      <HomeRightSidebar />
    </>
  );
}
