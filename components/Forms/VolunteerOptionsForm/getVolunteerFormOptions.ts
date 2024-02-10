import { cookies } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import { SONG_ID } from "@/app/constants";

type OptionsReturn = {
  volunteer_option_id: number;
  description: string;
  category: string;
  default_selected: string;
};

export const getVolunteerFormOptions = async (userId: string) => {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

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
    .filter("user_id", "eq", userId);

  const { data: songInfo } = await supabaseClient
    .from("songs")
    .select("song_id")
    .filter("song_id", "eq", SONG_ID);

  const formSections = (data as unknown as OptionsReturn[]).map(
    ({
      volunteer_option_id,
      description: optionDescription,
      category,
      default_selected,
    }) => {
      const selected =
        alreadySelected?.some(
          (val) => val?.volunteer_type_id === volunteer_option_id
        ) || false;

      return {
        volunteer_option_id,
        optionDescription,
        category,
        alreadySelected,
        default_selected: alreadySelected?.length
          ? selected
          : JSON.parse(default_selected),
      };
    }
  );

  const userAlreadySubmitted = formSections.some(
    (section) => section.alreadySelected?.length
  );

  interface CategoryChoices {
    [key: string]: {
      label: string;
      id: number;
      selected: boolean;
    }[];
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

  return { sections, songInfo, userAlreadySubmitted };
};
