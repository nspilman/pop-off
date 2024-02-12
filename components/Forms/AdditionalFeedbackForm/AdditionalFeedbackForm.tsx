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
    <FormBody
      submitListenerFeedback={submitListenerFeedback}
      formSections={formSections}
      isAlreadySelected={userAlreadySubmitted}
    />
  );
};
