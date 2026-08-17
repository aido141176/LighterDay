import type { Template } from "tinacms";
import { paddingField, maxWidthField } from "../fields";

export const heroBlock: Template = {
  name: "hero",
  label: "Hero",
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Headline",
      description: "Main heading shown on the hero.",
    },
    {
      type: "string",
      name: "subtext",
      label: "Subtext",
      description: "Supporting line of text under the headline.",
    },
    {
      type: "string",
      name: "buttonText",
      label: "Button Text",
      description: "Label for the call-to-action button.",
    },
    {
      type: "string",
      name: "buttonLink",
      label: "Button Link",
      description: "URL the button links to.",
    },
    {
      type: "string",
      name: "mediaType",
      label: "Media Type",
      description: "Choose what appears behind the hero text.",
      options: [
        { value: "image", label: "Image" },
        { value: "videoUpload", label: "Video Upload" },
        { value: "videoUrl", label: "Video URL" },
      ],
      ui: {
        component: "radio-group",
      },
    },
    {
      type: "image",
      name: "heroImage",
      label: "Hero Image",
      description: "Used when Media Type is Image.",
    },
    {
      type: "image",
      name: "heroVideo",
      label: "Hero Video Upload",
      description: "Uploaded video file, used when Media Type is Video Upload.",
    },
    {
      type: "string",
      name: "heroVideoUrl",
      label: "Hero Video URL",
      description: "Link to an mp4 video, used when Media Type is Video URL.",
    },
    {
      type: "string",
      name: "textAlign",
      label: "Text Alignment",
      description: "Where the hero text sits within the hero.",
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
      description: "How dark the overlay over the media is.",
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
      description: "How tall the hero section is.",
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
    paddingField,
    maxWidthField,
  ],
};