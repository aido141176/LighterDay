# Agent Instructions: LighterDay Project Architecture

This document outlines the current technical stack, data flow, and integration patterns for the LighterDay Astro + TinaCMS project. Refer to this when creating sections/blocks, modifying schemas, or debugging routing issues.

## Technical Stack & Configuration

- **Framework:** Astro v5 (Content Layer enabled), static output
- **CMS:** TinaCMS v3 (local-first filesystem GraphQL server on port `4001`)
- **UI:** React 18 TSX components for CMS-rendered content, Tailwind CSS v4
- **Content:** MDX files in `src/content/page/`, `src/content/blog/`, `src/content/config/`

> ⚠️ **Critical Execution Rule:** To run this project locally, do **NOT** use `astro dev` or `npm run dev` directly. The TinaCMS CLI wrapper orchestrates the GraphQL server AND the Astro dev server:
> ```bash
> npx tinacms dev -c "astro dev"
> ```
> The first startup regenerates `tina/__generated__/` (client + types). After any schema change, restart this command so types and the admin UI pick up new fields.
>
> - Tina GraphQL playground: `http://localhost:4001/graphql`
> - Site: `http://localhost:4321/`
> - CMS admin: `http://localhost:4321/admin/index.html` (NOT `/admin/` — the catch-all route intercepts it)
>
> **Type checking:** `npm run check` (astro check) is available and must pass before finishing any task.

---

## Repository Layout (what lives where)

```
tina/
  config.ts                 # Tina schema root: collections + media config
  collections/
    page.ts                 # "page" collection; blocks templates array lives here
    blog.ts                 # "blog" collection (title, pubDate, heroImage, rich-text body)
    global-config.ts        # site-wide settings (nav, footer, SEO)
  blocks/                   # ONE FILE PER PAGE-BUILDER SECTION (schema only)
    hero.ts, cta.ts, cardGrid.ts, team.ts, testimonial.ts, services.ts,
    gallery.ts, faq.ts, blog.ts, fullText.ts, textWithImage.ts,
    heroCarousel.ts, contact.ts, contactForm.ts, stats.ts, logos.ts,
    pricing.ts, videoEmbed.ts, mapEmbed.ts, steps.ts, customHtml.ts,
    heroBasic.ts, heroSplit.ts
    index.ts                # re-exports every block
  fields/                   # shared reusable fields: sectionBackgroundField (background.ts),
                            # textAlignField/paddingField/maxWidthField (design.ts)
  components/               # React TSX renderers, ONE PER BLOCK (block prop)
    Hero.tsx, CTA.tsx, Team.tsx, ..., sectionUtils.ts (sectionClasses util)
  pages/
    PageRenderer.tsx        # client component: useTina() + renders <Page>
    Page.tsx                # block dispatcher: switch on __typename
  __generated__/            # AUTO-GENERATED client + types. Do not edit.
src/
  content/
    page/*.mdx              # page content (frontmatter `blocks:` = page builder data)
    blog/*.mdx              # blog posts
    config/config.json      # site config consumed by Astro layouts
  pages/
    [...slug].astro         # catch-all: fetches Tina props, renders <PageRenderer>
    blog/index.astro        # /blog listing
    blog/[...slug].astro    # single post
```

---

## Architecture & Data Flow

```
tina/blocks/*.ts (schema)          tina/components/*.tsx (React renderers)
        │                                      ▲
        ▼                                      │ block prop + tinaField()
tina/collections/page.ts                   tina/pages/Page.tsx
  templates: [heroBlock, ...]                switch (block.__typename)
        │                                      ▲
        ▼                                      │ { page, posts }
src/content/page/*.mdx                   tina/pages/PageRenderer.tsx (useTina)
        │                                      ▲
        ▼                                      │ client:tina hydrate
src/pages/[...slug].astro  ── getTinaProps() ──┘
        getStaticPaths: client.queries.page() + client.queries.blogConnection()
```

1. **Schema:** each page-builder section = a `Template` in `tina/blocks/*.ts`, registered in `tina/blocks/index.ts` and added to the `templates` array of the `blocks` field in `tina/collections/page.ts`.
2. **Generated layer:** on dev-server start, Tina generates `tina/__generated__/client.ts` and `types.ts` from the schema. Never edit these.
3. **Data fetch:** `src/pages/[...slug].astro` `getStaticPaths()` builds `getTinaProps`, which queries the page AND (for the Blog section) recent posts via `client.queries.blogConnection()`.
4. **Render:** `<PageRenderer {...data} client:tina />` hydrates with `useTina()` (live CMS edits) and delegates to `Page.tsx`, which dispatches each block by `__typename` to its React component in `tina/components/`.

