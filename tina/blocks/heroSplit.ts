import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const heroSplitBlock: Template = {
  name: "heroSplit",
  label: "Hero Split",
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
    {
      type: "image",
      name: "image",
      label: "Image",
      description: "Image displayed on the right half of the hero.",
    },
  ],
};