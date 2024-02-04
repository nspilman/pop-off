import { getVolunteerFormOptions } from "./getVolunteerFormOptions";
import { handleVolunteerFormSubmission } from "@/app/actions";
import MultiSelectForm from "@/components/MultiselectForm";

interface Props {
  userId: string;
}

export const VolunteerOptionsForm = async ({ userId }: Props) => {
  const { sections, songInfo } = await getVolunteerFormOptions(userId);
  const updatedActionWithSongId = handleVolunteerFormSubmission.bind(
    null,
    songInfo ? songInfo[0].song_id : ""
  );

  return (
    <MultiSelectForm sections={sections} action={updatedActionWithSongId} />
  );
};
