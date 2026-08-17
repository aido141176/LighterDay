---
name: astro-architecture
description: Rules for writing high-performance Astro components and frontmatter
---
# Astro Component Guidelines
- ALWAYS write component logic inside the frontmatter script block (`---`) using build-time TypeScript.
- DO NOT use React/client-side components unless explicit interactivity is required.
- If a component requires React, use the proper client directive (e.g., `client:load` or `client:visible`).
- Use Astro's native asset optimization by importing images using the `<Image />` component from `astro:assets`.
