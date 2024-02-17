import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { decodeToken } from "@/utils/generateShareLink";
import { TOAST_REDIRECT_KEY } from "@/constants";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const redirect = searchParams.get("redirect") ?? "/";
  const referral = searchParams.get("referral");
  const successRedirect = process.env.NEXT_PUBLIC_BASE_URL + (redirect || "");

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const {
      error,
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
    if (!error) {
      return NextResponse.redirect(successRedirect);
    }
    NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/?${TOAST_REDIRECT_KEY}=${error?.message}`
    );
  }
  NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/?${TOAST_REDIRECT_KEY}=${
      "Invalid login token. code:" + code
    }`
  );
  // return the user to an error page with instructions
}
