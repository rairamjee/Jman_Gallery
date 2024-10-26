import localFont from "next/font/local";
import "./globals.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { LogOut} from "lucide-react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "JMAN Gallery",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-purple-300">
          <div className="flex gap-4 justify-between items-center p-5">
            {/* <Image src="/public/logo.png" width={20} height={20}></Image> */}
            <h2 className="text-violet-900 text-3xl">JMAN Gallery</h2>
            <p className="text-pink-400 text-base">
              Creating Technologies Building Memories Together
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src="/profile.jpg?height=32&width=32"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{"User"}</DropdownMenuItem>
                <DropdownMenuItem>{"Designation"}</DropdownMenuItem>
                <DropdownMenuItem>{"example@gmail.com"}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="mt-2 font-bold">
                  <LogOut className="mr-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
