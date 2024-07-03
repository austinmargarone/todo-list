import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://prisma-to-do-list.vercel.app/"),
  title: "To-Do List",
  description: "A simple to-do list app to keep track of your tasks.",
  keywords: ["to-do", "tasks", "list"],
  openGraph: {
    images: [
      {
        url: `https://res.cloudinary.com/dfah2ntps/image/upload/v1720033700/todo_blzt3b.png`,
        width: 1200,
        height: 630,
        alt: "Full Stack Developer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
