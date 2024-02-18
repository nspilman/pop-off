"use client";
import { MultiSelectForm } from "@/components/MultiselectForm";
import { ClientFormWrapper } from "../ClientFormWrapper";
import { useState } from "react";
import { FormReturn } from "@/types";
import { sendTrackingEvent } from "@/components/tracking";
import SubmissionReview from "../SubmissionReview/SubmissionReview";

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
  onSuccess?: () => void;
}

export const VolunteerOptionsForm = ({
  handleVolunteerFormSubmission,
  userAlreadySubmitted,
  sections,
  hiddenFields,
  onSuccess,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(userAlreadySubmitted);

  const displaySections = sections
    .filter((section) => section.choices.some((choice) => choice.selected))
    .map((section) => ({
      label: section.title,
      values: section.choices
        .filter((choice) => choice.selected)
        .map((choice) => choice.label),
    }));

  const onFormSubmissionSuccess = () => {
    setIsDisabled(true);
    onSuccess?.();
  };

  const SubmissionReviewComponent = () => (
    <SubmissionReview
      title="Thanks for volunteering to help promote the song!"
      label="Here's what you've signed up to do:"
      sections={displaySections}
      enableForm={() => setIsDisabled(false)}
    />
  );

  return (
    <div className="h-[80vh] overflow-scroll">
      <ClientFormWrapper
        action={handleVolunteerFormSubmission}
        disabled={isDisabled}
        onSuccess={() => onFormSubmissionSuccess()}
        trackSubmission={() =>
          sendTrackingEvent({ type: "pledge_survey_completion" })
        }
        SubmittedView={SubmissionReviewComponent}
      >
        <MultiSelectForm
          sections={sections}
          disabled={isDisabled}
          hiddenFields={hiddenFields}
        />
      </ClientFormWrapper>
    </div>
  );
};
