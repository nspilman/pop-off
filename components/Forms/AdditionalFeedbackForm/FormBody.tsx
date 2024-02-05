"use client";

import { useState } from "react";
import { useFormState } from "react-dom";

interface Props {
  submitListenerFeedback(initialState: any, formData: FormData): void;
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
  const [state, formAction] = useFormState(submitListenerFeedback, undefined);
  console.log({ state });
  return (
    <form className="space-y-4" action={formAction}>
      Thank you so much for your submission.
      <button onClick={() => setDisabled(false)}>Edit? </button>
      {formSections?.map((field) => (
        <div className="space-y-2 flex flex-col">
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
      <button disabled={disabled}>Send Suggestion</button>
    </form>
  );
};
