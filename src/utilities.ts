import Site from "Assets:/site.json";
import type { ArticleFrontmatter, PageMetadata } from "./types";
import type { MarkdownLayoutProps } from "astro";

export const SiteSettings = Site;

export const GetPageProperties = <T extends Record<string, any>>(path: string) => {
    const pages = SiteSettings.Pages as unknown as Record<string, { Metadata: PageMetadata } & T>;
    return pages[path];
};

export const FilterDraftsOnProduction = ({ data }: { data: { Draft?: boolean } }) => {
    return import.meta.env.PROD ? data.Draft !== true : true;
};

export const ToShortDate = (e: Date) => {
    return e.toISOString().split('T')[0]
}