// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

// 4. Define a `loader` and `schema` for each collection
const Articles = defineCollection({
    loader: glob({ base: "./articles", pattern: "**/*.{md,mdx}" }),
    schema: z.object({
        Author: z.string(),
        Title: z.string(),
        Caption: z.string(),
        Published: z.coerce.date(),
        Series: z.string().optional(),
        Tags: z.array(z.string()).optional(),
        Cover: z.string().optional(),
        Draft: z.coerce.boolean().optional(),
    }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { Articles };