import { decodeToken } from "@/utils/generateShareLink";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, token, referral } = req.body;

  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  if (!email || !token) {
    return res.status(400).json({ error: "Email and token are required." });
  }
  try {
    // Call Supabase to verify the OTP
    const { data, error } = await supabaseClient.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) throw error;

    const { user } = data;

    // Optionally handle referral logic here
    if (referral) {
      const referringUserId = decodeToken(referral);
      if (user?.id && referringUserId !== user.id) {
        const { data, error } = await supabaseClient.from("referrals").insert({
          referring_user_id: referringUserId,
          referred_user: user.id,
        });
      }
    }

    // Respond with success message
    return NextResponse.redirect("/falling");
  } catch (error) {
    // Handle potential errors
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/?${TOAST_REDIRECT_KEY}=${
        "Invalid login token. code:" + code
      }`
    );
  }
}
