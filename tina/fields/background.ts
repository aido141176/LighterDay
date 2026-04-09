
import type { TinaField } from "tinacms";

export const sectionBackgroundField: TinaField = {
  type: "string",
  name: "sectionBackground",
  label: "Section background",
  options: [
    { value: "white", label: "White" },
    { value: "light", label: "Light Hue" },
    { value: "dark", label: "Dark" },
  ],
  ui: {
    component: "radio-group",
  },
};