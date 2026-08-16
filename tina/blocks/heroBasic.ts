import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const heroBasicBlock: Template = {
  name: "heroBasic",
  label: "Hero Basic",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "headline",
      label: "Headline",
    },
    {
      type: "string",
      name: "subtext",
      label: "Subtext",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "buttonText",
      label: "Button Text",
    },
    {
      type: "string",
      name: "buttonLink",
      label: "Button Link",
    },
  ],
};