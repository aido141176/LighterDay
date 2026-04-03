import CTA from "../components/CTA";

export default function Page(props: any) {
  const { blocks = [], seoTitle } = props;

  console.log("BLOCKS:", blocks);

  return (
    <div>
      <h1>{seoTitle}</h1>

      {blocks.map((block: any, index: number) => {
        switch (block.__typename) {
          case "PageBlocksCta":
            return <CTA key={index} {...block} />;
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