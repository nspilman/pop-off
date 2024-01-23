import MultiSelectForm from "@/components/MultiselectForm";
import { handleVolunteerFormSubmission } from "../actions";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { SONG_ID } from "../constants";
import { redirect } from "next/navigation";

type OptionsReturn = {
  volunteer_option_id: string;
  description: string;
  volunteer_option_to_category: {
    volunteer_category_id: string;
    volunteer_category: {
      description: string;
    };
  }[];
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
      volunteer_option_to_category (
          volunteer_category_id,
          volunteer_category (
              description
          )
      )
  `);

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
      volunteer_option_to_category,
    }) => {
      const { volunteer_category_id, volunteer_category } =
        volunteer_option_to_category[0];
      const { description: categoryTitle } = volunteer_category;
      return {
        volunteer_option_id,
        optionDescription,
        categoryTitle,
        volunteer_category_id,
      };
    }
  );

  interface CategoryChoices {
    [key: string]: { label: string; id: string }[];
  }

  const groupedByCategory = formSections.reduce(
    (acc: CategoryChoices, item) => {
      if (!acc[item.categoryTitle]) {
        acc[item.categoryTitle] = [];
      }
      acc[item.categoryTitle].push({
        label: item.optionDescription,
        id: item.volunteer_option_id,
      });
      return acc;
    },
    {}
  );

  const sections = Object.entries(groupedByCategory).map(
    ([title, choices]) => ({
      title,
      choices,
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
