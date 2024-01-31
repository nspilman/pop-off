"use server";
import RootLayout from "./layout";
import { EmailSignupForm } from "@/components/Forms/EmailSignupForm";

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

  const error = searchParams?.error as string;
  const referral = searchParams?.referral as string;

  return (
    <RootLayout>
    <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-[#f5f5f5] px-8">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <img
            alt="Song cover"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="550"
            src="https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/IMG_2890.jpg"
            width="310"
          ></img>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                Sneak Peek: Falling
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Get ready for the upcoming release of our new song. Sign up now
                to get notified!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <EmailSignupForm error={error} referral={referral} />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when the song is released.
              </p>
            </div>
            <div className="mt-4 text-gray-500 md:text-lg dark:text-gray-400">
              <p>
                Our new song, "Song Title", is a journey into the heart of
                music. With powerful lyrics and a melody that will stay with you
                long after the song ends, "Song Title" is more than just a song
                - it's an experience. Don't miss out on the release. Sign up now
                to stay updated!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </RootLayout>
  );
}
