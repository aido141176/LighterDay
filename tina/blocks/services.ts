import type { Template } from "tinacms";
import { sectionBackgroundField } from "../fields";

export const servicesBlock: Template = {
  name: "services",
  label: "Services",
  fields: [
    sectionBackgroundField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the services.",
    },
    {
      type: "object",
      name: "items",
      label: "Services",
      description: "Add service items. Click 'Add' to create a service.",
      list: true,
      ui: {
        itemProps: (item: { title?: string } | undefined) => ({
          label: item?.title ? `Service: ${item.title}` : "New Service",
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          description: "Name of the service.",
        },
        {
          type: "string",
          name: "description",
          label: "Description",
          description: "Short description of the service.",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "iconName",
          label: "Icon Name",
          description: "Icon identifier rendered with the service card.",
        },
      ],
    },
  ],
};
