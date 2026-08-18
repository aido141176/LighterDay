import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const logosBlock: Template = {
  name: "logos",
  label: "Logos",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the logos, e.g. 'Trusted by'.",
    },
    {
      type: "image",
      name: "logos",
      label: "Logos",
      description: "Upload client or partner logos to display in a row.",
      list: true,
    },
    {
      type: "string",
      name: "altText",
      label: "Alt Text (for all logos)",
      description: "Descriptive text applied to every logo, read by screen readers and search engines.",
    },
  ],
};