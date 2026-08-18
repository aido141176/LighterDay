const WP_VALIDATE_URL = "https://api.amcd.com.au/wp-json/jwt-auth/v1/token/validate";
const WP_COOKIE_NAME = "wp_jwt_token";
async function validateWpToken(token) {
  try {
    const wpResponse = await fetch(WP_VALIDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!wpResponse.ok) {
      return null;
    }
    const wpData = await wpResponse.json().catch(() => null);
    if (wpData?.code !== "jwt_auth_valid_token") {
      return null;
    }
    return {
      displayName: wpData.data?.user_display_name ?? null,
      email: wpData.data?.user_email ?? null
    };
  } catch (error) {
    console.error("[wp-auth] token validation failed", error instanceof Error ? error.message : error);
    return null;
  }
}

export { WP_COOKIE_NAME as W, validateWpToken as v };
