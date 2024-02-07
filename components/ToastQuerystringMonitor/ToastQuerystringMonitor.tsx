"use client";
import { useSearchParams } from "next/navigation";
import { toast } from "../ui/use-toast";
import { TOAST_REDIRECT_KEY } from "@/constants";
import { useRouter, usePathname } from "next/navigation";

export const ToastQuerystringMonitor = () => {
  const params = useSearchParams();
  const route = useRouter();
  const pathname = usePathname();
  const toastRedirectError = params.get(TOAST_REDIRECT_KEY);
  if (toastRedirectError?.length) {
    toast({
      description: toastRedirectError,
      variant: "destructive",
    });
    route.push(pathname);
  }

  return <></>;
};
