import type { CollectionEntry } from "astro:content";

export type PageMetadata = {
    // Core SEO
    Title: string;
    Description?: string;

    // Open Graph & Socials
    OpenGraph?: {
        Type?: "website" | "article" | "profile",
        Image?: { Source: string, Caption: string }
    }

    // Robots & Visibility
    Hidden?: boolean;

    // Schema Structured Data
    Schema?: Record<string, any>;

    Keywords?: string[];
}

export type NavigationItem = {
    Hyperlink: string;
    Label: string;
    Icon?: undefined;
}

export type ArticleFrontmatter = {
    Title: string
    Caption: string
    Published: string
    Series?: string
    Tags?: string[]
    Cover?: string
    Draft?: boolean
} & {
    file: string,
    url: string | undefined
}
// export type ArticleWithURL = CollectionEntry<'Articles'> & {
//     url: string;
// };

export namespace CollectionTypes {
    export type Article = CollectionEntry<"Articles">
}