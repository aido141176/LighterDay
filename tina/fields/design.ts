import type { TinaField } from "tinacms";

export const textAlignField: TinaField = {
  type: "string",
  name: "textAlign",
  label: "Text alignment",
  description: "Horizontal alignment of the section content.",
  options: [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
  ],
  ui: {
    component: "radio-group",
  },
};

export const paddingField: TinaField = {
  type: "string",
  name: "padding",
  label: "Section padding",
  description: "Vertical padding above and below the section.",
  options: [
    { value: "none", label: "None" },
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
  ],
  ui: {
    component: "radio-group",
  },
};

export const maxWidthField: TinaField = {
  type: "string",
  name: "maxWidth",
  label: "Content width",
  description: "Maximum width of the content container.",
  options: [
    { value: "narrow", label: "Narrow" },
    { value: "wide", label: "Wide" },
    { value: "full", label: "Full" },
  ],
  ui: {
    component: "radio-group",
  },
};