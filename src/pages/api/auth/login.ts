import type { APIRoute } from "astro";

const WP_AUTH_URL =
  (import.meta.env.WP_JWT_AUTH_URL as string | undefined) ||
  "https://api.amcd.com.au/wp-json/jwt-auth/v1/token";

const COOKIE_NAME = "wp_jwt_token";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

const json = (payload: unknown, status: number) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const username = body?.username ?? body?.email ?? "";
  const password = body?.password ?? "";

  if (!username || !password) {
    return json({ error: "Username and password are required" }, 400);
  }

  try {
    const wpResponse = await fetch(WP_AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const wpData = await wpResponse.json().catch(() => null);

    if (!wpResponse.ok || !wpData?.token || typeof wpData.token !== "string") {
      console.error(`[wp-auth] login rejected by WordPress (HTTP ${wpResponse.status})`);
      return json({ error: "Invalid username or password" }, 401);
    }

    const expiresIn =
      typeof wpData.expires_in === "number" && wpData.expires_in > 0
        ? wpData.expires_in
        : MAX_AGE_SECONDS;

    cookies.set(COOKIE_NAME, wpData.token, {
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "strict",
      path: "/",
      maxAge: expiresIn,
    });

    return json(
      {
        success: true,
        user: {
          displayName: wpData.user_display_name ?? null,
          email: wpData.user_email ?? null,
        },
      },
      200,
    );
  } catch (error) {
    console.error("[wp-auth] login request failed", error instanceof Error ? error.message : error);
    return json({ error: "Authentication service unavailable" }, 401);
  }
};