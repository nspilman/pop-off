import { cookies } from "next/headers";
import { getVolunteerFormOptions } from "./getVolunteerFormOptions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { handleVolunteerFormSubmission } from "@/app/actions";
import MultiSelectForm from "@/components/MultiselectForm";

export const VolunteerOptionsForm = async () => {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return redirect("/");
  }

  const { sections, songInfo } = await getVolunteerFormOptions(session.user.id);
  const updatedActionWithSongId = handleVolunteerFormSubmission.bind(
    null,
    songInfo ? songInfo[0].song_id : ""
  );

  return (
    <MultiSelectForm sections={sections} action={updatedActionWithSongId} />
  );
};
