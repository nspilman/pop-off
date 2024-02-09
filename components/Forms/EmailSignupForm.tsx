import { sendSignInLinkToEmail } from "@/app/actions";
import { ClientFormWrapper } from "./ClientFormWrapper";

export const EmailSignupForm = ({ referral }: { referral?: string }) => {
  return (
    <ClientFormWrapper action={sendSignInLinkToEmail} buttonPosition="right">
      <div>
        <input
          className="max-w-lg flex-1 text-black border p-2 w-96"
          placeholder="Enter your email to access the pre-release"
          type="email"
          name="email"
          required
        />
        {referral && <input hidden name="referral" value={referral} />}
      </div>
    </ClientFormWrapper>
  );
};
