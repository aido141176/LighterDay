export default function Page(props: any) {
  const blocks = props?.data?.page?.blocks || [];

  return (
    <>
      {blocks.map((block: any, i: number) => {
        switch (block.__typename) {
          case "PageBlocksCta":
            return <CTA key={i} {...block} />;
          default:
            return null;
        }
      })}
    </>
  );
}