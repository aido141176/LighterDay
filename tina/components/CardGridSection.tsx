import { tinaField } from "tinacms/dist/react";
import "../../src/styles/CardGridSection.css";

type Props = {
  block: any;
};

export default function CardGridSection({ block }: Props) {
  const heading = block?.heading ?? "";
  const intro = block?.intro ?? "";
  const columns = block?.columns ?? "3";
  const sectionBackground = block?.sectionBackground ?? "white";
  const cardStyle = block?.cardStyle ?? "bordered";
  const cardImageSize = block?.cardImageSize ?? "medium";
  const buttonStyle = block?.buttonStyle ?? "primary";
  const hoverEffect = block?.hoverEffect ?? "on";
  const cards = block?.cards ?? [];

  const cardTitleAlignment = block?.cardTitleAlignment ?? "center";
  const cardTextAlignment = block?.cardTextAlignment ?? "center";
  const cardButtonAlignment = block?.cardButtonAlignment ?? "center";

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
      ? "mydark"
      : sectionBackground === "primary"
      ? "bg-blue-600 text-white"
      : "bg-white";

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

  const textColorClass =
    sectionBackground === "dark" || sectionBackground === "primary" ? "text-white/80" : "text-slate-600";

  const hoverClass = hoverEffect === "on" ? "transition duration-300 hover:-translate-y-1 hover:shadow-lg" : "";

  // image size classes; 'full' will use object-cover and a larger fixed height
  const imageSizeClass =
    cardImageSize === "small"
      ? "h-12 w-12 object-cover"
      : cardImageSize === "large"
      ? "h-24 w-full object-cover"
      : cardImageSize === "full"
      ? "w-full h-56 md:h-72 object-cover"
      : "h-16 w-full object-cover"; // medium default

  // title/text alignment classes
  const titleAlignClass = cardTitleAlignment === "left" ? "text-left" : "text-center";
  const textAlignClass = cardTextAlignment === "left" ? "text-left" : "text-center";

  // button alignment wrapper classes
  const buttonJustifyClass =
    cardButtonAlignment === "left" ? "justify-start" : cardButtonAlignment === "right" ? "justify-end" : "justify-center";

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
    <section className={`card-grid ${spacingClass} ${sectionBackgroundClass}`}>
      <div className={containerClass}>
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
          {cards.map((card: any, idx: number) => {
            // determine if this image should be displayed as full-width cover or top small icon
            const isFullImage = cardImageSize === "full";
            return (
              <article key={idx} className={`flex flex-col h-full rounded-xl overflow-hidden ${cardStyleClass} ${hoverClass}`}>
                {/* If 'full' we want image to fill the top; otherwise image is a top media with some padding */}
                {card?.image && (
                  <figure className={`${isFullImage ? "" : "p-6 pt-6"} w-full`}>
                    <img
                      src={card.image}
                      alt={card.title || ""}
                      className={`${imageSizeClass} rounded ${isFullImage ? "" : ""}`}
                      data-tina-field={tinaField(card, "image")}
                    />
                  </figure>
                )}

                <div className="card-body p-6 flex flex-col flex-1">
                  <h3 className={`mb-3 text-xl font-semibold ${titleAlignClass}`} data-tina-field={tinaField(card, "title")}>
                    {card.title}
                  </h3>

                  <p className={`flex-1 ${textColorClass} ${textAlignClass} flex-1`} data-tina-field={tinaField(card, "text")}>
                    {card.text}
                  </p>

                  {card.buttonText && card.buttonLink && (
                    <div className={`card-actions mt-4 flex ${buttonJustifyClass}`}>
                      <a
                        href={card.buttonLink}
                        className={`inline-block rounded-lg px-4 py-2 text-sm font-medium ${buttonClass}`}
                        data-tina-field={tinaField(card, "buttonText")}
                      >
                        {card.buttonText}
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}