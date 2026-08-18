import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Team({ block }: Props) {
  const heading = block?.heading ?? "";
  const members = block?.members ?? [];
  const {
    sectionBackgroundClass,
    textAlignClass,
    paddingClass,
    maxWidthClass,
    textColorClass,
    subtextColorClass,
  } = sectionClasses(block);

  return (
    <section className={`team-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member: any, idx: number) => (
            <article key={idx} className="team-member flex flex-col items-center text-center">
              {member?.avatarImage && (
                <img
                  src={member.avatarImage}
                  alt={member.avatarAlt || member.name || ""}
                  className="h-24 w-24 rounded-full object-cover"
                  data-tina-field={tinaField(member, "avatarImage")}
                />
              )}
              <h3
                className={`mt-4 text-lg font-semibold ${textColorClass}`}
                data-tina-field={tinaField(member, "name")}
              >
                {member.name}
              </h3>
              <p
                className={`mt-1 text-sm ${subtextColorClass}`}
                data-tina-field={tinaField(member, "role")}
              >
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}