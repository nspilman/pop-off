import HLSAudioPlayer from "@/components/HLSAudioPlayer";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SONG_ID } from "../constants";

export default async function Index() {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const { data: songInfo } = await supabaseClient
    .from("songs")
    .select("url")
    .filter("song_id", "eq", SONG_ID);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return redirect("/");
  }

  const url = songInfo?.[0].url;
  return (
    <div>
      <HLSAudioPlayer src={url} />
    </div>
  );
}
