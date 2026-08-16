import type { Template } from "tinacms";
import { sectionBackgroundField, textAlignField, paddingField, maxWidthField } from "../fields";

export const faqBlock: Template = {
  name: "faq",
  label: "FAQ",
  fields: [
    sectionBackgroundField,
    textAlignField,
    paddingField,
    maxWidthField,
    {
      type: "string",
      name: "heading",
      label: "Heading",
      description: "Section title displayed above the FAQ items.",
    },
    {
      type: "object",
      name: "items",
      label: "FAQ Items",
      description: "Add questions and answers. Click 'Add' to create an item.",
      list: true,
      ui: {
        itemProps: (item: { question?: string } | undefined) => ({
          label: item?.question ? `FAQ: ${item.question}` : "New FAQ Item",
        }),
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Question",
          description: "The question to display.",
        },
        {
          type: "string",
          name: "answer",
          label: "Answer",
          description: "The answer to the question.",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
