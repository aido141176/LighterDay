import type { Template } from "tinacms";
import { paddingField, maxWidthField } from "../fields";

export const customHtmlBlock: Template = {
  name: "customHtml",
  label: "Custom HTML",
  fields: [
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "html",
      label: "HTML",
      description:
        "Raw HTML rendered as-is. Escape hatch for any design the other sections cannot express.",
      ui: {
        component: "textarea",
      },
    },
  ],
};