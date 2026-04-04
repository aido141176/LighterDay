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
      name: "hero",
      label: "Hero",
      fields: [
        { type: "string", name: "headline", label: "Headline" },
        { type: "string", name: "subtext", label: "Subtext" },
        { type: "string", name: "buttonText", label: "Button Text" },
        { type: "string", name: "buttonLink", label: "Button Link" }
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