"use client";

import { useFormStatus } from "react-dom";

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`border ${pending ? "text-gray-400" : "text-black"}`}
    >
      {!pending ? label : "loading"}
    </button>
  );
};
