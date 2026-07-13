import Site from "Assets:/site.json";
import type { PageMetadata } from "./types";

export const SiteSettings = Site;

export const GetPageProperties = <T extends Record<string, any>>(path: string) => {
    const pages = SiteSettings.Pages as unknown as Record<string, { Metadata: PageMetadata } & T>;
    
    // Normalize path: replace trailing slash unless it's the root "/"
    const normalizedPath = path === "/" ? path : path.replace(/\/$/, "");
    return pages[normalizedPath];
};

export const FilterDraftsOnProduction = ({ data }: { data: { Draft?: boolean } }) => {
    return import.meta.env.PROD ? data.Draft !== true : true;
};

export const ToShortDate = (e: Date) => {
    return e.toISOString().split('T')[0]
}

export const Slugify = (e: string) => e.trim().toLowerCase().replace(/\s+/g, "-");