import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function CTA({ block }: Props) {
  return (
    <section>
      <h2 data-tina-field={tinaField(block, "headline")}>
        {block.headline}
      </h2>

      <p data-tina-field={tinaField(block, "subtext")}>
        {block.subtext}
      </p>

      <a
        href={block.buttonLink}
        data-tina-field={tinaField(block, "buttonText")}
      >
        {block.buttonText}
      </a>
    </section>
  );
}