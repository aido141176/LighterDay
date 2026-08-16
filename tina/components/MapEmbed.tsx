import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function MapEmbed({ block }: Props) {
  const heading = block?.heading ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass } =
    sectionClasses(block);

  return (
    <section className={`map-embed-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        {block?.mapUrl && (
          <iframe
            src={block.mapUrl}
            title={heading || "Map"}
            className="h-96 w-full rounded-xl border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
}