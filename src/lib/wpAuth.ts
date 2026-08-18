const WP_VALIDATE_URL =
  (import.meta.env.WP_JWT_VALIDATE_URL as string | undefined) ||
  "https://api.amcd.com.au/wp-json/jwt-auth/v1/token/validate";

export const WP_COOKIE_NAME = "wp_jwt_token";

export type WpUser = {
  displayName: string | null;
  email: string | null;
};

export async function validateWpToken(token: string): Promise<WpUser | null> {
  try {
    const wpResponse = await fetch(WP_VALIDATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      email: wpData.data?.user_email ?? null,
    };
  } catch (error) {
    console.error("[wp-auth] token validation failed", error instanceof Error ? error.message : error);
    return null;
  }
}