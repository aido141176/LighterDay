import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  block: any;
};

export default function FullText({ block }: Props) {
  const heading = block?.heading ?? "";
  const sectionBackground = block?.sectionBackground ?? "white";

  const sectionBackgroundClass =
    sectionBackground === "light"
      ? "mylight"
      : sectionBackground === "dark"
      ? "mydark"
      : sectionBackground === "primary"
      ? "myprimary"
      : "bg-white";

  const textColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-100"
      : "text-slate-900";

  const subtextColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-300"
      : "text-slate-600";

  return (
    <section className={`fulltext-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-4xl px-4">
        {heading && (
          <h2
            className="mb-6 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div
          className={`prose max-w-none leading-8 ${subtextColorClass}`}
          data-tina-field={tinaField(block, "body")}
        >
          <TinaMarkdown content={block?.body} />
        </div>
      </div>
    </section>
  );
}