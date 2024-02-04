import { submitListenerFeedback } from "@/app/actions";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getAdditionalFeedbackFormOptions } from "./getVolunteerFormOptions";

interface Props {
  userId: string;
}

export const AdditionalFeedbackForm = async ({ userId }: Props) => {
  const { formSections } = await getAdditionalFeedbackFormOptions(userId);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Playlist Suggestion</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <form className="space-y-4" action={submitListenerFeedback}>
        {formSections?.map((field) => (
          <div className="space-y-2 flex flex-col">
            <label htmlFor={field.id}>{field.label}</label>
            <textarea
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              className="text-black p-2 rounded"
            />
          </div>
        ))}

        <button>Send Suggestion</button>
      </form>
    </div>
  );
};
