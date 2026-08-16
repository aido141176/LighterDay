import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Services({ block }: Props) {
  const heading = block?.heading ?? "";
  const items = block?.items ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  const cardClass = isDark
    ? "bg-transparent border border-white/20"
    : "bg-white border border-slate-200 shadow-sm";

  return (
    <section className={`services-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
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
                className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                data-tina-field={tinaField(item, "title")}
              >
                {item.title}
              </h3>
              <p
                className={`mt-3 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}
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