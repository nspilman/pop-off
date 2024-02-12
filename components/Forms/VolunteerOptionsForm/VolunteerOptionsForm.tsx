"use client";
import { MultiSelectForm } from "@/components/MultiselectForm";
import { ClientFormWrapper } from "../ClientFormWrapper";
import { useState } from "react";
import { FormReturn } from "@/types";
import { sendTrackingEvent } from "@/components/tracking";

interface Props {
  userAlreadySubmitted: boolean;
  hiddenFields: Record<string, string>;
  handleVolunteerFormSubmission: (formData: FormData) => Promise<FormReturn>;
  sections: {
    title: string;
    choices: {
      label: string;
      id: number;
      selected: boolean;
    }[];
  }[];
}

export const VolunteerOptionsForm = ({
  handleVolunteerFormSubmission,
  userAlreadySubmitted,
  sections,
  hiddenFields,
}: Props) => {
  const [isDisabled, setIsDisbled] = useState(userAlreadySubmitted);
  return (
    <ClientFormWrapper
      action={handleVolunteerFormSubmission}
      disabled={isDisabled}
      setDisabled={setIsDisbled}
      trackSubmission={() =>
        sendTrackingEvent({ type: "pledge_survey_completion" })
      }
    >
      <MultiSelectForm
        sections={sections}
        disabled={isDisabled}
        hiddenFields={hiddenFields}
      />
    </ClientFormWrapper>
  );
};
