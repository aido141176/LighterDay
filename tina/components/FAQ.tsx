import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function FAQ({ block }: Props) {
  const heading = block?.heading ?? "";
  const items = block?.items ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`faq-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
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
                isDark ? "border-white/20 bg-transparent" : "bg-white shadow-sm"
              }`}
            >
              <summary
                className={`cursor-pointer list-none text-lg font-semibold ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
                data-tina-field={tinaField(item, "question")}
              >
                {item.question}
              </summary>
              <p
                className={`mt-3 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}
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