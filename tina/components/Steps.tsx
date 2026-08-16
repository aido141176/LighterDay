import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Steps({ block }: Props) {
  const heading = block?.heading ?? "";
  const items = block?.items ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`steps-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <ol className="space-y-8">
          {items.map((item: any, idx: number) => (
            <li key={idx} className="flex gap-5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  isDark ? "bg-white text-slate-900" : "bg-blue-600 text-white"
                }`}
              >
                {idx + 1}
              </span>
              <div>
                <h3
                  className={`text-xl font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}
                  data-tina-field={tinaField(item, "title")}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-2 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  data-tina-field={tinaField(item, "description")}
                >
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}