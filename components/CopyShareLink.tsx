"use client";

interface Props {
  link: string;
}
export const CopyShareLink = ({ link }: Props) => {
  const copyToClipboard = async (text: string) => {
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/?referral=${text}`;
    try {
      await navigator.clipboard.writeText(endpoint);
      alert("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return <button onClick={() => copyToClipboard(link)}>Copy Share Link</button>;
};
