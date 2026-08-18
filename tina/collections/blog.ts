import type { Collection } from "tinacms";

export const BlogCollection: Collection = {
  name: "blog",
  label: "Blogs",
  path: "src/content/blog",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/blog/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
      description: "Post title. Shown in the blog list and at the top of the post.",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
      description: "Short summary used on the blog listing and in search results.",
    },
    {
      name: "pubDate",
      label: "Publication Date",
      type: "datetime",
      description: "Date the post is published. Posts are ordered by this date.",
    },
    {
      name: "updatedDate",
      label: "Updated Date",
      type: "datetime",
      description: "Optional. Date the post was last updated.",
    },
    {
      name: "heroImage",
      label: "Hero Image",
      type: "image",
      description: "Main image shown on the blog listing and at the top of the post.",
    },
    {
      name: "heroImageAlt",
      label: "Hero Image Alt Text",
      type: "string",
      description: "Descriptive text for the hero image, read by screen readers and search engines.",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      description: "The main content of the post.",
    },
  ],
}