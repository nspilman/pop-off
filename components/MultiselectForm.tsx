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
}

const MultiSelectForm = ({ sections, action }: Props) => {
  return (
    <>
      <form action={action} className="text-lg">
        <FormBody sections={sections} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

const FormBody = ({ sections }: Pick<Props, "sections">) => {
  const { pending } = useFormStatus();

  console.log({ pending });

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
