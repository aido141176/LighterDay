import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Logos({ block }: Props) {
  const heading = block?.heading ?? "";
  const logos = block?.logos ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`logos-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo: any, idx: number) => (
            <div key={idx} className="logos-item">
              <img
                src={logo}
                alt={`Client logo ${idx + 1}`}
                className={`h-12 w-auto object-contain opacity-70 transition hover:opacity-100 ${
                  isDark ? "" : "grayscale"
                }`}
                data-tina-field={tinaField(block, "logos")}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}