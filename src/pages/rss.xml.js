import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { client } from '../../tina/__generated__/client';

export async function GET(context) {
  const configResponse = await client.queries.config({ relativePath: 'config.json' });
  const siteSettings = configResponse.data.config;

  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: siteSettings.seo?.title || 'LighterDay',
    description: siteSettings.seo?.description || '',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}