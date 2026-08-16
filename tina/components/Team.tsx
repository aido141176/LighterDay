import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function Team({ block }: Props) {
  const heading = block?.heading ?? "";
  const members = block?.members ?? [];
  const sectionBackground = block?.sectionBackground ?? "white";

  const sectionBackgroundClass =
    sectionBackground === "light"
      ? "mylight"
      : sectionBackground === "dark"
      ? "mydark"
      : sectionBackground === "primary"
      ? "myprimary"
      : "bg-white";

  const textColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-100"
      : "text-slate-900";

  const subtextColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-300"
      : "text-slate-600";

  return (
    <section className={`team-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <h2
            className="mb-10 text-center text-3xl font-bold tracking-tight"
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
                  alt={member.name || ""}
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
