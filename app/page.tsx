"use server";

import { Layout } from "@/components/Layout/layout";
import { AudioPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { OTPWorkflow } from "@/components/OTPWorkflow/OTPWorkflow";
import { getSession } from "@/utils/supabase/getSession";
import { redirect } from "next/navigation";
import { loginWithOtp, sendSignInLinkToEmail } from "@/app/actions";

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

  const SONG_STREAMING_URL =
    "https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/falling_stream/speekneek/output.m3u8";

  return (
    <Layout bgClass="bg-falling-stars">
      <div className="flex flex-col justify-center items-center md:items-start space-y-4 pt-2 md:pt-8">
        <div className="md:mb-4 flex flex-col items-center md:items-start">
          <h1 className="text-lg font-bold tracking-tighter sm:text-3xl md:text-3xl xl:text-6xl/none text-black">
            "Falling"
            {"  "}
            by Toneway
          </h1>
          <span className="max-w-[600px] text-gray-800 md:text-xl mt-0 dark:text-gray-500">
            Your early access to the song
          </span>
        </div>
        <div className="w-full max-w-sm flex flex-col items-center">
          <AudioPlayer
            src={SONG_STREAMING_URL}
            title={"FALLING (PREVIEW) / TONEWAY"}
          />
        </div>

        <p className="text-s text-gray-500 dark:text-gray-500">
          If you like what you're hearing, we'll send you a link to access the
          rest of the song. In addition -
          <a
            href="https://distrokid.com/hyperfollow/toneway/falling"
            target="_blank"
            className="text-blue-400"
          >
            please pre-save the song on Spotify.
          </a>
        </p>
        <div className="mt-2 lg:ml-2">
          <OTPWorkflow
            referral={referral}
            actions={{
              getOTPCode: sendSignInLinkToEmail,
              loginWithOTPCode: loginWithOtp,
            }}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            You will receive a link to the song page in your email.
          </p>
        </div>
        <div className="pt-4 text-gray-500 md:text-md dark:text-gray-500">
          <p className="pb-2 font-bold">
            We're so excited for you to hear this track.
          </p>
          <p className="pb-2">
            Inside, you'll have the opportunity to listen to the song, help with
            market research and pledge to do what you can to promote the song on
            launch. However you can help, we're eternally grateful.{" "}
          </p>
          <p className="pb-2">
            Giving us your email will add you to our mailing list, but if the
            full song doesn't meet your taste, we've made it easy to
            unsubscribe.
          </p>
          <p>The song drop on streaming services on 3/8.</p>
          {/* <p className="pb-2">
            We're sharing this song early, so that when we release it on the
            streaming platforms, we'll have a fanbase (that's you!) ready to
            stream it.
          </p> */}
        </div>
      </div>
    </Layout>
  );
}
