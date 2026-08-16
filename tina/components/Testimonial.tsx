import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Testimonial({ block }: Props) {
  const heading = block?.heading ?? "";
  const quotes = block?.quotes ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  const cardClass = isDark
    ? "bg-transparent border border-white/20"
    : "bg-white border border-slate-200 shadow-sm";

  return (
    <section className={`testimonial-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
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
          {quotes.map((quote: any, idx: number) => (
            <figure
              key={idx}
              className={`testimonial-card flex flex-col justify-between rounded-xl p-6 ${cardClass}`}
            >
              <blockquote
                className={`flex-1 text-lg leading-8 ${isDark ? "text-slate-100" : "text-slate-900"}`}
                data-tina-field={tinaField(quote, "quote")}
              >
                &ldquo;{quote.quote}&rdquo;
              </blockquote>
              <figcaption className={`mt-4 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                <span className="block font-semibold" data-tina-field={tinaField(quote, "author")}>
                  {quote.author}
                </span>
                <span className="block" data-tina-field={tinaField(quote, "company")}>
                  {quote.company}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}