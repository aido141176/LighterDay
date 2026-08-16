import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Stats({ block }: Props) {
  const heading = block?.heading ?? "";
  const items = block?.items ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`stats-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="stats-item">
              <p
                className={`text-4xl font-extrabold tracking-tight md:text-5xl ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
                data-tina-field={tinaField(item, "value")}
              >
                {item.value}
              </p>
              <p
                className={`mt-2 text-sm uppercase tracking-wide ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
                data-tina-field={tinaField(item, "label")}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}