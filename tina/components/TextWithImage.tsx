import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function TextWithImage({ block }: Props) {
  const heading = block?.heading ?? "";
  const imageSide = block?.imageSide ?? "left";
  const items = block?.items ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`text-with-image-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="space-y-12">
          {items.map((item: any, idx: number) => {
            const isImageLeft =
              imageSide === "alternate" ? idx % 2 === 0 : imageSide === "left";
            return (
              <div key={idx} className="grid items-center gap-8 md:grid-cols-2">
                <div className={isImageLeft ? "md:order-1" : "md:order-2"}>
                  {item?.image && (
                    <img
                      src={item.image}
                      alt=""
                      className="h-64 w-full rounded-xl object-cover md:h-80"
                      data-tina-field={tinaField(item, "image")}
                    />
                  )}
                </div>
                <div className={isImageLeft ? "md:order-2" : "md:order-1"}>
                  <div
                    className={`leading-8 ${isDark ? "text-slate-300" : "text-slate-600"}`}
                    data-tina-field={tinaField(item, "body")}
                  >
                    <TinaMarkdown content={item?.body} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}