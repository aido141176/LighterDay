import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
};

export default function ContactForm({ block }: Props) {
  const title = block?.title ?? "";
  const text = block?.text ?? "";
  const recipientEmail = block?.recipientEmail ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <section className={`contact-form-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {title && (
          <h2
            className="mb-4 text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "title")}
          >
            {title}
          </h2>
        )}

        {text && (
          <p
            className={`mb-8 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}
            data-tina-field={tinaField(block, "text")}
          >
            {text}
          </p>
        )}

        <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className={`block text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Name
            <input type="text" name="name" required className={inputClass} />
          </label>
          <label className={`mt-4 block text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Email
            <input type="email" name="email" required className={inputClass} />
          </label>
          <label className={`mt-4 block text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Message
            <textarea name="message" rows={5} required className={inputClass}></textarea>
          </label>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
          >
            Send
          </button>
        </form>

        {recipientEmail && (
          <p className={`mt-4 text-center text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Submissions will be sent to{" "}
            <span className="font-medium" data-tina-field={tinaField(block, "recipientEmail")}>
              {recipientEmail}
            </span>
          </p>
        )}
      </div>
    </section>
  );
}