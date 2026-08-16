import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const contactBlock: Template = {
  name: "contact",
  label: "Contact",
  fields: [
    sectionBackgroundField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the contact details.",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Text",
      description: "Main contact message or introduction.",
      isBody: true,
    },
    {
      type: "string",
      name: "address",
      label: "Address",
      description: "Business address.",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "officeHours",
      label: "Office Hours",
      description: "Opening hours.",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "string",
      name: "phoneNumber",
      label: "Phone Number",
      description: "Business phone number.",
    },
  ],
};