---

## Adding a New Section (5-Step Checklist)

Do NOT inline templates in `page.ts` and do NOT write `.astro` renderers for blocks — renderers are React TSX.

1. **Schema:** create `tina/blocks/<name>.ts` exporting a `Template`:
   ```ts
   import type { Template } from "tinacms";
   import { sectionBackgroundField } from "../fields";

   export const teamBlock: Template = {
     name: "team",                          // __typename becomes PageBlocksTeam
     label: "Team",
     fields: [
       sectionBackgroundField,
       { type: "string", name: "heading", label: "Heading" },
       {
         type: "object", name: "members", label: "Members", list: true,
         ui: { itemProps: (item) => ({ label: item?.name ? `Member: ${item.name}` : "New Member" }) },
         fields: [
           { type: "string", name: "name", label: "Name" },
           { type: "image", name: "avatarImage", label: "Avatar Image" },
         ],
       },
     ],
   };
   ```
2. **Register:** export it from `tina/blocks/index.ts` and append it to the `templates` array in `tina/collections/page.ts`.
3. **Renderer:** create `tina/components/<Name>.tsx` — default export, `{ block }` prop typed `any`, destructure fields with `??` defaults, wrap in a `<section className="... py-16 ${sectionBackgroundClass}">`, and annotate fields with `data-tina-field={tinaField(block, "fieldName")}` for inline editing (see `tina/components/CTA.tsx` / `CardGridSection.tsx` for the reference pattern).
4. **Dispatch:** add a `case "PageBlocks<Name>"` branch to the switch in `tina/pages/Page.tsx` rendering `<Name block={block} />` inside a `key`/`data-tina-field` wrapper div.
5. **Restart** `npx tinacms dev -c "astro dev"` to regenerate types and expose the template in the admin at `/admin/index.html`.

### Conventions & Gotchas

- `__typename` pattern: `PageBlocks` + PascalCase template `name` (e.g. `name: "textWithImage"` → `PageBlocksTextWithImage`).
- Rich text fields are `type: "rich-text"` in the schema and rendered with `<TinaMarkdown content={block.body} />` from `tinacms/dist/rich-text` (see `tina/pages/AdminBlogPost.tsx`).
- Every section component supports `sectionBackgroundField` (white/light/dark) via the shared `mylight`/`mydark`/`myprimary` class map — copy the `sectionBackgroundClass` pattern from `CTA.tsx`.
- **Shared design fields:** every block gets `textAlignField`/`paddingField`/`maxWidthField` from `tina/fields/design.ts` (except where the block already has its own `textAlign`). Components resolve them via `sectionClasses(block)` in `tina/components/sectionUtils.ts` — always use that util, never hardcode `py-16`/`max-w-6xl`/`text-center`.
- Object lists get `ui.itemProps` for readable labels in the CMS sidebar.
- **CMS UX conventions (every field):**
  - **`isTitle: true`** on the document-level title field (e.g. page `title`, blog `title`) — makes it the row label in the CMS list and the basis for new-document filenames.
  - **`ui.itemProps`** on every object list (members, quotes, plans, ...) — gives each item a readable sidebar label like `Member: John Smith` instead of `Item 1`. Block templates in the page builder already show their template name (Hero, Team, ...) by default; template-level `ui.itemProps` can customize that further if needed.
  - **`label` + `description`** on EVERY field — the label is the input name, the description is helper text under it explaining what to enter (e.g. `Price text, e.g. $29/mo.`). A blank input gives no context; a good description removes all guesswork for non-technical customers and AI agents.
  - **Alt text:** every image-bearing block MUST also expose an alt-text field (`heroImageAlt`, `imageAlt`, `avatarAlt`, `altText`, ...) and the component must render `alt={field || fallback}`. Never render `alt=""` on meaningful images.
- Components consume a single `block` prop; data not in the page query (e.g. blog posts) is threaded from `getStaticPaths` → `PageRenderer` → `Page` → the section component (see the Blog section).
- Components are typed loosely (`any`) throughout this repo; match that rather than introducing strict types.
- Style with Tailwind utility classes; site-specific overrides live in custom CSS files imported by components (e.g. `src/styles/CardGridSection.css`) or the `my*` utility classes.

