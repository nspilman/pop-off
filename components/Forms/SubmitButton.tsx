"use client";

import { LoadingSpinner } from "../LoadingSpinner";
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
      className={`border ${
        pending ? "text-gray-400" : "white"
      } p-2 w-full lg:w-40`}
      disabled={disabled}
      style={{ marginTop: "unset" }}
    >
      {!pending ? label : <LoadingSpinner />}
    </Button>
  );
};
