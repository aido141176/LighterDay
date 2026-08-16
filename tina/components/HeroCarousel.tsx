import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
};

export default function HeroCarousel({ block }: Props) {
  const items = block?.items ?? [];
  const height = block?.height ?? "large";
  const [current, setCurrent] = useState(0);

  const total = items.length;

  useEffect(() => {
    if (total < 2) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(timer);
  }, [total]);

  const heightClasses = {
    small: "min-h-[400px]",
    medium: "min-h-[500px]",
    large: "min-h-[650px]",
    screen: "min-h-screen",
  };

  const carouselHeight =
    heightClasses[height as keyof typeof heightClasses] ?? heightClasses.large;

  if (total === 0) {
    return null;
  }

  const active = items[current];

  return (
    <section className={`hero-carousel-section relative ${carouselHeight} overflow-hidden bg-slate-900`}>
      <div className="absolute inset-0">
        {items.map((item: any, idx: number) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {item?.image && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
            )}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
              {item?.title && (
                <h2
                  className="max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl"
                  data-tina-field={tinaField(item, "title")}
                >
                  {item.title}
                </h2>
              )}
              {item?.caption && (
                <p
                  className="mt-6 max-w-2xl text-lg leading-8 text-white/90"
                  data-tina-field={tinaField(item, "caption")}
                >
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => setCurrent((current - 1 + total) % total)}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setCurrent((current + 1) % total)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white backdrop-blur hover:bg-white/30"
          >
            &rsaquo;
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {items.map((_: any, idx: number) => (
              <button
                key={idx}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                className={`h-2.5 w-2.5 rounded-full ${
                  idx === current ? "bg-white" : "bg-white/40"
                }`}
              ></button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}