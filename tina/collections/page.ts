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