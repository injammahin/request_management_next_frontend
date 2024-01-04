"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navigation/page";

import { useEffect, useState } from "react";
import Sidebar from "./components/navigation/sidebar/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setLoggedIn(!!userId);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-100">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* {loggedIn && <Navbar />}
            {loggedIn && <Sidebar />} */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
