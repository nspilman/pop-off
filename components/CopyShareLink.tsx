"use client";

interface Props {
  link: string;
}
export const CopyShareLink = ({ link }: Props) => {
  const copyToClipboard = async (text: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${text}`;
    try {
      await navigator.clipboard.writeText(endpoint);
      alert(
        "Your unique share link is copied to your clipboard. When your friends access the site using your link, you'll get credit for the referral! The reward for now will be deep displays of us, but who knows, maybe we'll get stickers."
      );
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <button className="border p-2" onClick={() => copyToClipboard(link)}>
      Share this pre-release with friends
    </button>
  );
};
