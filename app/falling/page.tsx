import HLSAudioPlayer from "@/components/HLSAudioPlayer";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SVGProps } from "react";
import RootLayout from "../layout";
import { AdditionalFeedbackForm } from "@/components/AdditionalFeedbackForm";
import { generateShareToken } from "@/utils/generateShareLink";
import { CopyShareLink } from "@/components/CopyShareLink";

const SONG_STREAMING_URL =
  "https://d3qxyro07qwbpl.cloudfront.net/falling/output.m3u8";

export default async function Index() {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return redirect("/");
  }

  const shareLink = await generateShareToken();

  return (
    <RootLayout>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <MusicIcon className="h-6 w-6 text-white" />
            <span className="sr-only">Secret Song</span>
          </Link>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
          <section className="w-full max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Exclusive Pre-Release
            </h1>
            <p className="mt-4 text-gray-300">
              Listen to our new song before it's officially released.
            </p>
            <HLSAudioPlayer src={SONG_STREAMING_URL} />

            <div className="mt-8">
              <div className="w-full" />
            </div>
            <CopyShareLink link={shareLink} />
            <div className="mt-8">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                href="#"
              >
                Give Feedback
              </Link>
            </div>
          </section>
          <section className="w-full max-w-md mx-auto mt-12 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Share the Secret
            </h2>
            <p className="mt-4 text-gray-300">
              Spread the word on social media.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link className="text-blue-500" href="#">
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link className="text-blue-600" href="#">
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link className="text-blue-700" href="#">
                <LinkedinIcon className="h-6 w-6" />
              </Link>
            </div>
          </section>
          <section className="w-full max-w-md mx-auto mt-12 text-center">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Join the Launch
            </h2>
            <p className="mt-4 text-gray-300">
              By sharing our music, you're not just spreading the word, you're
              becoming a part of our journey. Let's make this launch a success
              together!
            </p>
          </section>
          <AdditionalFeedbackForm />
        </main>
        <footer className="px-4 lg:px-6 h-14 flex items-center">
          <p className="text-xs text-gray-500">
            © 2024 Secret Song. All rights reserved.
          </p>
        </footer>
      </div>
    </RootLayout>
  );
}

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Z4AVO0a78L8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MusicIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
