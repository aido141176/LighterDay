import { useTina } from "tinacms/dist/react";
import CTA from "../components/CTA";
import type { PageQuery } from "../__generated__/types";

export default function Page(props: any) {
  const { data } = useTina(props) as { data: PageQuery };

  const blocks = data?.page?.blocks || [];

  console.log("BLOCKS:", blocks);

  return (
    <div>
      {blocks.map((block: any, i: number) => {
        switch (block._template) {
          case "cta":
            return <CTA key={i} {...block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}