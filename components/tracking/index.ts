"use server";
import { EventType } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { pbkdf2Sync } from "crypto";
import { startOfDay } from "date-fns";

interface Props {
  type: EventType;
  payload?: Record<string, string | number>;
}
export const sendTrackingEvent = async ({ type, payload }: Props) => {
  function encryptString(
    stringToEncrypt: string,
    salt: string,
    iterations = 10000,
    keyLength = 24,
    digest = "RSA-SHA256"
  ) {
    // Ensure that the necessary parameters are provided
    if (!stringToEncrypt || !salt) {
      throw new Error("String to encrypt and salt are required.");
    }

    // Encrypt the string using PBKDF2
    const encryptedString = pbkdf2Sync(
      stringToEncrypt,
      salt,
      iterations,
      keyLength,
      digest
    ).toString("hex");

    return encryptedString;
  }
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { error } = await supabaseClient.from("events").insert({
    event_date: startOfDay(new Date()).toDateString(),
    hashed_user_id: user?.id
      ? encryptString(user.id, process.env.NEXT_PUBLIC_MARKETING_SALT || "")
      : "Anonymous",
    event_type: type,
    payload,
  });

};
