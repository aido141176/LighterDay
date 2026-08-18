import { W as WP_COOKIE_NAME, v as validateWpToken } from '../../../chunks/wpAuth_BxB1NVhG.mjs';
export { renderers } from '../../../renderers.mjs';

const json = (payload, status) => new Response(JSON.stringify(payload), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8" }
});
const prerender = false;
const GET = async ({ cookies }) => {
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
