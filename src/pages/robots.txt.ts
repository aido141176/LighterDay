import type { APIRoute } from "astro";

const SITE =
  (import.meta.env.SITE_URL as string | undefined) ||
  (import.meta.env.VERCEL_URL ? `https://${import.meta.env.VERCEL_URL}` : "http://localhost:4321");

export const GET: APIRoute = () =>
  new Response(
    ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE}/sitemap-index.xml`, ""].join("\n"),
    {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    },
  );