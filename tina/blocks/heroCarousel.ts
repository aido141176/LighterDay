import type { Template } from "tinacms";
import { textAlignField, paddingField, maxWidthField } from "../fields";

export const heroCarouselBlock: Template = {
  name: "heroCarousel",
  label: "Hero with Carousel",
  fields: [
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "height",
      label: "Carousel Height",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "screen", label: "Full Screen" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "object",
      name: "items",
      label: "Slides",
      description: "Add slides. Click 'Add' to create a slide.",
      list: true,
      ui: {
        itemProps: (item: { title?: string } | undefined) => ({
          label: item?.title ? `Slide: ${item.title}` : "New Slide",
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          description: "Slide heading text.",
        },
        {
          type: "image",
          name: "image",
          label: "Image",
          description: "Full-width background image for the slide.",
        },
        {
          type: "string",
          name: "caption",
          label: "Caption",
          description: "Short caption displayed under the title.",
        },
      ],
    },
  ],
};