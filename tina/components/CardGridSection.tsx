import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function CardGridSection({ block }: Props) {
  // defaults that match your requested simplifications
  const heading = block?.heading ?? "";
  const intro = block?.intro ?? "";
  const columns = block?.columns ?? "3";
  const sectionBackground = block?.sectionBackground ?? "white";
  const cardStyle = block?.cardStyle ?? "bordered";
  const cardImageSize = block?.cardImageSize ?? "medium";
  const buttonStyle = block?.buttonStyle ?? "primary";
  const hoverEffect = block?.hoverEffect ?? "on";
  const cards = block?.cards ?? [];

  // fixed spacing / contained container
  const spacingClass = "pt-16 pb-16";
  const containerClass = "mx-auto max-w-6xl px-4";

  const gridColsClass =
    columns === "2"
      ? "md:grid-cols-2"
      : columns === "4"
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-3";

  const sectionBackgroundClass =
    sectionBackground === "light"
      ? "bg-slate-50"
      : sectionBackground === "dark"
      ? "bg-slate-900 text-white"
      : sectionBackground === "primary"
      ? "bg-blue-600 text-white"
      : "bg-white";

  // card style classes (kept simple)
  const cardStyleClass =
    cardStyle === "filled"
      ? sectionBackground === "dark" || sectionBackground === "primary"
        ? "bg-white/10 border border-white/10 text-white"
        : "bg-slate-100 border border-slate-100 text-slate-900"
      : cardStyle === "minimal"
      ? "bg-transparent border-0 shadow-none text-inherit"
      : sectionBackground === "dark" || sectionBackground === "primary"
      ? "bg-transparent border border-white/20 text-white"
      : "bg-white border border-slate-200 text-slate-900 shadow-sm";

  const cardTextClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-white/80"
      : "text-slate-600";

  const hoverClass = hoverEffect === "on" ? "transition duration-300 hover:-translate-y-1 hover:shadow-lg" : "";

  const imageSizeClass =
    cardImageSize === "small" ? "h-12 w-12" : cardImageSize === "large" ? "h-24 w-24" : "h-16 w-16";

  const buttonClass =
    buttonStyle === "secondary"
      ? sectionBackground === "dark" || sectionBackground === "primary"
        ? "bg-slate-700 text-white hover:bg-slate-600"
        : "bg-slate-200 text-slate-900 hover:bg-slate-300"
      : buttonStyle === "outline"
      ? sectionBackground === "dark" || sectionBackground === "primary"
        ? "border border-white text-white hover:bg-white hover:text-slate-900"
        : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
      : buttonStyle === "text"
      ? sectionBackground === "dark" || sectionBackground === "primary"
        ? "bg-transparent p-0 text-white underline underline-offset-4 hover:text-slate-200"
        : "bg-transparent p-0 text-blue-600 underline underline-offset-4 hover:text-blue-800"
      : sectionBackground === "dark" || sectionBackground === "primary"
      ? "bg-white text-slate-900 hover:bg-slate-100"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <section className={`${spacingClass} ${sectionBackgroundClass}`}>
      <div className={containerClass}>
        {/* Heading / Intro: only render when present; centered by default */}
        {(heading || intro) && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900" data-tina-field={tinaField(block, "heading")}>
                {heading}
              </h2>
            )}
            {intro && (
              <p className="mt-4 text-lg leading-8 text-slate-600" data-tina-field={tinaField(block, "intro")}>
                {intro}
              </p>
            )}
          </div>
        )}

        <div className={`grid gap-6 ${gridColsClass}`}>
          {cards.map((card: any, index: number) => {
            return (
              <div key={index} className={`rounded-xl p-6 ${cardStyleClass} ${hoverClass} flex flex-col items-center text-center`}>
                {card?.image && (
                  // Tina image binding
                  <img
                    src={card.image}
                    alt={card.title || ""}
                    className={`mb-4 rounded object-cover ${imageSizeClass}`}
                    data-tina-field={tinaField(card, "image")}
                  />
                )}

                <h3 className="mb-3 text-xl font-semibold" data-tina-field={tinaField(card, "title")}>
                  {card.title}
                </h3>

                <p className={cardTextClass} data-tina-field={tinaField(card, "text")}>
                  {card.text}
                </p>

                {card.buttonText && card.buttonLink && (
                  <a
                    href={card.buttonLink}
                    className={`mt-5 inline-block rounded-lg px-4 py-2 text-sm font-medium ${buttonClass}`}
                    data-tina-field={tinaField(card, "buttonText")}
                  >
                    {card.buttonText}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}