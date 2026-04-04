import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function Hero({ block }: Props) {
  const mediaType = block?.mediaType ?? "image";
  const textAlign = block?.textAlign ?? "center";
  const overlayOpacity = block?.overlayOpacity ?? "40";
  const height = block?.height ?? "large";

  const alignmentClasses = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const heightClasses = {
    small: "min-h-[400px]",
    medium: "min-h-[500px]",
    large: "min-h-[650px]",
    screen: "min-h-screen",
  };

  const overlayClasses = {
    "0": "bg-black/0",
    "10": "bg-black/10",
    "20": "bg-black/20",
    "30": "bg-black/30",
    "40": "bg-black/40",
    "50": "bg-black/50",
    "60": "bg-black/60",
    "70": "bg-black/70",
  };

  const contentAlignment =
    alignmentClasses[textAlign as keyof typeof alignmentClasses] ??
    alignmentClasses.center;

  const heroHeight =
    heightClasses[height as keyof typeof heightClasses] ??
    heightClasses.large;

  const overlayClass =
    overlayClasses[overlayOpacity as keyof typeof overlayClasses] ??
    overlayClasses["40"];

  const videoSrc =
    mediaType === "videoUpload"
      ? block?.heroVideo
      : mediaType === "videoUrl"
      ? block?.heroVideoUrl
      : null;

  return (
    <section className={`relative flex items-center justify-center overflow-hidden ${heroHeight}`}>
      {videoSrc ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoSrc} />
        </video>
      ) : block?.heroImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${block.heroImage})` }}
        ></div>
      ) : (
        <div className="absolute inset-0 bg-slate-900"></div>
      )}

      <div className={`absolute inset-0 ${overlayClass}`}></div>

      <div
        className={`relative z-10 flex w-full max-w-6xl flex-col px-6 py-16 text-white ${contentAlignment}`}
      >
        <h1
          className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl"
          data-tina-field={tinaField(block, "headline")}
        >
          {block.headline}
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl"
          data-tina-field={tinaField(block, "subtext")}
        >
          {block.subtext}
        </p>

        {block.buttonText && block.buttonLink && (
          <a
            href={block.buttonLink}
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow hover:bg-blue-700"
            data-tina-field={tinaField(block, "buttonText")}
          >
            {block.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}