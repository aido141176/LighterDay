import type { APIRoute } from "astro";
import { validateWpToken, WP_COOKIE_NAME } from "../../../lib/wpAuth";

const json = (payload: unknown, status: number) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get(WP_COOKIE_NAME)?.value;

  if (!token) {
    return json({ authenticated: false }, 200);
  }

  const user = await validateWpToken(token);

  if (!user) {
    return json({ authenticated: false }, 200);
  }

  return json({ authenticated: true, user }, 200);
};