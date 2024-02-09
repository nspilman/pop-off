"use client";
import React from "react";

// Assuming choices is imported or defined here

interface Section {
  title: string;
  choices: { label: string; id: string; selected: boolean }[];
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
    <>
      {Object.keys(hiddenFields).map((field) => (
        <input name={field} value={hiddenFields[field]} hidden key={field} />
      ))}
      {sections.map((section, index) => (
        <div key={index}>
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
    </>
  );
};
