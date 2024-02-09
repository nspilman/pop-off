"use client";
import { useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";
import { TOAST_REDIRECT_KEY } from "@/constants";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export const ToastQuerystringMonitor = () => {
  const params = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();
  const toastRedirectError = params.get(TOAST_REDIRECT_KEY);

  useEffect(() => {
    if (toastRedirectError?.length) {
      toast({
        description: toastRedirectError,
        variant: "destructive",
      });
      route.push(pathname);
    }
  }, [toastRedirectError]);

  return <></>;
};
