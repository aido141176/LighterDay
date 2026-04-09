import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const cardGridBlock: Template = {
  name: "cardGridSection",
  label: "Card Grid Section",
  fields: [
    {
      type: "string",
      name: "heading",
      label: "Section title",
      description: "Optional. If empty the title will not display.",
    },
    {
      type: "string",
      name: "intro",
      label: "Intro text",
      description: "Optional short paragraph under the title.",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "columns",
      label: "Number of columns",
      description: "How many cards per row.",
      options: [
        { value: "2", label: "2 columns" },
        { value: "3", label: "3 columns" },
        { value: "4", label: "4 columns" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    sectionBackgroundField,
    {
      type: "string",
      name: "cardStyle",
      label: "Card look",
      description: "Visual style of cards.",
      options: [
        { value: "bordered", label: "Bordered" },
        { value: "filled", label: "Filled" },
        { value: "minimal", label: "Minimal" },
      ],
      ui: {
        component: "radio-group",
      },
    },
        {
      type: "string",
      name: "cardTitleAlignment",
      label: "Card title alignment",
      description: "Align card titles left or center.",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
      ],
      ui: { component: "radio-group" },
    },
    {
      type: "string",
      name: "cardTextAlignment",
      label: "Card text alignment",
      description: "Align card body text left or center.",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
      ],
      ui: { component: "radio-group" },
    },
    {
      type: "string",
      name: "cardButtonAlignment",
      label: "Card button alignment",
      description: "Align the card button inside each card.",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
      ui: { component: "radio-group" },
    },
    {
      type: "string",
      name: "cardImageSize",
      label: "Image size",
      description: "Size used for card images; 'full' will fill the card top area.",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
        { value: "full", label: "Full (cover top of card)" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "string",
      name: "buttonStyle",
      label: "Button look",
      description: "Appearance of card buttons.",
      options: [
        { value: "primary", label: "Primary button" },
        { value: "secondary", label: "Secondary button" },
        { value: "outline", label: "Outline button" },
        { value: "text", label: "Text link" },
      ],
      ui: {
        component: "radio-group",
      },
    },
        {
      type: "string",
      name: "hoverEffect",
      label: "Hover animation",
      description: "Add a small hover lift effect on cards (optional).",
      options: [
        { value: "on", label: "On" },
        { value: "off", label: "Off" },
      ],
      ui: {
        component: "radio-group",
      },
    },
        {
      type: "object",
      name: "cards",
      label: "Cards",
      description: "Add card items. Click 'Add' to create a card.",
      list: true,
      ui: {
        itemProps: (item: { title?: string } | undefined) => ({
          label: item?.title ? `Card: ${item.title}` : "New Card",
        }),
      },
      fields: [
        {
          type: "image",
          name: "image",
          label: "Card image",
          description: "Upload an image to display above the card text.",
        },
        {
          type: "string",
          name: "title",
          label: "Card title",
          description: "Card heading.",
        },
        {
          type: "string",
          name: "text",
          label: "Card text",
          description: "Short description for the card.",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "buttonText",
          label: "Button text",
          description: "Optional text for the CTA button.",
        },
        {
          type: "string",
          name: "buttonLink",
          label: "Button link",
          description: "Optional: URL that the button should link to.",
        },
      ],
    },


  ],
};