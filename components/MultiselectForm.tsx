"use client";
import React from "react";

// Assuming choices is imported or defined here

interface Section {
  title: string;
  choices: { label: string; id: number; selected: boolean }[];
}

interface Props {
  sections: Section[];
  disabled: boolean;
  hiddenFields: Record<string, string>;
}

export const MultiSelectForm = ({
  sections,
  disabled,
  hiddenFields,
}: Props) => {
  return (
    <FormBody
      key={JSON.stringify(sections)}
      sections={sections}
      disabled={disabled}
      hiddenFields={hiddenFields}
    />
  );
};

const FormBody = ({
  sections,
  disabled,
  hiddenFields,
}: Pick<Props, "sections" | "disabled" | "hiddenFields">) => {
  return (
    <div>
      <h2 className="text-xl font-bold">
        Thank you for volunteering to help leading up to and on release weekend!
      </h2>
      <p className="py-1">
        We've filled out a few "default" items for you, but please select or
        deselect anything and everything.
      </p>
      <div className="flex flex-col items-start w-full text-left">
        {Object.keys(hiddenFields).map((field) => (
          <input name={field} value={hiddenFields[field]} hidden key={field} />
        ))}
        {sections.map((section, index) => (
          <div key={index} className="items-start w-full text-left py-2">
            <h3 className="py-1 font-bold">{section.title}</h3>
            {section.choices.map((choice, j) => (
              <div>
                <input
                  key={j}
                  type="checkbox"
                  id={choice.label}
                  value={choice.id}
                  name={choice.label}
                  defaultChecked={choice.selected}
                  disabled={disabled}
                />
                <label htmlFor={choice.label} className="px-2">
                  {choice.label}
                </label>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
