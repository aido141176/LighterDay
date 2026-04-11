import type { Collection } from "tinacms";
import IconComponent from "../components/IconComponent";

export const GlobalConfigCollection: Collection = {
  name: "config",
  label: "Global Config",
  path: "src/content/config",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      name: "seo",
      label: "General site config",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Site title for SEO",
          type: "string",
          required: true,
        },
        {
          name: "description",
          label: "Site description for SEO",
          type: "string",
          required: true,
        },
        {
          name: "siteOwner",
          label: "Your Name, Company Name (Used in the footer",
          required: true,
          type: "string",
          ui: {
            defaultValue: "Your name here"
          },
        },
        // Add more settings here...
      ],
    },
    // tina/collections/global-config.ts
{
  name: "navigationSettings",
  label: "Navigation Styles & Layout",
  type: "object",
  fields: [
    { name: "logo", label: "Site Logo", type: "image" },
    {
      name: "navPosition",
      label: "Menu Alignment",
      type: "string",
      options: [
        { label: "Left (Next to Logo)", value: "justify-start" },
        { label: "Right (Next to Socials)", value: "justify-end" },
        { label: "Center", value: "justify-center" },
      ],
    },
    {
      name: "backgroundStyle",
      label: "Background Color",
      type: "string",
      options: [
        { label: "White", value: "bg-white text-gray-800" },
        { label: "Light", value: "mylight text-gray-800" },
        { label: "Dark", value: "mydark text-white" },
        { label: "Transparent", value: "bg-transparent" },
      ],
    },
    {
      name: "sticky",
      label: "Navigation Behavior",
      type: "string",
      options: [
        { label: "Relative (Scrolls away)", value: "relative" },
        { label: "Fixed (Stays at top)", value: "fixed top-0 left-0 w-full z-50" },
      ],
    },
  ],
},

    {
      name: "nav",
      label: "Site Navigation Menu (Reorder, Add, Remove)",
      type: "object",
      list: true,
 
            templates: [
              {
                name: "simpleLink",
                label: "Simple Link",
                ui: {
                  itemProps: (item) => ({ label: `Link: ${item?.label}` }),
                },
                fields: [
                  { name: "label", label: "Label", type: "string" },
                  { name: "link", label: "Link", type: "string" },
                ],
              },
              {
                name: "dropdown",
                label: "Dropdown Menu",
                ui: {
                  itemProps: (item) => ({ label: `Dropdown: ${item?.label}` }),
                },
                fields: [
                  { name: "label", label: "Parent Label", type: "string" },
                  {
                    name: "subMenu",
                    label: "Sub Menu Items",
                    type: "object",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { name: "label", label: "Label", type: "string" },
                      { name: "link", label: "Link", type: "string" },
                    ],
                  },
                ],
              },
              {
                name: "megaMenu",
                label: "Mega Menu",
                ui: {
                  itemProps: (item) => ({ label: `Mega: ${item?.label}` }),
                },
                fields: [
                  { name: "label", label: "Parent Label", type: "string" },
                  {
                    name: "columns",
                    label: "Menu Columns",
                    type: "object",
                    list: true,
                    fields: [
                      { name: "title", label: "Column Title", type: "string" },
                      { 
                        name: "links", 
                        label: "Links", 
                        type: "object", 
                        list: true, 
                        fields: [
                          { name: "label", label: "Label", type: "string" },
                          { name: "link", label: "Link", type: "string" }
                        ] 
                      },
                    ],
                  },
                ],
              },
            ],
    },
    {
      name: "contactLinks",
      label: "Contact Links",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item.title
          }
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string"
        },
        {
          name: "link",
          label: "Link",
          type: "string"
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          ui: {
            //@ts-ignore
            component: IconComponent
          }
        }
      ],
    }

    // Add other config fields here...
  ]
}
