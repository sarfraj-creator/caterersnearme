import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "CaterSearch — Find the Best Caterers Near You",
  description:
    "Discover and compare top catering services for weddings, corporate events, and parties. Search by cuisine, price, and location.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 font-body antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
