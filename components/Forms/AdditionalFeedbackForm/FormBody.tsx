"use client";

import { useState } from "react";
import { ClientFormWrapper } from "../ClientFormWrapper";
import { FormReturn } from "@/types";
import { sendTrackingEvent } from "@/components/tracking";

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

  return (
    <ClientFormWrapper
      action={submitListenerFeedback}
      disabled={disabled}
      setDisabled={setDisabled}
      trackSubmission={() =>
        sendTrackingEvent({ type: "market_research_survey_completion" })
      }
    >
      <>
        {formSections?.map((field, i) => (
          <div className="space-y-2 flex flex-col" key={i}>
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
