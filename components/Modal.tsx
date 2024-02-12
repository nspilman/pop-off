"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { sendTrackingEvent } from "./tracking";
import { EventType } from "@/types";
import { useEffect } from "react";

interface Props {
  buttonLabel: string;
  children: React.ReactNode;
  eventStrings: {
    open: EventType;
    close: EventType;
  };
}

export const Modal = ({ buttonLabel, eventStrings, children }: Props) => {
  const handleStateChange = (isOpen: boolean) => {
    sendTrackingEvent({
      type: isOpen ? eventStrings.open : eventStrings.close,
    });
  };
  return (
    <Dialog onOpenChange={handleStateChange}>
      <DialogTrigger asChild>
        <Button className="border p-2 w-full" variant="secondary">
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
