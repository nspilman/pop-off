import { sendSignInLinkToEmail } from "./actions";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div>
        <form action={sendSignInLinkToEmail}>
          <input name="email" type="email" />
          <button type="submit">submit</button>
        </form>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        Footer
      </footer>
    </div>
  );
}
