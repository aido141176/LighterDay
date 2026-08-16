import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const mapEmbedBlock: Template = {
  name: "mapEmbed",
  label: "Map Embed",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the map.",
    },
    {
      type: "string",
      name: "mapUrl",
      label: "Map URL",
      description:
        "Google Maps embed URL. Use Share > Embed a map, or a /maps/embed?pb=... URL.",
    },
  ],
};