import { tinaField } from "tinacms/dist/react";
import CTA from "../components/CTA";
import Hero from "../components/Hero";

type Props = {
  page: any;
};

export default function Page({ page }: Props) {
  const seoTitle = page?.seoTitle;
  const blocks = page?.blocks ?? [];

  return (
    <main className="">
      <div className="space-y-16">
        {blocks.map((block: any, index: number) => {
          switch (block.__typename) {
            case "PageBlocksHero":
              return (
                <div key={index} data-tina-field={tinaField(page, "blocks")}>
                  <Hero block={block} />
                </div>
              );

            case "PageBlocksCta":
              return (
                <div key={index} data-tina-field={tinaField(page, "blocks")}>
                  <CTA block={block} />
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </main>
  );
}