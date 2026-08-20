import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";
import { useState } from "react";


type Props = {
  block: any;
};



export default function ContactForm({ block }: Props) {
  const title = block?.title ?? "";
  const text = block?.text ?? "";
  const recipientEmail = block?.recipientEmail ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);
 
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  
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

        <form 
        onSubmit={async (e) =>
         {e.preventDefault();setStatus("submitting");const target = e.currentTarget;
         const formData = {
         input_1: (target.elements.namedItem("name") as HTMLInputElement).value,
         input_2: (target.elements.namedItem("email") as HTMLInputElement).value,
         input_3: (target.elements.namedItem("message") as HTMLTextAreaElement).value};
         try {
          const res = await fetch("/api/contact", {method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData)});if (res.ok) {setStatus("success");target.reset();} 
         else {setStatus("error");}} catch {setStatus("error");}}} 
         className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

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
          disabled={status === "submitting"}
          
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
            
          >
            {status === "submitting" ? "Sending..." : "Send"}
            Send
          </button>

          {status === "success" && (
            <p className="mt-4 text-sm font-medium text-green-600 text-center">Form submitted successfully!</p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm font-medium text-red-600 text-center">Something went wrong. Please try again.</p>
          )}


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