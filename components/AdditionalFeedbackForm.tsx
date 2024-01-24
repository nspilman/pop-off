import { submitListenerFeedback } from "@/app/actions";

export const AdditionalFeedbackForm = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Playlist Suggestion</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <form className="space-y-4" action={submitListenerFeedback}>
        <div className="space-y-2">
          <label htmlFor="artist">Artist or Song</label>
          <input
            id="artist"
            placeholder="Enter artist or song"
            name="similar_artists_or_songs"
            className="text-black"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="feedback">Additional Feedback</label>
          <textarea
            className="min-h-[100px] text-black"
            id="feedback"
            placeholder="Enter your feedback"
            name="additional_feedback"
          />
        </div>
        <button>Send Suggestion</button>
      </form>
    </div>
  );
};
