"use client";
import { useSearchParams } from "next/navigation";
import { ClientFormWrapper } from "./ClientFormWrapper";
import { FormReturn } from "@/types";

interface Props {
  onSubmit: (e: FormData) => void;
  getOTPCode: (formData: FormData) => Promise<FormReturn>;
}

export const EmailSignupForm = ({ onSubmit, getOTPCode }: Props) => {
  const params = useSearchParams();
  const referral = params.get("referral");
  return (
    <ClientFormWrapper
      action={getOTPCode}
      buttonPosition="right"
      submitButtonLabel="Get Your Access Code"
      onSuccess={onSubmit}
    >
      <div>
        <label htmlFor="email">
          Provide your email to access the full song
        </label>
        <input
          className="max-w-lg flex-1 text-black border-bottom borderrounded border-black p-2 w-full lg:mr-2 shadow lg:w-72"
          placeholder="thomyork@example.com"
          type="email"
          name="email"
          required
        />
        {referral && <input name="referral" value={referral} hidden />}
      </div>
    </ClientFormWrapper>
  );
};
