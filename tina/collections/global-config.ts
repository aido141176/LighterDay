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
          label: "Your Name / Company Name (Used in the footer)",
          required: true,
          type: "string",
          description: "Name shown in the site footer.",
          ui: {
            defaultValue: "Your name here"
          },
        },
        {
          name: "image",
          label: "Social Share Image",
          type: "image",
          description: "Default image shown when any page of the site is shared on social media.",
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
    { name: "logo", label: "Site Logo", type: "image", description: "Logo shown in the navigation bar." },
    {
      name: "navPosition",
      label: "Menu Alignment",
      description: "Where the menu sits in the navigation bar.",
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
      description: "Background color of the navigation bar.",
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
      description: "Whether the navigation stays at the top when scrolling.",
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
                  itemProps: (item: { label?: string } | undefined) => ({ label: `Link: ${item?.label ?? ""}` }),
                },
                fields: [
                  { name: "label", label: "Label", type: "string", description: "Text shown in the menu." },
                  { name: "link", label: "Link", type: "string", description: "URL the menu item goes to." },
                ],
              },
              {
                name: "dropdown",
                label: "Dropdown Menu",
                ui: {
                  itemProps: (item: { label?: string } | undefined) => ({ label: `Dropdown: ${item?.label ?? ""}` }),
                },
                fields: [
                  { name: "label", label: "Parent Label", type: "string", description: "Text shown in the menu for the dropdown trigger." },
                  {
                    name: "subMenu",
                    label: "Sub Menu Items",
                    type: "object",
                    list: true,
                    ui: { itemProps: (item: { label?: string } | undefined) => ({ label: item?.label ?? "Item" }) },
                    fields: [
                      { name: "label", label: "Label", type: "string", description: "Text shown in the menu." },
                      { name: "link", label: "Link", type: "string", description: "URL the menu item goes to." },
                    ],
                  },
                ],
              },
              {
                name: "megaMenu",
                label: "Mega Menu",
                ui: {
                  itemProps: (item: { label?: string } | undefined) => ({ label: `Mega: ${item?.label ?? ""}` }),
                },
                fields: [
                  { name: "label", label: "Parent Label", type: "string", description: "Text shown in the menu for the mega menu trigger." },
                  {
                    name: "columns",
                    label: "Menu Columns",
                    type: "object",
                    list: true,
                    ui: { itemProps: (item: { title?: string } | undefined) => ({ label: item?.title ?? "Column" }) },
                    fields: [
                      { name: "title", label: "Column Title", type: "string", description: "Heading shown above the links in this column." },
                      {
                        name: "links",
                        label: "Links",
                        type: "object",
                        list: true,
                        ui: { itemProps: (item: { label?: string } | undefined) => ({ label: item?.label ?? "Link" }) },
                        fields: [
                          { name: "label", label: "Label", type: "string", description: "Text shown in the menu." },
                          { name: "link", label: "Link", type: "string", description: "URL the menu item goes to." }
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
          type: "string",
          description: "Text shown next to the icon."
        },
        {
          name: "link",
          label: "Link",
          type: "string",
          description: "URL the icon links to."
        },
        {
          name: "icon",
          label: "Icon",
          type: "string",
          description: "Pick an icon for the contact link.",
          ui: {
            component: IconComponent
          }
        }
      ],
    }

    // Add other config fields here...
  ]
}
