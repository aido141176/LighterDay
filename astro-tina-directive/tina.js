/**
 * Always hydrate: immediately in the Tina admin iframe (visual editing),
 * and for normal visitors too — required for interactive blocks like the
 * contact form (onSubmit/state only exist after React mounts).
 * @type {import('astro').ClientDirective}
 */
export default async (load, options, el) => {
  try {
    const hydrate = await load();
    await hydrate();
  } catch (error) {
    console.error("An error occurred in the Tina client directive:", error);
  }
};
