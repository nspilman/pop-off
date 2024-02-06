"use client";
import { MultiSelectForm } from "@/components/MultiselectForm";
import { ClientWrapper } from "../ClientWrapper/ClientWrapper";
import { useState } from "react";
import { FormReturn } from "@/types";

interface Props {
  userAlreadySubmitted: boolean;
  hiddenFields: Record<string, string>;
  handleVolunteerFormSubmission: (formData: FormData) => FormReturn;
  sections: {
    title: string;
    choices: {
      label: string;
      id: string;
      selected: boolean;
    }[];
  }[];
}

export const VolunteerOptionsForm = ({
  handleVolunteerFormSubmission,
  userAlreadySubmitted,
  sections,
  hiddenFields,
}: Props) => {
  const [isDisabled, setIsDisbled] = useState(userAlreadySubmitted);
  return (
    <ClientWrapper
      action={handleVolunteerFormSubmission}
      disabled={isDisabled}
      setDisabled={setIsDisbled}
    >
      <MultiSelectForm
        sections={sections}
        disabled={isDisabled}
        hiddenFields={hiddenFields}
      />
    </ClientWrapper>
  );
};
