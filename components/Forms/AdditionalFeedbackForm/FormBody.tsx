"use client";

import { useState } from "react";
import { ClientFormWrapper } from "../ClientFormWrapper";
import { FormReturn } from "@/types";
import { sendTrackingEvent } from "@/components/tracking";
import SubmissionReview from "../SubmissionReview/SubmissionReview";

interface Props {
  submitListenerFeedback(formData: FormData): Promise<FormReturn>;
  formSections?: {
    id: number;
    label: string;
    placeholder: string;
    order: number;
    defaultValue: any;
  }[];
  isAlreadySelected: boolean;
}

export const FormBody = ({
  submitListenerFeedback,
  formSections,
  isAlreadySelected,
}: Props) => {
  const [disabled, setDisabled] = useState(isAlreadySelected);

  const SubmissionReviewComponent = () => {
    const submissionSections = formSections?.map((section) => ({
      label: section.label,
      values: [section.defaultValue],
    }));
    return (
      <SubmissionReview
        title="Thank you for responding to our marketing survey!"
        label="Here's how you responded:"
        sections={submissionSections}
        enableForm={() => setDisabled(false)}
      />
    );
  };
  return (
    <ClientFormWrapper
      action={submitListenerFeedback}
      disabled={disabled}
      onSuccess={() => setDisabled(true)}
      SubmittedView={SubmissionReviewComponent}
      trackSubmission={() =>
        sendTrackingEvent({ type: "market_research_survey_completion" })
      }
    >
      <>
        {formSections?.map((field, i) => (
          <div
            className="space-y-2 flex flex-col"
            key={`${i}${JSON.stringify(field)}`}
          >
            <label htmlFor={field.id.toString()}>{field.label}</label>
            <textarea
              id={field.id.toString()}
              name={field.id.toString()}
              placeholder={field.placeholder}
              className="text-black p-2 rounded"
              defaultValue={field.defaultValue}
              disabled={disabled}
            />
          </div>
        ))}
      </>
    </ClientFormWrapper>
  );
};
