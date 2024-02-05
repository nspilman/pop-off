import { submitListenerFeedback } from "@/app/actions";

import { getAdditionalFeedbackFormOptions } from "./getAdditionalFeedbackFormOptions";
import { FormBody } from "./FormBody";

interface Props {
  userId: string;
}

export const AdditionalFeedbackForm = async ({ userId }: Props) => {
  const { formSections, userAlreadySubmitted } =
    await getAdditionalFeedbackFormOptions(userId);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Playlist Suggestion</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>
      <FormBody
        submitListenerFeedback={submitListenerFeedback}
        formSections={formSections}
        isAlreadySelected={userAlreadySubmitted}
      />
    </div>
  );
};
