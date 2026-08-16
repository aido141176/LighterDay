import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function HeroBasic({ block }: Props) {
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`hero-basic-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        <h1
          className="text-4xl font-extrabold tracking-tight md:text-6xl"
          data-tina-field={tinaField(block, "headline")}
        >
          {block.headline}
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-lg leading-8 md:text-xl ${
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
    </section>
  );
}