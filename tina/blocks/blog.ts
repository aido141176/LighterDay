import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const blogBlock: Template = {
  name: "blog",
  label: "Blog",
  fields: [
    sectionBackgroundField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the recent posts.",
    },
    {
      type: "string",
      name: "columns",
      label: "Number of columns",
      description: "How many posts per row.",
      options: [
        { value: "2", label: "2 columns" },
        { value: "3", label: "3 columns" },
        { value: "4", label: "4 columns" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "string",
      name: "buttonText",
      label: "Button Text",
      description: "Label for the 'see all posts' link.",
    },
    {
      type: "string",
      name: "buttonLink",
      label: "Button Link",
      description: "URL for the 'see all posts' link. Defaults to /blog.",
    },
  ],
};