import { sendSignInLinkToEmail } from "@/app/actions";
import { ClientWrapper } from "./ClientWrapper/ClientWrapper";

export const EmailSignupForm = ({
  error,
  referral,
}: {
  error?: string;
  referral?: string;
}) => {
  return (
    <ClientWrapper action={sendSignInLinkToEmail}>
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
    </ClientWrapper>
  );
};
