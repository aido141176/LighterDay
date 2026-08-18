import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const galleryBlock: Template = {
  name: "gallery",
  label: "Gallery",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the gallery.",
    },
    {
      type: "image",
      name: "images",
      label: "Images",
      description: "Upload images to display in the gallery.",
      list: true,
    },
    {
      type: "string",
      name: "altText",
      label: "Alt Text (for all images)",
      description: "Descriptive text applied to every gallery image, read by screen readers and search engines.",
    },
  ],
};
