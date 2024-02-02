import { GeistSans } from "geist/font/sans";
import "./globals.css";

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
      <body className="bg-background text-foreground lg:p-20">{children}</body>
    </html>
  );
}
