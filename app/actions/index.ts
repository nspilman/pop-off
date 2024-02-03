import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
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
  const origin = headers().get("origin");

  const email = formData.get("email")?.toString();
  if (!email) {
    return showError(EMAIL_FORM_ERRORS.MISSING_EMAIL);
  }

  if (!isValidEmail(email)) {
    return showError(EMAIL_FORM_ERRORS.MALFORMATTED_EMAIL);
  }

  const redirectUrl = encodeURIComponent("/falling");
  const referral = formData.get("referral")?.toString();

  const { error } = await supabaseClient.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${
        process.env.NEXT_PUBLIC_BASE_URL
      }/auth/callback?redirect=${redirectUrl}${
        referral ? "&referral=" + referral : ""
      }`,
    },
  });
  if (error) {
    showError(error.message);
  }
  console.log({ error });
}

export async function handleVolunteerFormSubmission(
  songId: string,
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

  const selected = keys.map((key) => ({
    volunteer_type_id: formData.get(key),
    song_id: songId,
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

export async function submitListenerFeedback(formData: FormData) {
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

  const selected = {
    additional_feedback: formData.get("additional_feedback"),
    similar_artists_or_songs: formData.get("similar_artists_or_songs"),
    song_id: SONG_ID,
    user_id: userId,
  };

  const { error: deleteError } = await supabaseClient
    .from("listener_feedback")
    .delete()
    .filter("user_id", "eq", userId)
    .filter("song_id", "eq", SONG_ID);

  const { error } = await supabaseClient
    .from("listener_feedback")
    .insert(selected);

  console.log({
    error,
    deleteError,
  });
}
