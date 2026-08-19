import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_oO8F39DF.mjs';
import { manifest } from './manifest_BQXh3Zj5.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/auth/login.astro.mjs');
const _page4 = () => import('./pages/api/auth/logout.astro.mjs');
const _page5 = () => import('./pages/api/auth/session.astro.mjs');
const _page6 = () => import('./pages/blog.astro.mjs');
const _page7 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page8 = () => import('./pages/dashboard.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/robots.txt.astro.mjs');
const _page11 = () => import('./pages/rss.xml.astro.mjs');
const _page12 = () => import('./pages/users/dashboard.astro.mjs');
const _page13 = () => import('./pages/users.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const _page15 = () => import('./pages/_---slug_.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/auth/login.ts", _page3],
    ["src/pages/api/auth/logout.ts", _page4],
    ["src/pages/api/auth/session.ts", _page5],
    ["src/pages/blog/index.astro", _page6],
    ["src/pages/blog/[...slug].astro", _page7],
    ["src/pages/dashboard/index.astro", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/robots.txt.ts", _page10],
    ["src/pages/rss.xml.js", _page11],
    ["src/pages/users/dashboard/index.astro", _page12],
    ["src/pages/users/index.astro", _page13],
    ["src/pages/index.astro", _page14],
    ["src/pages/[...slug].astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3e880dc8-1bd9-49c2-be41-2d5f01b59413",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
