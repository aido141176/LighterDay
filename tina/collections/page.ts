import type { Collection } from "tinacms";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      name: "seoTitle",
      type: "string",
      required: true
    },
    {
      name: "body",
      type: "rich-text",
      isBody: true,
      required: true
    },
        {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      templates: [
        {
          name: "cta",
          label: "CTA Section",
          fields: [
            {
              type: "string",
              name: "heading",
              label: "Heading",
            },
            {
              type: "string",
              name: "subheading",
              label: "Subheading",
            },
            {
              type: "string",
              name: "buttonText",
              label: "Button Text",
            },
          ],
        },
      ],
    },
  ]
}
