---
name: wp-jwt-auth
description: Security and lifecycle guidelines for WordPress JWT authorization in Astro endpoints
---
# JWT Auth Lifecycle Rules
- Handle all WordPress JWT verification within Astro Server Endpoints (`src/pages/api/...`) or middleware, NEVER expose the raw WP application passwords/keys on the client side.
- Store the resulting JWT token in a secure, `HttpOnly`, `SameSite=Strict` cookie to authenticate the TinaCMS backend bridge.
- When making fetch calls to the WordPress REST API or GraphQL endpoints, format headers strictly as: `Authorization: Bearer [token]`.
