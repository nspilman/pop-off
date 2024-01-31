import MultiSelectForm from "@/components/MultiselectForm";
import { handleVolunteerFormSubmission } from "../actions";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SONG_ID } from "../constants";
import { redirect } from "next/navigation";

type OptionsReturn = {
  volunteer_option_id: string;
  description: string;
  category: string;
  default_selected: string;
};

export default async function Form() {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  if (!session) {
    return redirect("/");
  }

  const { data, error, status } = await supabaseClient.from("volunteer_options")
    .select(`
      volunteer_option_id,
      description,
      category,
      default_selected
  `);

  const { data: alreadySelected } = await supabaseClient
    .from("user_volunteer_activities")
    .select("volunteer_type_id")
    .filter("user_id", "eq", session.user.id);

  const { data: songInfo } = await supabaseClient
    .from("songs")
    .select("song_id")
    .filter("song_id", "eq", SONG_ID);

  const updatedActionWithSongId = handleVolunteerFormSubmission.bind(
    null,
    songInfo ? songInfo[0].song_id : ""
  );
  const formSections = (data as unknown as OptionsReturn[]).map(
    ({
      volunteer_option_id,
      description: optionDescription,
      category,
      default_selected,
    }) => {
      const selected =
        alreadySelected?.some(
          (val) => val.volunteer_type_id === volunteer_option_id
        ) || false;

      return {
        volunteer_option_id,
        optionDescription,
        category,
        default_selected: alreadySelected?.length
          ? selected
          : JSON.parse(default_selected),
      };
    }
  );

  interface CategoryChoices {
    [key: string]: { label: string; id: string; selected: boolean }[];
  }

  const groupedByCategory = formSections.reduce(
    (acc: CategoryChoices, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push({
        label: item.optionDescription,
        id: item.volunteer_option_id,
        selected: item.default_selected,
      });
      return acc;
    },
    {}
  );

  const sections = Object.entries(groupedByCategory).map(
    ([title, choices]) => ({
      title,
      choices: choices.toSorted((a, b) =>
        a.selected ? (b.selected ? 0 : -1) : 1
      ),
    })
  );

  // - Share this site with friends
  // 	- Listen to the song the whole way through on Spotify at least once on Launch Day.
  // 	- Listen to the song the whole way through at least once on launch Day
  // 	- Put the song on a Spotify playlist
  // 	- Put the song on an Apple Music playlist
  // 	- Share the song on Instagram
  // 	- Share the song on Twitter
  // 	- Share the song on Threads
  // 	- Use the song in a video on YouTube Shorts
  // 	- Use the song in a video on TikTok
  // 	- Use the song in a video on Instagram Reels

  return (
    <MultiSelectForm sections={sections} action={updatedActionWithSongId} />
  );
}
