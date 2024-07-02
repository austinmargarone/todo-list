import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-[2.5rem] justify-center">
      <div>To DO App</div>
      <input
        className="rounded-md shadow-md p-2 text-black"
        placeholder="Add to do..."
      ></input>
      <button className="bg-blue-500 cursor-pointer shadow-md p-5 text-white rounded">
        Add
      </button>
    </main>
  );
}
