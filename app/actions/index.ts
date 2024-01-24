import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";
import { SONG_ID } from "../constants";

export async function sendSignInLinkToEmail(formData: FormData) {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const origin = headers().get("origin");

  const email = formData.get("email");

  const redirect = encodeURIComponent("/falling");

  const { error } = await supabaseClient.auth.signInWithOtp({
    email: email?.toString() || "",
    options: {
      emailRedirectTo: `${origin}/auth/callback?redirect=${redirect}`,
    },
  });
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

  console.log({ selected });
  const { error } = await supabaseClient
    .from("listener_feedback")
    .insert(selected);

  console.log({
    error,
    deleteError,
  });
}
