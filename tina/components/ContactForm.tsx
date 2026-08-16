import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function ContactForm({ block }: Props) {
  const title = block?.title ?? "";
  const text = block?.text ?? "";
  const recipientEmail = block?.recipientEmail ?? "";
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

  const inputClass =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <section className={`contact-form-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-2xl px-4">
        {title && (
          <h2
            className="mb-4 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "title")}
          >
            {title}
          </h2>
        )}

        {text && (
          <p
            className={`mb-8 text-center leading-7 ${subtextColorClass}`}
            data-tina-field={tinaField(block, "text")}
          >
            {text}
          </p>
        )}

        <form className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className={`block text-sm font-medium ${textColorClass}`}>
            Name
            <input type="text" name="name" required className={inputClass} />
          </label>
          <label className={`mt-4 block text-sm font-medium ${textColorClass}`}>
            Email
            <input type="email" name="email" required className={inputClass} />
          </label>
          <label className={`mt-4 block text-sm font-medium ${textColorClass}`}>
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
          <p className={`mt-4 text-center text-sm ${subtextColorClass}`}>
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