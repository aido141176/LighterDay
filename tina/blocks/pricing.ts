import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const pricingBlock: Template = {
  name: "pricing",
  label: "Pricing Table",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the plans.",
    },
    {
      type: "object",
      name: "plans",
      label: "Plans",
      description: "Add pricing plans. Click 'Add' to create a plan.",
      list: true,
      ui: {
        itemProps: (item: { name?: string } | undefined) => ({
          label: item?.name ? `Plan: ${item.name}` : "New Plan",
        }),
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Plan name",
          description: "Name of the plan, e.g. Basic.",
        },
        {
          type: "string",
          name: "price",
          label: "Price",
          description: "Price text, e.g. $29/mo.",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          description: "Short line describing the plan.",
        },
        {
          type: "string",
          name: "features",
          label: "Features",
          description: "Add features included in the plan.",
          list: true,
        },
        {
          type: "string",
          name: "buttonText",
          label: "Button text",
          description: "Label for the plan button.",
        },
        {
          type: "string",
          name: "buttonLink",
          label: "Button link",
          description: "URL the plan button links to.",
        },
        {
          type: "boolean",
          name: "featured",
          label: "Featured plan",
          description: "Highlight this plan visually.",
        },
      ],
    },
  ],
};