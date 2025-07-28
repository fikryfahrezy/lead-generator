import { LogoutButton } from "@/components/logout-button";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akselerasi AI",
  description: "Akselerasi AI - Fullstack Take Home Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-6 border-b-2 flex items-center justify-end">
          <LogoutButton />
        </nav>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          {children}
        </div>
      </body>
    </html>
  );
}
