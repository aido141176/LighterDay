import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Gallery({ block }: Props) {
  const heading = block?.heading ?? "";
  const images = block?.images ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass } =
    sectionClasses(block);

  return (
    <section className={`gallery-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image: any, idx: number) => (
            <figure key={idx} className="gallery-item overflow-hidden rounded-lg">
              <img
                src={image}
                alt={heading ? `${heading} image ${idx + 1}` : `Gallery image ${idx + 1}`}
                className="h-48 w-full object-cover transition duration-300 hover:scale-105 md:h-56"
                data-tina-field={tinaField(block, "images")}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}