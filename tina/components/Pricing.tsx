import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function Pricing({ block }: Props) {
  const heading = block?.heading ?? "";
  const plans = block?.plans ?? [];
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  return (
    <section className={`pricing-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan: any, idx: number) => (
            <article
              key={idx}
              className={`pricing-plan flex flex-col rounded-xl border p-6 ${
                plan?.featured
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg ring-2 ring-blue-600"
                  : isDark
                  ? "border-white/20 bg-transparent"
                  : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <h3
                className={`text-xl font-semibold ${plan?.featured ? "text-white" : isDark ? "text-slate-100" : "text-slate-900"}`}
                data-tina-field={tinaField(plan, "name")}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-4 text-4xl font-extrabold tracking-tight ${
                  plan?.featured ? "text-white" : isDark ? "text-white" : "text-slate-900"
                }`}
                data-tina-field={tinaField(plan, "price")}
              >
                {plan.price}
              </p>
              {plan?.description && (
                <p
                  className={`mt-2 text-sm ${
                    plan?.featured ? "text-white/80" : isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                  data-tina-field={tinaField(plan, "description")}
                >
                  {plan.description}
                </p>
              )}

              {plan?.features && plan.features.length > 0 && (
                <ul className="mt-6 flex-1 space-y-2">
                  {plan.features.map((feature: any, fidx: number) => (
                    <li
                      key={fidx}
                      className={`flex items-start text-sm ${
                        plan?.featured ? "text-white/90" : isDark ? "text-slate-300" : "text-slate-600"
                      }`}
                      data-tina-field={tinaField(plan, "features")}
                    >
                      <span className="mr-2">&check;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {plan?.buttonText && (
                <a
                  href={plan?.buttonLink ?? "#"}
                  className={`mt-6 inline-block rounded-lg px-4 py-2 text-center text-sm font-semibold ${
                    plan?.featured
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : isDark
                      ? "bg-white text-slate-900 hover:bg-slate-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  data-tina-field={tinaField(plan, "buttonText")}
                >
                  {plan.buttonText}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}