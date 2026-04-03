import CTA from "../components/CTA";

export default function Page(props: any) {
  const blocks = props?.data?.page?.blocks || [];

  console.log("PAGE DATA:", props);
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