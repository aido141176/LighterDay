import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const videoEmbedBlock: Template = {
  name: "videoEmbed",
  label: "Video Embed",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the video.",
    },
    {
      type: "string",
      name: "videoUrl",
      label: "Video URL",
      description: "YouTube or Vimeo video URL, e.g. https://www.youtube.com/watch?v=...",
    },
  ],
};