import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Contact({ block }: Props) {
  const heading = block?.heading ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`contact-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          <div
            className={`leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}
            data-tina-field={tinaField(block, "body")}
          >
            <TinaMarkdown content={block?.body} />
          </div>

          <div className="space-y-6">
            {block?.address && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Address
                </h3>
                <p
                  className={`mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  data-tina-field={tinaField(block, "address")}
                >
                  {block.address}
                </p>
              </div>
            )}
            {block?.officeHours && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Office Hours
                </h3>
                <p
                  className={`mt-1 whitespace-pre-line ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  data-tina-field={tinaField(block, "officeHours")}
                >
                  {block.officeHours}
                </p>
              </div>
            )}
            {block?.phoneNumber && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                  Phone
                </h3>
                <p
                  className={`mt-1 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                  data-tina-field={tinaField(block, "phoneNumber")}
                >
                  {block.phoneNumber}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}