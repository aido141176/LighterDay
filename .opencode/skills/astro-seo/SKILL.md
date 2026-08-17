---
name: astro-seo
description: Enforces modern SEO, schema markup, and metadata practices tailored specifically for Astro and headless content architectures.
---
# Astro Core SEO Rules

## 1. Metadata & Document Structure
- **Astro Head:** Every page template must include standard HTML meta tags injected server-side via Astro frontmatter. Never use client-side React hooks (like `react-helmet`) for SEO metadata.
- **Canonical URLs:** Always derive the canonical URL dynamically using `Astro.site` and `Astro.url.pathname`.
- **Title & Description Limits:** 
  - Titles must be kept between **50–60 characters**.
  - Descriptions must be kept between **120–160 characters**.
  - Fall back to a smart default string if TinaCMS fields are left empty.

## 2. Open Graph & Social Cards
- Always generate structured Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`) and Twitter card tags.
- Fall back to a default high-resolution branding image if a custom thumbnail isn't provided in the content collection.

## 3. Structured Data (JSON-LD)
- Inject JSON-LD schema natively inside an unescaped script tag: `<script type="application/ld+json" set:html={JSON.stringify(schema)} />`.
- Implement `WebSite`, `Organization`, or `Article` schemas dynamically depending on whether the page is a landing page or a blog post.

## 4. Semantic HTML & Performance Constraints
- Enforce strict heading hierarchies (`<h1>` -> `<h2>` -> `<h3>`). Never skip levels for design choice.
- All template images must include descriptive `alt` attributes. For TinaCMS images, prompt the developer to add an alt text field if it's missing from the schema.
- Enforce the use of Astro’s native `<Image />` component with fixed dimensions or layout properties to prevent Layout Shifts (CLS).
