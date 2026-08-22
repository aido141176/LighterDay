import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Parse the incoming form data sent by your ContactForm component
    const data = await request.json();

    // 2. Pull your hidden Gravity Forms credentials from environment variables
    // process.env first so Vercel runtime vars work even if not present at build time
    const key = process.env.GF_CONSUMER_KEY ?? import.meta.env.GF_CONSUMER_KEY;
    const secret = process.env.GF_CONSUMER_SECRET ?? import.meta.env.GF_CONSUMER_SECRET;

    if (!key || !secret) {
      console.error("Missing Gravity Forms credentials in environment variables.");
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Construct the Basic Authentication string (base64 encoded) required by WP
    const authHeader = btoa(`${key}:${secret}`);

    // 4. Point this to your Gravity Forms public submission endpoint
    // Double-check your form ID number inside WordPress! (Assuming it's Form ID 1 here)
    const formId = 1;
    const gfUrl = `https://api.amcd.com.au/wp-json/gf/v2/forms/${formId}/submissions`;

    // 5. Send the payload safely to your WordPress backend server
    const response = await fetch(gfUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authHeader}`
      },
      body: JSON.stringify(data)
    });

    // 6. Pass the WordPress response status and message right back to your React form.
    // Parse defensively: WP/WAF may return HTML (404 page, challenge) which would throw on .json()
    const raw = await response.text();
    let result;
    try {
      result = JSON.parse(raw);
    } catch {
      console.error("Gravity Forms returned non-JSON response:", response.status, raw.slice(0, 500));
      result = { error: 'Unexpected response from form server' };
    }

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("API proxy error:", error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
