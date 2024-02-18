import { GeistSans } from "geist/font/sans";
import "./globals.css";
const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title:
    "Toneway | Seattle-based Pop Group | Listen to Falling before it's released to the public",
  favicon: "./favicon.ico",
  description:
    "Listen to Falling by Toneway before the song hits the major streaming platforms",
  og: {
    title:
      "Toneway | Seattle-based Pop Group | Listen to Falling before it's released to the public",
    description:
      "Listen to Falling by Toneway before the song hits the major streaming platforms",
    image:
      "https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/cover%20art/emailBg.jpeg?t=2024-02-18T17%3A35%3A35.217Z",
    url: defaultUrl,
    type: "music.song",
    site_name: "Toneway Music",
  },
  canonical: defaultUrl,
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  charset: "UTF-8",
  lang: "en",
  themeColor: "#000000",
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
