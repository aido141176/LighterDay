import type { Template } from "tinacms";
import { sectionBackgroundField, paddingField, maxWidthField } from "../fields";

export const ctaBlock: Template = {
  name: "cta",
  label: "CTA",
  fields: [
    sectionBackgroundField,
    {
      type: "string",
      name: "textAlign",
      label: "Text Alignment",
      description: "Where the CTA content sits within the section.",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "headline",
      label: "Headline",
      description: "Main call-to-action heading.",
    },
    {
      name: "subtext",
      label: "Subtext",
      type: "string",
      description: "Supporting line of text under the headline.",
    },
    {
      name: "buttonText",
      label: "Button Text",
      type: "string",
      description: "Label for the call-to-action button.",
    },
    {
      name: "buttonLink",
      label: "Button Link",
      type: "string",
      description: "URL the button links to.",
    },
  ],
};