import { GeistSans } from "geist/font/sans";
import "./globals.css";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Toneway | Seattle-based Pop Group",
  favicon: "./favicon.ico",
  description:
    "Listen to Falling by Toneway before the song hits the major streaming platforms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground lg:p-12 w-screen">
        {children}
      </body>
    </html>
  );
}
