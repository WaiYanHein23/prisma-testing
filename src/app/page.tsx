import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold p-3 bg-red-600 border-2 text-center">
        <Link href="/posts">Go To Post List</Link>
      </h1>
    </div>
  );
}
