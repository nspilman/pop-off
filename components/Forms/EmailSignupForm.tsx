import { sendSignInLinkToEmail } from "@/app/actions";
import { SubmitButton } from "./SubmitButton";

export const EmailSignupForm = ({
  error,
  referral,
}: {
  error?: string;
  referral?: string;
}) => {
  return (
    <form className="flex space-x-2 flex-col" action={sendSignInLinkToEmail}>
      <div>
        <input
          className="max-w-lg flex-1 text-black"
          placeholder="Enter your email"
          type="email"
          name="email"
        />
        {referral && <input hidden name="referral" value={referral} />}
        <SubmitButton label="Sign Up" />
      </div>
      <p className="text-red-500">{error}</p>
    </form>
  );
};
