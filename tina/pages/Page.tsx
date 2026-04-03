import { tinaField } from "tinacms/dist/react";
import CTA from "../components/CTA";

type Props = {
  page: any;
};

export default function Page({ page }: Props) {
  const seoTitle = page?.seoTitle;
  const blocks = page?.blocks ?? [];

  console.log("BLOCKS:", blocks);

  return (
    <div>
      <h1 data-tina-field={tinaField(page, "seoTitle")}>{seoTitle}</h1>

      {blocks.map((block: any, index: number) => {
        switch (block.__typename) {
          case "PageBlocksCta":
            return (
              <div key={index} data-tina-field={tinaField(page, "blocks")}>
                <CTA block={block} />
              </div>
            );
          default:
            return (
              <pre key={index}>
                {JSON.stringify(block, null, 2)}
              </pre>
            );
        }
      })}
    </div>
  );
}