"use client";

import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "../SubmitButton";
import { FormEvent, useState } from "react";
import { FormReturn } from "@/types";
import { Button } from "@/components/ui/button";

type OnSuccess = (e: FormData) => void | (() => void);

interface Props {
  children: React.ReactElement;
  action: (formData: FormData) => Promise<FormReturn>;
  disabled?: boolean;
  disableForm?: () => void;
  submitButtonLabel?: string;
  buttonPosition?: "below" | "right";
  trackSubmission?: () => void;
  SubmittedView?: () => React.ReactElement;
  onSuccess?: OnSuccess;
  secondary?: {
    label: string;
    onClick: () => void;
  };
}
export const ClientFormWrapper = ({
  children,
  action,
  disabled,
  submitButtonLabel,
  buttonPosition = "below",
  trackSubmission,
  SubmittedView,
  onSuccess,
  secondary,
}: Props) => {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackSubmission?.();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setPending(true);
    const { status, message } = await action(formData);
    toast({
      title: status,
      description: message,
      variant: status === "Success" ? "default" : "destructive",
    });
    if (status === "Success") {
      console.log({ formData });
      onSuccess?.(formData);
    }
    setPending(false);
  };

  const className =
    buttonPosition === "below"
      ? "flex-col"
      : "flex-col  items-center md:items-start";

  return (
    <>
      {disabled ? (
        SubmittedView ? (
          <SubmittedView />
        ) : (
          <>Submitted!</>
        )
      ) : (
        <form className={`space-y-4 flex ${className}`} onSubmit={handleSubmit}>
          {/* Thank you so much for your submission. */}
          {children}
          <div>
            <SubmitButton
              label={submitButtonLabel || "Submit"}
              disabled={disabled}
              pending={pending}
            />
            {secondary && (
              <Button onClick={secondary.onClick} variant="ghost">
                {secondary.label}
              </Button>
            )}
          </div>
        </form>
      )}
    </>
  );
};
