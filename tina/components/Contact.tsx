import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type Props = {
  block: any;
};

export default function Contact({ block }: Props) {
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
    <section className={`contact-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <h2
            className="mb-10 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          <div
            className={`leading-8 ${subtextColorClass}`}
            data-tina-field={tinaField(block, "body")}
          >
            <TinaMarkdown content={block?.body} />
          </div>

          <div className="space-y-6">
            {block?.address && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${textColorClass}`}>
                  Address
                </h3>
                <p className={`mt-1 ${subtextColorClass}`} data-tina-field={tinaField(block, "address")}>
                  {block.address}
                </p>
              </div>
            )}
            {block?.officeHours && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${textColorClass}`}>
                  Office Hours
                </h3>
                <p className={`mt-1 whitespace-pre-line ${subtextColorClass}`} data-tina-field={tinaField(block, "officeHours")}>
                  {block.officeHours}
                </p>
              </div>
            )}
            {block?.phoneNumber && (
              <div className="contact-detail">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${textColorClass}`}>
                  Phone
                </h3>
                <p className={`mt-1 ${subtextColorClass}`} data-tina-field={tinaField(block, "phoneNumber")}>
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