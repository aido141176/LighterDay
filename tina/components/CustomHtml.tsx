import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function CustomHtml({ block }: Props) {
  const { paddingClass, maxWidthClass } = sectionClasses(block);

  return (
    <section className={`custom-html-section ${paddingClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        <div dangerouslySetInnerHTML={{ __html: block?.html ?? "" }} />
      </div>
    </section>
  );
}