import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";

const blog = defineCollection({
loader: async () => {
  const postsResponse = await client.queries.blogConnection();
  
  // Use "|| []" to ensure we always return an array, never undefined
  return (postsResponse.data.blogConnection.edges || [])
    .filter((p) => !!p && p.node) // Ensure node exists
    .map((p) => {
      const node = p!.node!; // The ! tells TS we know it's not null here

      return {
        ...node,
        // Force the ID to be a string (no "undefined")
        id: node._sys.relativePath.replace(/\.mdx?$/, "") || "index",
        tinaInfo: node._sys,
      };
    });
},
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
  }),
});

const page = defineCollection({
loader: async () => {
  const postsResponse = await client.queries.pageConnection();
  
  // Use "|| []" to ensure we always return an array, never undefined
  return (postsResponse.data.pageConnection.edges || [])
    .filter((p) => !!p && p.node) // Ensure node exists
    .map((p) => {
      const node = p!.node!; // The ! tells TS we know it's not null here

      return {
        ...node,
        // Force the ID to be a string (no "undefined")
        id: node._sys.relativePath.replace(/\.mdx?$/, "") || "index",
        tinaInfo: node._sys,
      };
    });
},
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    seo: z.object({
      // Use .nullish() instead of .optional()
      title: z.string().nullish(),
      description: z.string().nullish(),
      image: z.string().nullish(),
    }).nullish(), //
    body: z.any(),
  }),
})
export const collections = { blog, page };
