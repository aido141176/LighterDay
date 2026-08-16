import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const textWithImageBlock: Template = {
  name: "textWithImage",
  label: "Text with Image",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the rows.",
    },
    {
      type: "string",
      name: "imageSide",
      label: "Image position",
      description: "Which side of each row the image sits on.",
      options: [
        { value: "left", label: "Image left" },
        { value: "right", label: "Image right" },
        { value: "alternate", label: "Alternate" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "object",
      name: "items",
      label: "Items",
      description: "Add image + text rows. Click 'Add' to create an item.",
      list: true,
      ui: {
        itemProps: (item: { image?: string } | undefined) => ({
          label: item?.image ? `Item: ${item.image}` : "New Item",
        }),
      },
      fields: [
        {
          type: "image",
          name: "image",
          label: "Image",
          description: "Image fills 50% of the row.",
        },
        {
          type: "rich-text",
          name: "body",
          label: "Text",
          description: "Rich text fills the other 50% of the row.",
        },
      ],
    },
  ],
};