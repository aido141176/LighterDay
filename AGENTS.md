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

---

## Routing Notes

- `/admin/index.html` is the Tina admin (served from `public/admin/`); the catch-all `[...slug].astro` will 404 `/admin/`.
- Blog post URLs are `/blog/{filename}/` (set via `ui.router` in `tina/collections/blog.ts`).
- `src/pages/index.astro` and `about.astro` are standalone pages that do NOT use the page builder; `[...slug].astro` handles `src/content/page/*.mdx`.