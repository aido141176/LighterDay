import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const contactFormBlock: Template = {
  name: "contactForm",
  label: "Contact Form",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "title",
      label: "Title",
      description: "Heading displayed above the form.",
    },
    {
      type: "string",
      name: "text",
      label: "Text",
      description: "Short intro text displayed above the form.",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "recipientEmail",
      label: "Recipient Email",
      description: "Email address the form submissions should go to.",
    },
  ],
};