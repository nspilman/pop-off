import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { SONG_ID } from "../constants";
import { redirect } from "next/navigation";
import { EMAIL_FORM_ERRORS } from "@/constants";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

const showError = (errorMessage: string) => {
  redirect(`./?error=${errorMessage}`);
};

export async function sendSignInLinkToEmail(formData: FormData) {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const email = formData.get("email")?.toString();
  if (!email) {
    return showError(EMAIL_FORM_ERRORS.MISSING_EMAIL);
  }

  if (!isValidEmail(email)) {
    return showError(EMAIL_FORM_ERRORS.MALFORMATTED_EMAIL);
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
    showError(error.message);
  }
  console.log({ error });
}

export async function handleVolunteerFormSubmission(
  vars: { songId: string; userId: string },
  formData: FormData
) {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const keys = Array.from(formData.keys()).filter(
    (key) => !key.startsWith("$ACTION")
  );

  const { songId, userId } = vars;

  const selected = keys.map((key) => ({
    volunteer_type_id: JSON.parse(formData.get(key)?.toString() || "-1"),
    song_id: JSON.parse(songId),
    user_id: userId,
  }));

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
}

export async function submitListenerFeedback(
  initialState: any,
  formData: FormData
) {
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

  return "Success";
  console.log({
    error,
    deleteError,
    keys,
  });
}
