import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const bookingFormBlock: Template = {
  name: "bookingForm",
  label: "Booking Form",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "title",
      label: "Title",
      description: "Heading displayed above the booking form.",
    },
    {
      type: "string",
      name: "text",
      label: "Text",
      description: "Short intro text displayed above the booking form.",
      ui: {
        component: "textarea",
      },
    },
  ],
};
