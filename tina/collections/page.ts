import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  fields: [
    {
      name: "seoTitle",
      label: "SEO Title",
      type: "string",
      required: true,
    },
    
    {
      name: "blocks",
      label: "Page Sections",
      type: "object",
      list: true,
      templates: [
{
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
    {
      type: "string",
      name: "sectionBackground",
      label: "Section background",
      description: "Background colour for this section.",
      options: [
        { value: "white", label: "White" },
        { value: "light", label: "Light Hue" },
        { value: "dark", label: "Dark" },
      ],
      ui: {
        component: "radio-group",
      },
    },
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

    // New alignment controls
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
        itemProps: (item) => ({
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
},        {
          name: "hero",
          label: "Hero",
          fields: [
            { type: "string", name: "headline", label: "Headline" },
            { type: "string", name: "subtext", label: "Subtext" },
            { type: "string", name: "buttonText", label: "Button Text" },
            { type: "string", name: "buttonLink", label: "Button Link" },
            {
              type: "string",
              name: "mediaType",
              label: "Media Type",
              options: [
                { value: "image", label: "Image" },
                { value: "videoUpload", label: "Video Upload" },
                { value: "videoUrl", label: "Video URL" },
              ],
              ui: {
                component: "radio-group",
              },
            },
            { type: "image", name: "heroImage", label: "Hero Image" },
            { type: "image", name: "heroVideo", label: "Hero Video Upload" },
            { type: "string", name: "heroVideoUrl", label: "Hero Video URL" },
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
              name: "overlayOpacity",
              label: "Overlay Opacity",
              options: [
                { value: "0", label: "0%" },
                { value: "10", label: "10%" },
                { value: "20", label: "20%" },
                { value: "30", label: "30%" },
                { value: "40", label: "40%" },
                { value: "50", label: "50%" },
                { value: "60", label: "60%" },
                { value: "70", label: "70%" },
              ],
              ui: {
                component: "radio-group",
              },
            },
            {
              type: "string",
              name: "height",
              label: "Hero Height",
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
          ],
        },
        {
          name: "cta",
          label: "CTA Section",
          fields: [
            {
              name: "headline",
              label: "Headline",
              type: "string",
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
        },
      ],
    },
  ],
};