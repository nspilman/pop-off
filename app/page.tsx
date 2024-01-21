import { createClient } from "@/utils/supabase/server";
import { cookies, headers } from "next/headers";

export default async function Index() {
  async function sendSignInLinkToEmail(formData: FormData) {
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

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>
        <form action={sendSignInLinkToEmail}>
          <input name="email" type="email" />
          <button type="submit">submit</button>
        </form>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        Footer
      </footer>
    </div>
  );
}
