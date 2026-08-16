import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const testimonialBlock: Template = {
  name: "testimonial",
  label: "Testimonial",
  fields: [
    sectionBackgroundField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the testimonials.",
    },
    {
      type: "object",
      name: "quotes",
      label: "Quotes",
      description: "Add customer testimonials. Click 'Add' to create a quote.",
      list: true,
      ui: {
        itemProps: (item: { author?: string } | undefined) => ({
          label: item?.author ? `Quote: ${item.author}` : "New Quote",
        }),
      },
      fields: [
        {
          type: "string",
          name: "quote",
          label: "Quote",
          description: "The testimonial text.",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "author",
          label: "Author",
          description: "Name of the person giving the testimonial.",
        },
        {
          type: "string",
          name: "company",
          label: "Company",
          description: "Company or organization of the author.",
        },
      ],
    },
  ],
};
