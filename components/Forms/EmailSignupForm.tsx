"use client";
import { ClientFormWrapper } from "./ClientFormWrapper";
import { FormReturn } from "@/types";

interface Props {
  onSubmit: (e: FormData) => void;
  getOTPCode: (formData: FormData) => Promise<FormReturn>;
}

export const EmailSignupForm = ({ onSubmit, getOTPCode }: Props) => {
  return (
    <ClientFormWrapper
      action={getOTPCode}
      buttonPosition="right"
      submitButtonLabel="Get Your Access Code"
      onSuccess={onSubmit}
    >
      <>
        <input
          className="max-w-lg flex-1 text-black border-bottom borderrounded border-black p-2 w-full lg:mr-2 shadow lg:w-72"
          placeholder="Enter your email for the whole song"
          type="email"
          name="email"
          required
        />
      </>
    </ClientFormWrapper>
  );
};
