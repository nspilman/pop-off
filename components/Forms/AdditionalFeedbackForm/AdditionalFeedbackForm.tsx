import { submitListenerFeedback } from "@/app/actions";

import { FormBody } from "./FormBody";

interface Props {
  userId: string;
  getAdditionalFeedbackFormOptions: (userId: string) => Promise<{
    formSections: {
      id: number;
      label: string;
      placeholder: string;
      order: number;
      defaultValue: string;
    }[];
    songInfo:
      | {
          song_id: number;
        }[]
      | null;
    userAlreadySubmitted: boolean;
  }>;
}

export const AdditionalFeedbackForm = async ({
  userId,
  getAdditionalFeedbackFormOptions,
}: Props) => {
  const { formSections, userAlreadySubmitted } =
    await getAdditionalFeedbackFormOptions(userId);

  return (
    <FormBody
      submitListenerFeedback={submitListenerFeedback}
      formSections={formSections}
      isAlreadySelected={userAlreadySubmitted}
    />
  );
};
