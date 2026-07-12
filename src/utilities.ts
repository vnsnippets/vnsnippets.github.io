import Site from "Assets:/site.json";
import type { ArticleFrontmatter, PageMetadata } from "./types";
import type { MarkdownLayoutProps } from "astro";

export const SiteSettings = Site;

export const GetPageProperties = <T extends Record<string, any>>(path: string) => {
    const pages = SiteSettings.Pages as unknown as Record<string, { Metadata: PageMetadata } & T>;
    return pages[path];
};

const ArticlesGlobs = Object.values(
    import.meta.glob("/src/pages/articles/*/*.md", { eager: true })
) as MarkdownLayoutProps<ArticleFrontmatter>[];

export const ArticlesByPublishedDate = ArticlesGlobs
    .filter((e) => e.frontmatter)
    .map((e) => {
        return {
            Date: new Date(e.frontmatter.Published),
            Article: e
        }
    })

export const ToShortDate = (e: Date) => {
    return e.toISOString().split('T')[0]
}