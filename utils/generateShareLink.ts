import { createClient } from "./supabase/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const generateShareToken = async () => {
  "use server";
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);
  const secretKey = process.env.NEXT_PUBLIC_SHARE_LINK_SECRET;
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  const token = user?.id
    ? jwt.sign({ userId: user.id }, secretKey, { expiresIn: "30d" })
    : ""; // Expires in 30 days
  return token;
};

export function decodeToken(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_SHARE_LINK_SECRET
    );
    return decoded.userId;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return null;
  }
}
