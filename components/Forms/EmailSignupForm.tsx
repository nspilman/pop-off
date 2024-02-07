import { sendSignInLinkToEmail } from "@/app/actions";
import { ClientFormWrapper } from "./ClientFormWrapper";

export const EmailSignupForm = ({ referral }: { referral?: string }) => {
  return (
    <ClientFormWrapper action={sendSignInLinkToEmail}>
      <div>
        <input
          className="max-w-lg flex-1 text-black"
          placeholder="Enter your email"
          type="email"
          name="email"
          required
        />
        {referral && <input hidden name="referral" value={referral} />}
      </div>
    </ClientFormWrapper>
  );
};
