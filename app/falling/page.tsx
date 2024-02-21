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
import { getAdditionalFeedbackFormOptions } from "@/components/Forms/AdditionalFeedbackForm/getAdditionalFeedbackFormOptions";

const SONG_STREAMING_URL =
  "https://pgxxxhjpdbarogibubuk.supabase.co/storage/v1/object/public/Toneway/falling_stream/master/output.m3u8";

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
        <section className="w-full max-w-md mx-auto text-center flex flex-col items-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Falling by Toneway
          </h1>
          {/* <p className="mt-4 text-gray-500">Please enjoy</p> */}
          <AudioPlayer src={SONG_STREAMING_URL} title={"FALLING / TONEWAY"} />
          <p>
            First, if you have Spotify - please{" "}
            <a
              href="https://distrokid.com/hyperfollow/toneway/falling"
              target="_blank"
              className="text-blue-800"
            >
              pre-save the song here.
            </a>
            <p>Next:</p>
          </p>
        </section>

        <div className="mt-2 md:mt-4 px-8 text-gray-500 md:text-md dark:text-gray-500 pb-8">
          <p className="pb-2 font-bold">Be a part of the release</p>
          <p className="pb-2">
            Thank you for being here. We hope the song caught you by surprise,
            made you bob your head and put a smile on your face. A lot of time
            and laughter on our end went into making it for you.
          </p>
          <p className="pb-2">
            We've released the song on our website before it hits the streaming
            services to build a more concrete fanbase. With your email signup,
            you've joined the Toneway fanclub of sorts. (The <i>Tonewave</i>?
            The <i>Tonewarriors?</i> Options are endless) We'll send out updates
            on songs, merchandise, calls to action, etc. If that sounds lame,
            unsubscribe below. We'll never give anyone your email - on Radiohead
            and Kendrick Lamar.
          </p>
          <p className="pb-2">
            You may say to yourself - "I've got my boogie board and I'm ready to
            ride the ToneWave (and I don't care what they say about falling) -
            but what's next? How can I help?" Well, <i>ToneWizards</i>,{" "}
            <b> You can help in the following ways:</b>
          </p>
          <div className="flex space-x-8 flex-col w-full items-center ">
            <div className="ml-8 w-full">
              <CopyShareLink link={shareLink} />
            </div>
            <Modal
              buttonLabel="Volunteer to stream and share"
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
              <AdditionalFeedbackForm
                userId={session.user.id}
                getAdditionalFeedbackFormOptions={
                  getAdditionalFeedbackFormOptions
                }
              />
            </Modal>
          </div>
        </div>
        {/* <p className="text-gray-500">
          We'll email you about the song release. Thanks for spending time with
          us, and hope to grab your ear again. 
        </p> */}
      </div>
    </Layout>
  );
}
