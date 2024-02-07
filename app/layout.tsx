import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ToastQuerystringMonitor } from "@/components/ToastQuerystringMonitor";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground lg:p-20">
        <main>{children}</main>
        <Toaster />
        <ToastQuerystringMonitor />
      </body>
    </html>
  );
}
