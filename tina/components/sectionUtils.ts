export function sectionClasses(block: any) {
  const sectionBackground = block?.sectionBackground ?? "white";
  const textAlign = block?.textAlign ?? "center";
  const padding = block?.padding ?? "medium";
  const maxWidth = block?.maxWidth ?? "wide";

  const sectionBackgroundClass =
    sectionBackground === "light"
      ? "mylight"
      : sectionBackground === "dark"
      ? "mydark"
      : sectionBackground === "primary"
      ? "myprimary"
      : "bg-white";

  const textAlignClass =
    textAlign === "left"
      ? "text-left"
      : textAlign === "right"
      ? "text-right"
      : "text-center";

  const paddingClass =
    padding === "none"
      ? "py-0"
      : padding === "small"
      ? "py-8"
      : padding === "large"
      ? "py-24"
      : "py-16";

  const maxWidthClass =
    maxWidth === "narrow"
      ? "max-w-3xl"
      : maxWidth === "full"
      ? "max-w-full"
      : "max-w-6xl";

  const isDark = sectionBackground === "dark" || sectionBackground === "primary";
  const textColorClass = isDark ? "text-slate-100" : "text-slate-900";
  const subtextColorClass = isDark ? "text-slate-300" : "text-slate-600";

  return {
    sectionBackgroundClass,
    textAlignClass,
    paddingClass,
    maxWidthClass,
    textColorClass,
    subtextColorClass,
    isDark,
  };
}