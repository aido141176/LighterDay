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
  type: "object",
  name: "seo",
  label: "SEO Settings",
  fields: [
    { 
      name: "title", 
      label: "Meta Title", 
      type: "string",
      description: "Overrides the page title for search results" 
    },
    { 
      name: "description", 
      label: "Meta Description", 
      type: "string", 
      ui: { component: "textarea" } 
    },
    { 
      name: "image", 
      label: "Social Share Image", 
      type: "image" 
    },
  ],
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