"use client";

import { useState } from "react";
import { ClientWrapper } from "../ClientWrapper/ClientWrapper";
import { FormReturn } from "@/types";

interface Props {
  submitListenerFeedback(formData: FormData): FormReturn;
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
    <ClientWrapper
      action={submitListenerFeedback}
      disabled={disabled}
      setDisabled={setDisabled}
    >
      <>
        {formSections?.map((field) => (
          <div className="space-y-2 flex flex-col" key={JSON.stringify(field)}>
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
    </ClientWrapper>
  );
};
