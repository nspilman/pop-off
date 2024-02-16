import { sendSignInLinkToEmail } from "@/app/actions";
import { ClientFormWrapper } from "./ClientFormWrapper";

export const EmailSignupForm = ({ referral }: { referral?: string }) => {
  return (
    <ClientFormWrapper
      action={sendSignInLinkToEmail}
      buttonPosition="right"
      submitButtonLabel="Get Your Access Link"
    >
      <>
        <input
          className="max-w-lg flex-1 text-black border-bottom borderrounded border-black p-2 w-full lg:mr-2 shadow lg:w-72"
          placeholder="Enter your email for the whole song"
          type="email"
          name="email"
          required
        />
        {referral && <input hidden name="referral" value={referral} />}
      </>
    </ClientFormWrapper>
  );
};
