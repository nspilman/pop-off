"use client";
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

  const { error: insertError } = await supabase.from("unsubscriptions").insert({
    email: data?.[0].email,
    unsubscription_reason: formData.get("reason") || "",
  });
  console.log({ insertError });
  if ((await insertError) === null) {
    const { error } = await supabase.rpc("delete_user");
    onSuccess();
  }
};

export const UnsubscribeForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const action = unsubscribe.bind(null, () => router.push("/"));
  return isClicked ? (
    <form action={action}>
      <input name="reason" placeholder="Why tho?"></input>
      <button>Confirm Unsubsribe</button>
    </form>
  ) : (
    <button onClick={() => setIsClicked(true)}>Unsubscribe</button>
  );
};
