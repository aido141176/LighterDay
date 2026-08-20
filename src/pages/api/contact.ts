// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // Use Basic Auth strings required by WordPress/Gravity Forms
    const key = import.meta.env.GF_CONSUMER_KEY;
    const secret = import.meta.env.GF_CONSUMER_SECRET;
    const authHeader = btoa(`${key}:${secret}`);

    // Assuming form ID is 1 for your contact form
    const formId = 1; 
    const gfUrl = `https://amcd.com.au{formId}/submissions`;

    const response = await fetch(gfUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authHeader}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
};
