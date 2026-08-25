import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";
import { useEffect, useState } from "react";

const TIME_BLOCKS = [
  { value: "09:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

const SLOT_BASE = "rounded-lg border px-3 py-2 text-sm font-medium transition-colors";
const SLOT_IDLE =
  "border-slate-300 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600";
const SLOT_SELECTED = "border-blue-600 bg-blue-600 text-white";
const SLOT_TAKEN =
  "border-slate-200 bg-slate-100 text-slate-400 line-through cursor-not-allowed opacity-60";

type Props = {
  block: any;
};

export default function BookingFormSection({ block }: Props) {
  const title = block?.title ?? "";
  const text = block?.text ?? "";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  // Load availability at runtime so it is always current
  useEffect(() => {
    fetch("/api/booked-slots")
      .then((res) => res.json())
      .then((data) => setBookedSlots(data?.bookedSlots ?? {}))
      .catch(() => {});
  }, []);

  const takenTimes = date ? bookedSlots[date] ?? [] : [];

  const inputClass = `mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500`;
  const labelClass = `block text-sm font-medium ${isDark ? "text-slate-100" : "text-slate-900"}`;

  return (
    <section className={`booking-form-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
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
          onSubmit={async (e) => {
            e.preventDefault();
            if (!name || !email || !phone || !date || !time) {
              setErrorMsg("Please fill in all fields and pick a time.");
              setStatus("error");
              return;
            }
            setStatus("submitting");

            try {
              const res = await fetch("/api/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, date, time }),
              });
              const data = await res.json().catch(() => null);

              if (res.ok && data?.is_valid !== false) {
                setStatus("success");
                setBookedSlots((prev) => ({
                  ...prev,
                  [date]: [...(prev[date] ?? []), time],
                }));
                setName("");
                setEmail("");
                setPhone("");
                setDate("");
                setTime("");
              } else {
                const msgs = data?.validation_messages
                  ? Object.values(data.validation_messages).join(" ")
                  : "";
                setErrorMsg(typeof msgs === "string" && msgs ? msgs : "Something went wrong. Please try again.");
                setStatus("error");
              }
            } catch {
              setErrorMsg("Something went wrong. Please try again.");
              setStatus("error");
            }
          }}
          className="mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-left shadow-sm"
        >
          <label className={labelClass}>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
              autoComplete="name"
            />
          </label>

          <label className={`mt-4 ${labelClass}`}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              autoComplete="email"
            />
          </label>

          <label className={`mt-4 ${labelClass}`}>
            Phone Number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className={inputClass}
              autoComplete="tel"
            />
          </label>

          <label className={`mt-4 ${labelClass}`}>
            Date
            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              required
              className={inputClass}
            />
          </label>

          <fieldset className="mt-4">
            <legend className={labelClass}>Time</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {TIME_BLOCKS.map((t) => {
                const taken = takenTimes.includes(t.value);
                const selected = time === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    disabled={taken || !date}
                    onClick={() => setTime(t.value)}
                    className={`${SLOT_BASE} ${
                      taken ? SLOT_TAKEN : selected ? SLOT_SELECTED : SLOT_IDLE
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <button
            disabled={status === "submitting"}
            type="submit"
            className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {status === "submitting" ? "Booking…" : "Confirm Booking"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-center text-sm font-medium text-green-600">
              Booking confirmed! We&apos;ll be in touch shortly.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}
