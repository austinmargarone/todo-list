import Image from "next/image";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello World</div>
    </main>
  );
}
