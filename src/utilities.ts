import Site from "Content:/site.json";
import type { PageMetadata } from "./types";

export const SiteSettings = Site;

export const GetPageProperties = <T extends Record<string, any>>(path: string) => {
    const pages = SiteSettings.Pages as unknown as Record<string, { Metadata: PageMetadata } & T>;
    const normalizedPath = path === "/" ? path : path.replace(/\/$/, "");
    return pages[normalizedPath];
};

export const FilterDraftsOnProduction = ({ data }: { data: { Draft?: boolean } }) => {
    return import.meta.env.PROD ? data.Draft !== true : true;
};

export const ToShortDate = (e: Date) => {
    return e.toISOString().split("T")[0]
}

export const ToDescriptiveDate = (e: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    }).format(e);
}

export const Slugify = (e: string) => e.trim().toLowerCase().replace(/\s+/g, "-");