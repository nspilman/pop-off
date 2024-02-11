"use client";

import { useToast } from "@/components/ui/use-toast";
import { SubmitButton } from "../SubmitButton";
import { FormEvent, useState } from "react";
import { FormReturn } from "@/types";

interface Props {
  children: React.ReactElement;
  action: (formData: FormData) => Promise<FormReturn>;
  disabled?: boolean;
  setDisabled?: (isDisabled: boolean) => void;
  submitButtonLabel?: string;
  buttonPosition?: "below" | "right";
}
export const ClientFormWrapper = ({
  children,
  action,
  disabled,
  setDisabled,
  submitButtonLabel,
  buttonPosition = "below",
}: Props) => {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setPending(true);
    const { status, message } = await action(formData);
    setPending(false);
    toast({
      title: status,
      description: message,
      variant: status === "Success" ? "default" : "destructive",
    });
    if (status === "Success") {
      setDisabled && setDisabled(true);
    }
  };

  const className =
    buttonPosition === "below"
      ? "flex-col"
      : "flex-col md:flex-row md:items-center";

  return (
    <form className={`space-y-4 flex ${className}`} onSubmit={handleSubmit}>
      {/* Thank you so much for your submission. */}
      {disabled && setDisabled && (
        <button type="button" onClick={() => setDisabled && setDisabled(false)}>
          Edit?{" "}
        </button>
      )}
      {children}
      <SubmitButton
        label={submitButtonLabel || "Submit"}
        disabled={disabled}
        pending={pending}
      />
    </form>
  );
};
