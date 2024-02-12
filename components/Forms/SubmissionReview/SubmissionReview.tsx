/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ig8gWfYP7Tc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  title: string;
  label: string;
  sections?: {
    label: string;
    values: string[];
  }[];
  enableForm: () => void;
}

export default function SubmissionReview({
  title,
  label,
  sections,
  enableForm,
}: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-8 overflow-scroll max-h-[80vh]">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{label}</p>
      </div>
      <div className="space-y-6">
        {sections?.map(({ label, values }) => (
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xl">
              {label}
            </Label>
            {values.map((value) => (
              <ul className="text-xs" id="name">
                <li>{value}</li>
              </ul>
            ))}
          </div>
        ))}
      </div>
      <Button onClick={() => enableForm()}>Update your response</Button>
    </div>
  );
}
