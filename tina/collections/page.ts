import type { Collection } from "tinacms";
import { ctaBlock, cardGridBlock, heroBlock } from "../blocks";

//import { sectionBackgroundField } from "../fields";

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
      templates: [heroBlock, ctaBlock, cardGridBlock]
    },
  ],
};