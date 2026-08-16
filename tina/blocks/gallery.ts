import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const galleryBlock: Template = {
  name: "gallery",
  label: "Gallery",
  fields: [
    sectionBackgroundField,
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
  ],
};
