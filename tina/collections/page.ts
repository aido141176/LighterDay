export const PageCollection = {
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
          name: "cta",
          label: "CTA Section",
          fields: [
            { name: "headline", type: "string", label: "Headline" },
            { name: "subtext", type: "string", label: "Subtext" },
            { name: "buttonText", type: "string", label: "Button Text" },
            { name: "buttonLink", type: "string", label: "Button Link" },
          ],
        },
      ],
    },
  ],
};