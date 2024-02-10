import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decodeToken } from "@/utils/generateShareLink";
import { TOAST_REDIRECT_KEY } from "@/constants";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the Auth Helpers package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirect = requestUrl.searchParams.get("redirect");
  const referral = requestUrl.searchParams.get("referral");
  try {
    if (code) {
      const cookieStore = cookies();
      const supabase = createClient(cookieStore);
      const {
        data: { user },
      } = await supabase.auth.exchangeCodeForSession(code);
      if (referral) {
        const referringUserId = decodeToken(referral);
        if (user?.id && referringUserId !== user.id) {
          const { data, error } = await supabase.from("referrals").insert({
            referring_user_id: referringUserId,
            referred_user: user.id,
          });
        }
      }
    }

    const successRedirect = process.env.NEXT_PUBLIC_BASE_URL + (redirect || "");
    // URL to redirect to after sign in process completes
    return NextResponse.redirect(successRedirect);
  } catch (e: any) {
    NextResponse.redirect(`/?${TOAST_REDIRECT_KEY}=${e.message}`);
  }
}
