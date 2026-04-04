import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function Hero({ block }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1
        className="text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl"
        data-tina-field={tinaField(block, "headline")}
      >
        {block.headline}
      </h1>

      <p
        className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600"
        data-tina-field={tinaField(block, "subtext")}
      >
        {block.subtext}
      </p>

      <a
        href={block.buttonLink}
        className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        data-tina-field={tinaField(block, "buttonText")}
      >
        {block.buttonText}
      </a>
    </section>
  );
}