"use client";

import { useState } from "react";
import { EmailSignupForm } from "../Forms";
import { ClientFormWrapper } from "../Forms/ClientFormWrapper";
import { FormReturn } from "@/types";
import { redirect } from "next/navigation";

type WorkflowState = "getCode" | "postCode";

interface Props {
  referral?: string;
  actions: {
    getOTPCode: (formData: FormData) => Promise<FormReturn>;
    loginWithOTPCode: (formData: FormData) => Promise<FormReturn>;
  };
}

export const OTPWorkflow = ({ referral, actions }: Props) => {
  const [workflowState, setWorkflowState] = useState<WorkflowState>("getCode");
  const [email, setEmail] = useState("");

  const setEmailOnFormSubmit = (e: FormData) => {
    const email = e.get("email");
    if (!email) {
      throw new Error("Could not find email");
    }
    setEmail(email.toString());
    setWorkflowState("postCode");
  };

  if (workflowState === "getCode") {
    return (
      <EmailSignupForm
        onSubmit={setEmailOnFormSubmit}
        getOTPCode={actions.getOTPCode}
      />
    );
  } else {
    return (
      <ClientFormWrapper
        action={actions.loginWithOTPCode}
        onSuccess={() => redirect("/falling")}
      >
        <div>
          <input
            name="token"
            required
            placeholder="Check your email for your one time code!"
            className="w-full p-2"
          />
          <input name="email" value={email} hidden />
          {referral && <input name="referral" value={referral} hidden />}
        </div>
      </ClientFormWrapper>
    );
  }
};
