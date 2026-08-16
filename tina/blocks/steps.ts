import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const stepsBlock: Template = {
  name: "steps",
  label: "Steps / Timeline",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the steps.",
    },
    {
      type: "object",
      name: "items",
      label: "Steps",
      description: "Add steps in order. Click 'Add' to create a step.",
      list: true,
      ui: {
        itemProps: (item: { title?: string } | undefined) => ({
          label: item?.title ? `Step: ${item.title}` : "New Step",
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          description: "Short name of the step.",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          description: "Details of what happens in this step.",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};