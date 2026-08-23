import type { APIRoute } from 'astro';

export const prerender = false;

const FORM_ID = 2;
const DATE_FIELD_ID = '3';
const TIME_FIELD_ID = '4';

// Strip stray wrapping quotes so .env parsing differences can't corrupt credentials
const clean = (v: string | undefined | null) =>
  (v ?? '').trim().replace(/^["']+|["']+$/g, '');

export const GET: APIRoute = async () => {
  const emptyResult = JSON.stringify({ bookedSlots: {} });
  try {
    const key = clean(process.env.GF_CONSUMER_KEY ?? import.meta.env.GF_CONSUMER_KEY);
    const secret = clean(process.env.GF_CONSUMER_SECRET ?? import.meta.env.GF_CONSUMER_SECRET);

    if (!key || !secret) {
      console.error('Missing Gravity Forms credentials.');
      return new Response(emptyResult, { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const gfUrl = `https://api.amcd.com.au/wp-json/gf/v2/forms/${FORM_ID}/entries?paging%5Bpage_size%5D=1000`;

    const response = await fetch(gfUrl, {
      headers: {
        Authorization: `Basic ${auth}`,
        // Some WAFs block requests without a UA header and answer with an HTML challenge page
        'User-Agent': 'Mozilla/5.0 (compatible; LighterDaySite/1.0)',
      },
    });

    const raw = await response.text();
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      console.error('GF entries returned non-JSON:', response.status, raw.slice(0, 300));
      return new Response(emptyResult, { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (!response.ok) {
      console.error('GF entries request failed:', response.status, raw.slice(0, 300));
      return new Response(emptyResult, { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const bookedSlots: Record<string, string[]> = {};
    for (const entry of data?.entries ?? []) {
      const date = entry[DATE_FIELD_ID];
      const time = entry[TIME_FIELD_ID];
      if (!date || !time) continue;
      if (!bookedSlots[date]) bookedSlots[date] = [];
      bookedSlots[date].push(time);
    }

    return new Response(
      JSON.stringify({ bookedSlots }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Booked-slots API error:', error);
    return new Response(emptyResult, { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};
