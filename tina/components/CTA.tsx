import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function CTA({ block }: Props) {
  return (
    <section className="mx-auto px-6 py-16 text-center shadow-sm">
      <h2
        className="text-4xl font-extrabold tracking-tight md:text-5xl"
        data-tina-field={tinaField(block, "headline")}
      >
        {block.headline}
      </h2>

      <p
        className="mx-auto mt-4 max-w-2xl text-lg leading-8"
        data-tina-field={tinaField(block, "subtext")}
      >
        {block.subtext}
      </p>

      <a
        href={block.buttonLink}
        className="mt-8 inline-flex items-center rounded-lg mybuttoncolor px-6 py-3 text-base font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        data-tina-field={tinaField(block, "buttonText")}
      >
        {block.buttonText}
      </a>
    </section>
  );
}