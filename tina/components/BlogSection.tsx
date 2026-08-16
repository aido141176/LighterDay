import { tinaField } from "tinacms/dist/react";
import { sectionClasses } from "./sectionUtils";

type Props = {
  block: any;
  posts: any[];
};

export default function BlogSection({ block, posts }: Props) {
  const heading = block?.heading ?? "";
  const columns = block?.columns ?? "3";
  const buttonText = block?.buttonText ?? "See all posts";
  const buttonLink = block?.buttonLink ?? "/blog";
  const { sectionBackgroundClass, textAlignClass, paddingClass, maxWidthClass, isDark } =
    sectionClasses(block);

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

  return (
    <section className={`blog-section ${paddingClass} ${sectionBackgroundClass} ${textAlignClass}`}>
      <div className={`mx-auto w-full px-4 ${maxWidthClass}`}>
        {heading && (
          <h2
            className="mb-10 text-3xl font-bold tracking-tight"
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
                    <h3 className={`text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
                      {post?.title}
                    </h3>
                    {post?.pubDate && (
                      <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                        {new Date(post.pubDate).toLocaleDateString()}
                      </p>
                    )}
                    {post?.description && (
                      <p className={`mt-2 text-sm leading-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
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