import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function FAQ({ block }: Props) {
  const heading = block?.heading ?? "";
  const items = block?.items ?? [];
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
    <section className={`faq-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-3xl px-4">
        {heading && (
          <h2
            className="mb-10 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="faq-list space-y-4">
          {items.map((item: any, idx: number) => (
            <details
              key={idx}
              className={`faq-item rounded-xl border border-slate-200 p-5 ${
                sectionBackground === "dark" || sectionBackground === "primary"
                  ? "border-white/20 bg-transparent"
                  : "bg-white shadow-sm"
              }`}
            >
              <summary
                className={`cursor-pointer list-none text-lg font-semibold ${textColorClass}`}
                data-tina-field={tinaField(item, "question")}
              >
                {item.question}
              </summary>
              <p
                className={`mt-3 leading-7 ${subtextColorClass}`}
                data-tina-field={tinaField(item, "answer")}
              >
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
