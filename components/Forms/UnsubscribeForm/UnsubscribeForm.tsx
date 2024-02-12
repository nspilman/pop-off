"use client";
import { sendTrackingEvent } from "@/components/tracking";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const unsubscribe = async (onSuccess: any, formData: FormData) => {
  "use client";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("users")
    .select("email")
    .filter("user_id", "eq", user?.id);

  sendTrackingEvent({ type: "unsubscribe_final" });

  const { error: insertError } = await supabase.from("unsubscriptions").insert({
    email: data?.[0].email,
    unsubscription_reason: formData.get("reason") || "",
  });
  if ((await insertError) === null) {
    const { error } = await supabase.rpc("delete_user");
    onSuccess();
  }
};

export const UnsubscribeForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const onInitialClick = () => {
    sendTrackingEvent({ type: "unsubscribe_initial" });
    setIsClicked(true);
  };

  const router = useRouter();
  const action = unsubscribe.bind(null, () => router.push("/"));
  return isClicked ? (
    <form action={action}>
      <button className="text-xs" onClick={() => setIsClicked(false)}>
        x
      </button>{" "}
      <input name="reason" placeholder="Why tho?" className="text-xs"></input>
      <button className="text-xs">Confirm Unsubsribe</button>
    </form>
  ) : (
    <button onClick={onInitialClick} className="text-xs mt-1 text-gray-500">
      Unsubscribe
    </button>
  );
};
