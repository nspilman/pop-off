import { cookies } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import { SONG_ID } from "@/app/constants";

type MarketResearchField = {
  id: string;
  label: string;
  placeholder: string;
  input_type: string;
  order: number;
};

export const getAdditionalFeedbackFormOptions = async (userId: string) => {
  const cookieStore = cookies();
  const supabaseClient = await createClient(cookieStore);

  const { data, error, status } = await supabaseClient
    .from("market_research_fields")
    .select();

  const { data: alreadySelected } = await supabaseClient
    .from("market_research_responses")
    .select("field_id, response_value")
    .filter("user_id", "eq", userId);

  const { data: songInfo } = await supabaseClient
    .from("songs")
    .select("song_id")
    .filter("song_id", "eq", SONG_ID);

  const formSections = (data as unknown as MarketResearchField[]).map(
    ({ id, label, placeholder, order }) => {
      const existingValue =
        alreadySelected?.find((val) => val.field_id === id)?.response_value ||
        "";

      return {
        id,
        label,
        placeholder,
        order,
        defaultValue: existingValue,
      };
    }
  );

  return { formSections, songInfo };
};
