import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { SONG_ID } from "../constants";
import { EMAIL_FORM_ERRORS } from "@/constants";
import { FormReturn } from "@/types";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export async function sendSignInLinkToEmail(formData: FormData): FormReturn {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const email = formData.get("email")?.toString();
  if (!email) {
    return {
      status: "Error",
      message: EMAIL_FORM_ERRORS.MISSING_EMAIL,
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "Error",
      message: EMAIL_FORM_ERRORS.MALFORMATTED_EMAIL,
    };
  }

  const redirectUrl = encodeURIComponent("/falling");
  const referral = formData.get("referral")?.toString();

  const emailRedirectTo = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/auth/callback?redirect=${redirectUrl}${
    referral ? "&referral=" + referral : ""
  }`;

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo,
    },
  });
  if (error) {
    return { status: "Error", message: "ERROR!!!" };
  }
  return {
    status: "Success",
    message: "Check your email for your login link!",
  };
}

export async function handleVolunteerFormSubmission(
  formData: FormData
): FormReturn {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const keys = Array.from(formData.keys()).filter(
    (key) => !key.startsWith("$ACTION")
  );

  const userId = formData.get("userId")?.toString();
  const songId = formData.get("songId")?.toString();

  if (!userId || !songId) {
    throw new Error("userId or songId missing");
  }

  const selected = keys
    .filter((key) => !["userId", "songId"].includes(key))
    .map((key) => {
      const volunteer_type_id = JSON.parse(
        formData.get(key)?.toString() || "-1"
      );
      return {
        volunteer_type_id: volunteer_type_id,
        song_id: JSON.parse(songId),
        user_id: userId,
      };
    });

  const { error: deleteError } = await supabaseClient
    .from("user_volunteer_activities")
    .delete()
    .filter("user_id", "eq", userId)
    .filter("song_id", "eq", songId);

  const { error } = await supabaseClient
    .from("user_volunteer_activities")
    .insert(selected);

  console.log({
    error,
    deleteError,
  });
  if (!error) {
    return { status: "Success", message: "you did it!" };
  }
  return {
    status: "Error",
    message:
      "Well, darn. That didn't work... we still would love your help and appreciate whatever you said you'd do!!",
  };
}

export async function submitListenerFeedback(formData: FormData): FormReturn {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  const keys = Array.from(formData.keys()).filter(
    (key) => !key.startsWith("$ACTION")
  );

  const userId = session?.user.id || "";

  const payload = keys.map((fieldId) => ({
    field_id: JSON.parse(fieldId),
    response_value: formData.get(fieldId)?.toString() || "",
    user_id: userId,
    song_id: SONG_ID,
  }));

  const { error: deleteError } = await supabaseClient
    .from("market_research_responses")
    .delete()
    .filter("user_id", "eq", userId)
    .filter("song_id", "eq", SONG_ID);

  const { error } = await supabaseClient
    .from("market_research_responses")
    .insert(payload);
  console.log({
    error,
    deleteError,
    keys,
  });

  if (error || deleteError) {
    return { status: "Error", message: "failed" };
  }

  return { status: "Success", message: "You did it!" };
}
