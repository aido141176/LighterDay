import type { Collection } from "tinacms";
import {
  ctaBlock,
  cardGridBlock,
  heroBlock,
  teamBlock,
  testimonialBlock,
  servicesBlock,
  galleryBlock,
  faqBlock,
  blogBlock,
  fullTextBlock,
  textWithImageBlock,
  heroCarouselBlock,
  contactBlock,
  contactFormBlock,
  statsBlock,
  logosBlock,
  pricingBlock,
  videoEmbedBlock,
  mapEmbedBlock,
  stepsBlock,
  customHtmlBlock,
  heroBasicBlock,
  heroSplitBlock,
} from "../blocks";

export const PageCollection: Collection = {
  name: "page",
  label: "Pages",
  path: "src/content/page",
  format: "mdx",
  ui: {
    router({ document }) {
      return document._sys.filename === "home" ? "/" : `/${document._sys.filename}/`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Page Title",
      isTitle: true,
      required: true,
      description: "Display name of the page. Shown in the CMS page list.",
    },
    {
      type: "object",
      name: "seo",
      label: "SEO Settings",
      fields: [
        {
          name: "title",
          label: "Meta Title",
          type: "string",
          description: "Overrides the page title for search results",
        },
        {
          name: "description",
          label: "Meta Description",
          type: "string",
          ui: { component: "textarea" },
          description: "Short summary shown under the title in search results.",
        },
        {
          name: "image",
          label: "Social Share Image",
          type: "image",
          description: "Image shown when the page is shared on social media.",
        },
      ],
    },
    {
      name: "blocks",
      label: "Page Sections",
      type: "object",
      list: true,
      templates: [heroBlock, ctaBlock, cardGridBlock, teamBlock, testimonialBlock, servicesBlock, galleryBlock, faqBlock, blogBlock, fullTextBlock, textWithImageBlock, heroCarouselBlock, contactBlock, contactFormBlock, statsBlock, logosBlock, pricingBlock, videoEmbedBlock, mapEmbedBlock, stepsBlock, customHtmlBlock, heroBasicBlock, heroSplitBlock],
    },
  ],
};