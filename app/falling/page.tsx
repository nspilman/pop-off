import HLSAudioPlayer from "@/components/HLSAudioPlayer";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return redirect("/");
  }
  return (
    <div>
      <HLSAudioPlayer
        src={"https://d3qxyro07qwbpl.cloudfront.net/falling/output.m3u8"}
      />
    </div>
  );
}
