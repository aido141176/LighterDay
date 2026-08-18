export { renderers } from '../../../renderers.mjs';

const WP_AUTH_URL = "https://api.amcd.com.au/wp-json/jwt-auth/v1/token";
const COOKIE_NAME = "wp_jwt_token";
const MAX_AGE_SECONDS = 7 * 24 * 60 * 60;
const json = (payload, status) => new Response(JSON.stringify(payload), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8" }
});
const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    let body;
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
        body: JSON.stringify({ username, password })
      });
      const wpText = await wpResponse.text();
      let wpData = null;
      try {
        wpData = JSON.parse(wpText);
      } catch {
        wpData = null;
      }
      if (!wpResponse.ok || !wpData?.token || typeof wpData.token !== "string") {
        console.error(
          `[wp-auth] login rejected by WordPress (HTTP ${wpResponse.status}): ${wpText.slice(0, 300)}`
        );
        return json({ error: "Invalid username or password" }, 401);
      }
      const expiresIn = typeof wpData.expires_in === "number" && wpData.expires_in > 0 ? wpData.expires_in : MAX_AGE_SECONDS;
      cookies.set(COOKIE_NAME, wpData.token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: expiresIn
      });
      return json(
        {
          success: true,
          user: {
            displayName: wpData.user_display_name ?? null,
            email: wpData.user_email ?? null
          }
        },
        200
      );
    } catch (error) {
      console.error("[wp-auth] login request failed", error instanceof Error ? error.message : error);
      return json({ error: "Authentication service unavailable" }, 401);
    }
  } catch (error) {
    console.error("[wp-auth] login handler crashed", error instanceof Error ? error.stack : error);
    return json(
      { error: "Login handler error: " + (error instanceof Error ? error.message : String(error)) },
      500
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
