import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const teamBlock: Template = {
  name: "team",
  label: "Team",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the team grid.",
    },
    {
      type: "object",
      name: "members",
      label: "Members",
      description: "Add team members. Click 'Add' to create a member.",
      list: true,
      ui: {
        itemProps: (item: { name?: string } | undefined) => ({
          label: item?.name ? `Member: ${item.name}` : "New Member",
        }),
      },
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
          description: "Full name of the team member.",
        },
        {
          type: "string",
          name: "role",
          label: "Role",
          description: "Job title or role of the team member.",
        },
        {
          type: "image",
          name: "avatarImage",
          label: "Avatar Image",
          description: "Portrait or avatar photo of the team member.",
        },
      ],
    },
  ],
};
