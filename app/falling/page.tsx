import { redirect } from "next/navigation";
import { generateShareToken } from "@/utils/generateShareLink";
import { CopyShareLink } from "@/components/CopyShareLink";
import {
  VolunteerOptionsForm,
  AdditionalFeedbackForm,
} from "@/components/Forms";
import { getVolunteerFormOptions } from "@/components/Forms/VolunteerOptionsForm/getVolunteerFormOptions";
import { handleVolunteerFormSubmission } from "../actions";
import { TOAST_REDIRECT_KEY } from "@/constants";
import { Layout } from "@/components/Layout/layout";
import { getSession } from "@/utils/supabase/getSession";

import { sendTrackingEvent } from "@/components/tracking";
import { Modal } from "@/components/Modal";
import { AudioPlayer } from "@/components/MusicPlayer/MusicPlayer";

const SONG_STREAMING_URL =
  "https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/falling_stream/output.m3u8";

export default async function Index() {
  const session = await getSession();
  if (!session) {
    return redirect(
      `/?${TOAST_REDIRECT_KEY}=${"Oops - you can only access the song via access link sent to your email. Type your email in the form to get started."}`
    );
  }

  sendTrackingEvent({ type: "falling_page_land" });

  const shareLink = await generateShareToken();

  const userId = session.user.id;
  const { sections, songInfo, userAlreadySubmitted } =
    await getVolunteerFormOptions(session.user.id);

  const songId = songInfo?.[0].song_id.toString() || "";

  return (
    <Layout bgClass="bg-music" showUnsubscribe>
      <div className="flex-1 flex flex-col items-center justify-center py-6 md:py-12 lg:py-16">
        <section className="w-full max-w-md mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Falling by Toneway
          </h1>
          <p className="mt-4 text-gray-500">
            Listen to our new song before it's officially released.
          </p>
          <AudioPlayer src={SONG_STREAMING_URL} title={"FALLING / TONEWAY"} />
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
          <div>
            <p className="pb-2 font-bold mt-12">
              You can help in the following ways:
            </p>
            <div className="flex space-x-8 flex-col w-full items-center ">
              <div className="ml-8 w-full">
                <CopyShareLink link={shareLink} />
              </div>
              <Modal
                buttonLabel="See ways you can help on Release Day"
                eventStrings={{
                  open: "pledge_survey_open",
                  close: "pledge_survey_close",
                }}
              >
                <VolunteerOptionsForm
                  sections={sections}
                  userAlreadySubmitted={userAlreadySubmitted}
                  handleVolunteerFormSubmission={handleVolunteerFormSubmission}
                  hiddenFields={{ userId, songId }}
                />
              </Modal>
              <Modal
                buttonLabel="Provide insights"
                eventStrings={{
                  open: "market_research_survey_open",
                  close: "market_research_survey_close",
                }}
              >
                <AdditionalFeedbackForm userId={session.user.id} />
              </Modal>
            </div>
          </div>
        </div>
        <p className="text-gray-500">
          We'll email you about the song release. If you didn't like the song
          and don't want to hear from us, unsubscribe below. Thanks for spending
          time with us, and hope to grab your ear again.
        </p>
      </div>
    </Layout>
  );
}
