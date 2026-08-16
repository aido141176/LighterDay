import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const statsBlock: Template = {
  name: "stats",
  label: "Stats / Counters",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the stats.",
    },
    {
      type: "object",
      name: "items",
      label: "Stats",
      description: "Add statistics. Click 'Add' to create a stat.",
      list: true,
      ui: {
        itemProps: (item: { value?: string } | undefined) => ({
          label: item?.value ? `Stat: ${item.value}` : "New Stat",
        }),
      },
      fields: [
        {
          type: "string",
          name: "value",
          label: "Value",
          description: "The number or value, e.g. 500+.",
        },
        {
          type: "string",
          name: "label",
          label: "Label",
          description: "Short description under the value, e.g. Projects completed.",
        },
      ],
    },
  ],
};