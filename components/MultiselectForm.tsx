"use client";
// MultiSelectForm.tsx
import React from "react";
import { useFormStatus } from "react-dom";

// Assuming choices is imported or defined here

interface Section {
  title: string;
  choices: { label: string; id: string; selected: boolean }[];
}

interface Props {
  sections: Section[];
  action: (formData: FormData) => void;
  alreadySubmitted: boolean;
}

const MultiSelectForm = ({ sections, action, alreadySubmitted }: Props) => {
  return (
    <>
      <form action={action} className="text-lg">
        <FormBody sections={sections} alreadySubmitted={alreadySubmitted} />
        <button type="submit" disabled={alreadySubmitted}>
          Submit
        </button>
      </form>
    </>
  );
};

const FormBody = ({
  sections,
  alreadySubmitted,
}: Pick<Props, "sections" | "alreadySubmitted">) => {
  return (
    <>
      {sections.map((section, index) => (
        <div>
          <h3 className="py-1 font-bold">{section.title}</h3>
          {section.choices.map((choice) => (
            <div>
              <input
                key={index}
                type="checkbox"
                id={choice.label}
                value={choice.id}
                name={choice.label}
                defaultChecked={choice.selected}
                disabled={alreadySubmitted}
              />
              <label htmlFor={choice.label} className="px-2">
                {choice.label}
              </label>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default MultiSelectForm;