---

## Current Section Inventory

All sections except `hero`/`heroCarousel` (media-based) share the same design fields: `sectionBackgroundField`, `textAlignField`, `paddingField`, `maxWidthField` (from `tina/fields/`). The `hero`/`cta` blocks have their own `textAlign`; `customHtml` omits `sectionBackground`.

| Block name      | `__typename`              | Purpose |
|-----------------|---------------------------|---------|
| hero            | `PageBlocksHero`          | Full-width media hero: image/video, overlay, alignment, height |
| heroBasic       | `PageBlocksHeroBasic`     | Centered text hero: headline, subtext, button (no media) |
| heroSplit       | `PageBlocksHeroSplit`     | 50/50 hero: text left, image right |
| heroCarousel    | `PageBlocksHeroCarousel`  | Full-width image carousel: title, image, caption per slide |
| cta             | `PageBlocksCta`           | Call-to-action banner with headline/button |
| cardGridSection | `PageBlocksCardGridSection` | Configurable card grid (columns, styles, hover) |
| team            | `PageBlocksTeam`          | Member grid: name, role, avatar |
| testimonial     | `PageBlocksTestimonial`   | Quote cards: quote, author, company |
| services        | `PageBlocksServices`      | Service cards: title, description, iconName |
| gallery         | `PageBlocksGallery`       | Image grid from an image list |
| faq             | `PageBlocksFaq`           | Accordion: question/answer items |
| blog            | `PageBlocksBlog`          | Recent posts grid (2/3/4 cols) + "See all posts" link; posts threaded via props |
| fullText        | `PageBlocksFullText`      | Full-width rich-text block |
| textWithImage   | `PageBlocksTextWithImage` | 50/50 image + rich-text rows, image side configurable |
| stats           | `PageBlocksStats`         | Numbers grid: value + label per item |
| logos           | `PageBlocksLogos`         | Client/partner logo strip (image list) |
| pricing         | `PageBlocksPricing`       | 3-column plan cards: name, price, features, CTA, featured flag |
| videoEmbed      | `PageBlocksVideoEmbed`    | YouTube/Vimeo embed from a plain URL |
| mapEmbed        | `PageBlocksMapEmbed`      | Google Maps embed iframe |
| steps           | `PageBlocksSteps`         | Numbered steps/timeline: title + description |
| customHtml      | `PageBlocksCustomHtml`    | Raw HTML rendered as-is (escape hatch) |
| contact         | `PageBlocksContact`       | Rich text + address, office hours, phone |
| contactForm     | `PageBlocksContactForm`   | Title, textarea text, recipient email + static form markup |

### Using Custom HTML (`PageBlocksCustomHtml`)

The escape hatch for any design the other sections cannot express — raw HTML is rendered as-is inside a padded, max-width container (the `customHtml` block gets `paddingField`/`maxWidthField` but no `sectionBackground`). Rules for design agents:

- Use it ONLY when no existing section fits; prefer the 23 structured sections first.
- Self-contained HTML only: inline any `<style>`/`<script>`/images within the snippet — do NOT add CSS or JS files elsewhere for it (Tailwind utilities ARE available since the site compiles them).
- Prefer Tailwind utility classes over custom CSS for consistency with the rest of the site.
- The snippet is edited as plain text in the CMS sidebar (not inline-editable).

---

## Global Config & Site-Wide Settings

`tina/collections/global-config.ts` is a single JSON document (`src/content/config/config.json`) marked `ui: { global: true }` — edited from the CMS via the Global toggle on any page. It feeds the nav, footer, and SEO defaults through `BaseLayout.astro`.

| Field | Purpose | Options |
|-------|---------|---------|
| `seo.title` | Site-wide SEO title fallback | free text |
| `seo.description` | Site-wide meta description fallback | free text |
| `seo.siteOwner` | Name shown in the footer | free text |
| `seo.image` | Default social share image for all pages | image |
| `navigationSettings.logo` | Logo in the navigation bar | image |
| `navigationSettings.navPosition` | Menu alignment | `justify-start` (left), `justify-end` (right), `justify-center` |
| `navigationSettings.backgroundStyle` | Nav background | `bg-white text-gray-800`, `mylight text-gray-800`, `mydark text-white`, `bg-transparent` |
| `navigationSettings.sticky` | Nav behavior | `relative` (scrolls away), `fixed top-0 left-0 w-full z-50` (stays on top) |
| `nav` | Menu items (reorder/add/remove) | templates: `simpleLink`, `dropdown`, `megaMenu` (see below) |
| `contactLinks` | Icon links in the nav/footer | `title`, `link`, `icon` (Tabler icon picker, `Tb*` names from `react-icons/tb`) |

