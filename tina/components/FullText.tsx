import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function FullText({ block }: Props) {
  const heading = block?.heading ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`fulltext-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-6 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div
          className={`leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}
          data-tina-field={tinaField(block, "body")}
        >
          <TinaMarkdown content={block?.body} />
        </div>
      </div>
    </section>
  );
}