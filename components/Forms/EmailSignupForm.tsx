import { sendSignInLinkToEmail } from "@/app/actions";
import { SubmitButton } from "./SubmitButton";

export const EmailSignupForm = ({ error }: { error?: string }) => {
  return (
    <form className="flex space-x-2 flex-col" action={sendSignInLinkToEmail}>
      <div>
        <input
          className="max-w-lg flex-1 text-black"
          placeholder="Enter your email"
          type="email"
          name="email"
        />
        <SubmitButton label="Sign Up" />
      </div>
      <p className="text-red-500">{error}</p>
    </form>
  );
};