> ⚠️ **`navigationSettings` values ARE Tailwind class strings** consumed directly by `NewNav.astro`. Always pick from the existing options above — never invent new values. If a design needs a different nav look, change the classes in `NewNav.astro` itself, not the config values.

### Nav menu templates (`nav`)

- `simpleLink` — `label` (menu text) + `link` (URL)
- `dropdown` — `label` (trigger) + `subMenu[]` items: `label` + `link`
- `megaMenu` — `label` (trigger) + `columns[]`: `title` + `links[]` (`label` + `link`)

---

## Routing Notes

- `/admin/index.html` is the Tina admin (served from `public/admin/`); the catch-all `[...slug].astro` will 404 `/admin/`.
- Blog post URLs are `/blog/{filename}/` (handled by the catch-all `[...slug].astro` routes, not the CMS).
- **`ui.router` enables inline editing (visual mode).** With a router on any collection, the admin opens straight into the `#/~/<path>` visual-editing view: the live site in an iframe with the form sidebar (hover any `data-tina-field` element to see its outline; click it to open that block's form). The collection list/forms are still reachable via the hamburger menu → collection → document.
- **If the sidebar shows "TinaCMS form fields will appear here" and a modal with "Enter Edit Mode", the CMS is not authenticated.** Click **"Enter Edit Mode"** — it sets `localStorage["tina.local.isLogedIn"]` (local-mode auth) and the forms load. Without that flag the CMS never enables and forms stay empty everywhere.
- `src/pages/index.astro` and `about.astro` statically map the `home.mdx`/`about.mdx` documents; `src/pages/[...slug].astro` (catch-all, `getStaticPaths` from `pageConnection()`) serves every OTHER document in `src/content/page/*.mdx` at `/{filename}/`, e.g. a new `services.mdx` → `/services/`. Unknown URLs fall through to `404.astro`.
- `src/pages/rss.xml.js` and `src/pages/robots.txt.ts` are build-time endpoints; `robots.txt` advertises `Sitemap: {SITE_URL}/sitemap-index.xml` (falls back to Vercel URL, then localhost).

---

## WordPress JWT Auth Bridge (`/api/auth/*`)

Replaces TinaCloud/GitHub login with WordPress credentials. The site is static-by-default; the auth routes opt out of prerendering (`export const prerender = false`) and run as Vercel serverless functions via the `@astrojs/vercel` adapter (`astro.config.mjs`). `npm run build` therefore produces `.vercel/output/` (static + one serverless function) instead of a plain `dist/` folder.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | JSON `{ username \| email, password }` → forwards to WordPress JWT endpoint, sets HttpOnly `wp_jwt_token` cookie (`SameSite=Strict`, `Secure` in production), returns `{ success, user }`. Invalid credentials → generic 401, never raw WP errors. |
| `/api/auth/logout` | POST | Deletes the `wp_jwt_token` cookie. |
| `/api/auth/session` | GET | Reads the cookie, validates it against WordPress (`Authorization: Bearer <token>`), returns `{ authenticated, user }`. |

- WordPress endpoints default to `https://api.amcd.com.au/wp-json/jwt-auth/v1/token` and `.../token/validate`; override with env vars `WP_JWT_AUTH_URL` / `WP_JWT_VALIDATE_URL`.
- `/login` page POSTs to the login endpoint and redirects to `/dashboard/` on success.
- `/dashboard/` is the protected-page pattern: an SSR page (`export const prerender = false`) that reads `wp_jwt_token`, validates it against WordPress via `validateWpToken()` in `src/lib/wpAuth.ts`, and `Astro.redirect("/login")`s when missing/invalid. Copy this pattern for any token-gated frontend content. `noindex` is set so gated pages never enter search results.
- **Known limits:** TinaCMS has no native "custom JWT" auth provider — this bridge gates the frontend, not the Tina admin. The admin shell (`public/admin/index.html`) is a static file that bypasses Astro routes and remains open; it is only for local editing (where Tina's local server runs). On a static Vercel deploy there is no Tina GraphQL/filesystem backend, so the admin forms cannot persist edits in production regardless of auth.