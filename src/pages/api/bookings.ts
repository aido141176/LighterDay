import type { APIRoute } from 'astro';

export const prerender = false;

const FORM_ID = 2;

// Strip stray wrapping quotes so .env parsing differences can't corrupt credentials
const clean = (v: string | undefined | null) =>
  (v ?? '').trim().replace(/^["']+|["']+$/g, '');

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const name = String(body?.name ?? '').trim();
    const email = String(body?.email ?? '').trim();
    const phone = String(body?.phone ?? '').trim();
    const date = String(body?.date ?? '').trim();
    const time = String(body?.time ?? '').trim();

    if (!name || !email || !phone || !date || !time) {
      return new Response(
        JSON.stringify({ error: 'Name, email, phone number, date and time are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const key = clean(process.env.GF_CONSUMER_KEY ?? import.meta.env.GF_CONSUMER_KEY);
    const secret = clean(process.env.GF_CONSUMER_SECRET ?? import.meta.env.GF_CONSUMER_SECRET);

    if (!key || !secret) {
      console.error('Missing Gravity Forms credentials.');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const gfUrl = `https://api.amcd.com.au/wp-json/gf/v2/forms/${FORM_ID}/submissions`;

    const response = await fetch(gfUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
        'User-Agent': 'Mozilla/5.0 (compatible; LighterDaySite/1.0)',
      },
      body: JSON.stringify({
        input_1: name,
        input_3: date,
        input_4: time,
        input_6: phone,
        input_7: email,
      }),
    });

    // Parse defensively: WAFs can answer with HTML challenge pages
    const raw = await response.text();
    let result: any;
    try {
      result = JSON.parse(raw);
    } catch {
      console.error('GF submission returned non-JSON:', response.status, raw.slice(0, 300));
      return new Response(
        JSON.stringify({ error: 'Booking service is temporarily unavailable. Please try again.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Bookings API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
