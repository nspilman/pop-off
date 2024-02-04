import { getVolunteerFormOptions } from "./getVolunteerFormOptions";
import { handleVolunteerFormSubmission } from "@/app/actions";
import MultiSelectForm from "@/components/MultiselectForm";

interface Props {
  userId: string;
}

export const VolunteerOptionsForm = async ({ userId }: Props) => {
  const { sections, songInfo, userAlreadySubmitted } =
    await getVolunteerFormOptions(userId);
  const updatedActionWithSongId = handleVolunteerFormSubmission.bind(null, {
    songId: songInfo ? songInfo[0].song_id : "",
    userId,
  });

  return (
    <MultiSelectForm
      sections={sections}
      action={updatedActionWithSongId}
      alreadySubmitted={userAlreadySubmitted}
    />
  );
};
