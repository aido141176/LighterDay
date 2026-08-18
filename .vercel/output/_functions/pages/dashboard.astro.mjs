import { b as createAstro, c as createComponent, f as renderHead, a as renderTemplate } from '../chunks/astro/server_BGmIlpBy.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                  */
import { W as WP_COOKIE_NAME, v as validateWpToken } from '../chunks/wpAuth_BxB1NVhG.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get(WP_COOKIE_NAME)?.value;
  if (!token) {
    return Astro2.redirect("/login");
  }
  const user = await validateWpToken(token);
  if (!user) {
    return Astro2.redirect("/login");
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Dashboard | LighterDay</title>${renderHead()}</head> <body> <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4"> <div class="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm"> <h2 class="text-2xl font-extrabold tracking-tight text-slate-900">
hi you are logged in
</h2> <p class="mt-2 text-sm text-slate-500">
Signed in as ${user.displayName || user.email || "a WordPress user"} </p> <form method="POST" action="/api/auth/logout" class="mt-6"> <button type="submit" class="w-full rounded-lg bg-lime-700 px-4 py-2.5 font-semibold text-white transition hover:bg-lime-600">
Log out
</button> </form> </div> </div> </body></html>`;
}, "C:/Users/user/Documents/GitHub/LighterDay/src/pages/dashboard/index.astro", void 0);

const $$file = "C:/Users/user/Documents/GitHub/LighterDay/src/pages/dashboard/index.astro";
const $$url = "/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
