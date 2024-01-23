// MultiSelectForm.tsx
import React from "react";

// Assuming choices is imported or defined here

interface Section {
  title: string;
  choices: { label: string; id: string }[];
}

interface Props {
  sections: Section[];
  action: (formData: FormData) => void;
}

const MultiSelectForm = ({ sections, action }: Props) => {
  return (
    <form action={action}>
      {sections.map((section, index) => (
        <div>
          <span>{section.title}</span>
          {section.choices.map((choice) => (
            <div>
              <input
                key={index}
                type="checkbox"
                id={choice.label}
                value={choice.id}
                name={choice.label}
              />
              <label htmlFor={choice.label}>{choice.label}</label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default MultiSelectForm;
