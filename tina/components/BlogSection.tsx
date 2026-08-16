import { tinaField } from "tinacms/dist/react";

type Props = {
  block: any;
  posts: any[];
};

export default function BlogSection({ block, posts }: Props) {
  const heading = block?.heading ?? "";
  const columns = block?.columns ?? "3";
  const buttonText = block?.buttonText ?? "See all posts";
  const buttonLink = block?.buttonLink ?? "/blog";
  const sectionBackground = block?.sectionBackground ?? "white";

  const sectionBackgroundClass =
    sectionBackground === "light"
      ? "mylight"
      : sectionBackground === "dark"
      ? "mydark"
      : sectionBackground === "primary"
      ? "myprimary"
      : "bg-white";

  const sortedPosts = [...(posts ?? [])].sort(
    (a: any, b: any) =>
      new Date(b?.pubDate ?? 0).valueOf() - new Date(a?.pubDate ?? 0).valueOf()
  );

  const gridColsClass =
    columns === "2"
      ? "md:grid-cols-2"
      : columns === "4"
      ? "md:grid-cols-2 lg:grid-cols-4"
      : "md:grid-cols-3";

  const textColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-100"
      : "text-slate-900";

  const subtextColorClass =
    sectionBackground === "dark" || sectionBackground === "primary"
      ? "text-slate-300"
      : "text-slate-600";

  return (
    <section className={`blog-section py-16 ${sectionBackgroundClass}`}>
      <div className="mx-auto max-w-6xl px-4">
        {heading && (
          <h2
            className="mb-10 text-center text-3xl font-bold tracking-tight"
            data-tina-field={tinaField(block, "heading")}
          >
            {heading}
          </h2>
        )}

        <div className={`grid gap-6 ${gridColsClass}`}>
          {sortedPosts.map((post: any, idx: number) => {
            const slug = post?._sys?.filename ?? post?.sys?.filename ?? "";
            return (
              <article
                key={idx}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <a href={`/blog/${slug}/`} className="block">
                  {post?.heroImage && (
                    <img
                      src={post.heroImage}
                      alt={post?.title || ""}
                      className="h-44 w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <h3 className={`text-lg font-semibold ${textColorClass}`}>
                      {post?.title}
                    </h3>
                    {post?.pubDate && (
                      <p className={`mt-1 text-sm ${subtextColorClass}`}>
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                    )}
                    {post?.description && (
                      <p className={`mt-2 text-sm leading-6 ${subtextColorClass}`}>
                        {post.description}
                      </p>
                    )}
                  </div>
                </a>
              </article>
            );
          })}
        </div>

        {buttonText && (
          <div className="mt-10 text-center">
            <a
              href={buttonLink}
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-blue-700"
              data-tina-field={tinaField(block, "buttonText")}
            >
              {buttonText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}