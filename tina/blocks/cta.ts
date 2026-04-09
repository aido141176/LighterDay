import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const ctaBlock: Template = {
  name: "cta",
  label: "CTA",
  fields: [
    sectionBackgroundField,
        {
        type: "string",
        name: "textAlign",
        label: "Text Alignment",
        options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
        ],
        ui: {
        component: "radio-group",
        },
    },
    {
      type: "string",
      name: "headline",
      label: "Headline",
    },
    {
        name: "subtext",
        label: "Subtext",
        type: "string",
    },
    {
        name: "buttonText",
        label: "Button Text",
        type: "string",
    },
    {
        name: "buttonLink",
        label: "Button Link",
        type: "string",
    },
    
  ],
};