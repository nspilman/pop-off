import HLSAudioPlayer from "@/components/HLSAudioPlayer";
import { redirect } from "next/navigation";
import { SVGProps } from "react";
import { generateShareToken } from "@/utils/generateShareLink";
import { CopyShareLink } from "@/components/CopyShareLink";
import {
  VolunteerOptionsForm,
  UnsubscribeForm,
  AdditionalFeedbackForm,
} from "@/components/Forms";
import { getVolunteerFormOptions } from "@/components/Forms/VolunteerOptionsForm/getVolunteerFormOptions";
import { handleVolunteerFormSubmission } from "../actions";
import { TOAST_REDIRECT_KEY } from "@/constants";
import { Layout } from "@/components/Layout/layout";
import { getSession } from "@/utils/supabase/getSession";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SONG_STREAMING_URL =
  "https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/falling_stream/output.m3u8";

export default async function Index() {
  const session = await getSession();
  if (!session) {
    return redirect(
      `/?${TOAST_REDIRECT_KEY}=${"Oops - you can only access the song via access link sent to your email. Type your email in the form to get started."}`
    );
  }

  const shareLink = await generateShareToken();

  const userId = session.user.id;
  const { sections, songInfo, userAlreadySubmitted } =
    await getVolunteerFormOptions(session.user.id);

  const songId = songInfo?.[0].song_id.toString() || "";

  return (
    <Layout bgClass="bg-music">
      <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-12 lg:py-16">
        <section className="w-full max-w-md mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Falling by Toneway
          </h1>
          <p className="mt-4 text-gray-500">
            Listen to our new song before it's officially released.
          </p>
          <HLSAudioPlayer src={SONG_STREAMING_URL} />
        </section>

        <div className="mt-4 text-gray-500 md:text-md dark:text-gray-500 pb-8">
          <p className="pb-2 font-bold">What do you think? It is a jam?</p>
          <p className="pb-2">
            If so, we humbly ask for your help. With essentially infinite new
            songs released daily on streaming services, we're looking for an
            army of listeners (a Tonewave?) when the song drops to cut through
            the noise. The goal is to get the attention of the robot tastemakers
            to start recommending the song to new listeners with similar
            listening profiles.
          </p>
          <p className="pb-2 font-bold">You can help in the following ways:</p>
          <div className="flex space-x-8 flex-col w-full items-center ">
            <div className="ml-8 w-full">
              <CopyShareLink link={shareLink} />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="border p-2 w-full">
                  See ways you can help on Release Day
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    <VolunteerOptionsForm
                      sections={sections}
                      userAlreadySubmitted={userAlreadySubmitted}
                      handleVolunteerFormSubmission={
                        handleVolunteerFormSubmission
                      }
                      hiddenFields={{ userId, songId }}
                    />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="border p-2 w-full">Provide insights</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    <AdditionalFeedbackForm userId={session.user.id} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-gray-500">
          Or if you didn't like the song and don't want to hear from us -
        </p>

        <UnsubscribeForm />
      </div>
    </Layout>
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
