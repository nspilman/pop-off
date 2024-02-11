"use client";

import { Button } from "../ui/button";

export const SubmitButton = ({
  label,
  disabled = false,
  pending = false,
}: {
  label: string;
  disabled?: boolean;
  pending?: boolean;
}) => {
  return (
    <Button
      type="submit"
      className={`border ${pending ? "text-gray-400" : "white"} p-2`}
      disabled={disabled}
      style={{ marginTop: "unset" }}
    >
      {!pending ? label : "loading"}
    </Button>
  );
};
