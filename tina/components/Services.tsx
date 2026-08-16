import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function Services({ block }: Props) {
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

  const cardClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "bg-transparent border border-white/20"
      : "bg-white border border-slate-200 shadow-sm";

  const textColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-100"
      : "text-slate-900";

  const subtextColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-300"
      : "text-slate-600";

  return (
    <section className={`services-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <h2
            className="mb-10 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item: any, idx: number) => (
            <article key={idx} className={`service-card rounded-xl p-6 ${cardClass}`}>
              {item?.iconName && (
                <span
                  className="service-icon mb-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white"
                  data-tina-field={tinaField(item, "iconName")}
                >
                  {item.iconName}
                </span>
              )}
              <h3
                className={`text-xl font-semibold ${textColorClass}`}
                data-tina-field={tinaField(item, "title")}
              >
                {item.title}
              </h3>
              <p
                className={`mt-3 leading-7 ${subtextColorClass}`}
                data-tina-field={tinaField(item, "description")}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
