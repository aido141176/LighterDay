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
      description: "Optional. If left empty the title will not display (no toggle needed). Example: Our Services",
    },
    {
      type: "string",
      name: "intro",
      label: "Intro text",
      description: "Optional short paragraph under the title. Leave empty if none.",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "columns",
      label: "Number of columns",
      description: "Choose how many cards appear per row.",
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
      description: "Choose the background colour for this section.",
      options: [
        { value: "white", label: "White" },
        { value: "light", label: "Light grey" },
        { value: "dark", label: "Dark" },
        { value: "primary", label: "Primary colour" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "string",
      name: "cardStyle",
      label: "Card look",
      description: "Choose how the cards should look (bordered / filled / minimal).",
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
      name: "cardImageSize",
      label: "Image size",
      description: "Select size used for card images.",
      options: [
        { value: "small", label: "Small" },
        { value: "medium", label: "Medium" },
        { value: "large", label: "Large" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "string",
      name: "buttonStyle",
      label: "Button look",
      description: "Choose the button appearance for all cards in this section.",
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
      description: "Add one card item per card you want to display. Click 'Add' to create cards.",
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
          description: "Main heading for the card.",
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
          description: "Optional. Leave blank for no button.",
        },
        {
          type: "string",
          name: "buttonLink",
          label: "Button link",
          description: "Optional. Destination URL for the button.",
        },
      ],
    },
  ],
},
        {
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