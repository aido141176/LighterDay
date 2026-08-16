import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function HeroSplit({ block }: Props) {
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`hero-split-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto grid w-full items-center gap-10 px-4 md:grid-cols-2 ${maxWidthClass}`}>
        <div>
          <h1
            className="text-4xl font-extrabold tracking-tight md:text-5xl"
            data-tina-field={tinaField(block, "headline")}
          >
            {block.headline}
          </h1>

          <p
            className={`mt-6 max-w-2xl text-lg leading-8 ${
              isDark ? "text-slate-300" : "text-slate-600"
            }`}
            data-tina-field={tinaField(block, "subtext")}
          >
            {block.subtext}
          </p>

          {block.buttonText && block.buttonLink && (
            <a
              href={block.buttonLink}
              className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
              data-tina-field={tinaField(block, "buttonText")}
            >
              {block.buttonText}
            </a>
          )}
        </div>

        {block?.image && (
          <div className="hero-split-media">
            <img
              src={block.image}
              alt=""
              className="h-80 w-full rounded-xl object-cover md:h-96"
              data-tina-field={tinaField(block, "image")}
            />
          </div>
        )}
      </div>
    </section>
  );
}