import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const fullTextBlock: Template = {
  name: "fullText",
  label: "Full Text",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Optional title displayed above the body text.",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      description: "Full-width rich text content.",
      isBody: true,
    },
  ],
};