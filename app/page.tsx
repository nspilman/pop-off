"use server";

import { EmailSignupForm } from "@/components/Forms/EmailSignupForm";
import { Layout } from "@/components/Layout/layout";
import { getSession } from "@/utils/supabase/getSession";
import { redirect } from "next/navigation";

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  /**
   * v0 by Vercel.
   * @see https://v0.dev/t/TDGinAF7oTV
   * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
   */

  const session = await getSession();
  if (session?.user) {
    redirect("/falling");
  }
  const referral = searchParams?.referral as string;

  return (
    <Layout bgClass="bg-falling-stars">
      <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
            Listen to{" "}
            <i>
              <u>Falling</u>
            </i>
            {"  "}
            by Toneway
          </h1>
          <p className="max-w-[600px] text-gray-800 md:text-xl dark:text-gray-500">
            Before it hits the streaming platforms
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <EmailSignupForm referral={referral} />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You will receive a link to the song page in your email. We'll only
            ever email you about our music.
          </p>
        </div>
        <div className="mt-4 text-gray-500 md:text-md dark:text-gray-500">
          <p className="pb-2 font-bold">
            We're so excited for you to hear this track.
          </p>
          <p className="pb-2">
            We're sharing this song early, so that when we release it on the
            streaming platforms, we'll have a fanbase (that's you!) ready to
            stream it.
          </p>
          <p className="pb-2">
            Inside, you'll have the opportunity to listen to the song, help with
            market research and pledge to do what you can to promote the song on
            launch. However you can help, we're eternally grateful.{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
}
