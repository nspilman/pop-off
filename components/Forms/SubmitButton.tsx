"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({
  label,
  disabled = false,
  pending = false,
}: {
  label: string;
  disabled?: boolean;
  pending?: boolean;
}) => {
  console.log({ pending });
  return (
    <button
      type="submit"
      className={`border ${pending ? "text-gray-400" : "white"}`}
      disabled={disabled}
    >
      {!pending ? label : "loading"}
    </button>
  );
};
