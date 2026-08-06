import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'cases');

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  /** Brand name as the client writes it, used in headings and schema. */
  client: string;
  /** Live site. Kept in one place so a client that goes offline is one edit. */
  url: string;
  image: string;
  /** Short line for the index cards - the description is written for search. */
  summary: string;
  /** Service labels, rendered as chips and used to link back to the service. */
  services: string[];
  /** Slug of the service page this case argues for, e.g. "webdev". */
  service: string;
  content: string;
  locale: string;
  /**
   * Stable identifier shared by every language version. It is what lets each
   * language keep a slug in its own language - see rule 11 in AGENTS.md.
   * Falls back to the slug for cases written before this existed.
   */
  key: string;
  /** Sort key. Lower comes first, so the strongest cases lead the index. */
  order: number;
}

export function getCaseBySlug(slug: string, locale: string): CaseStudy | null {
  try {
    const fullPath = path.join(contentDir, locale, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));

    return {
      slug,
      key: typeof data.key === 'string' && data.key ? data.key : slug,
      title: data.title,
      description: data.description,
      client: data.client,
      url: data.url,
      image: data.image,
      summary: data.summary,
      services: Array.isArray(data.services) ? data.services : [],
      service: data.service,
      content,
      locale,
      order: typeof data.order === 'number' ? data.order : 99,
    };
  } catch (error) {
    console.error(`Error reading case ${slug} in locale ${locale}:`, error);
    return null;
  }
}

export function getAllCases(locale: string): CaseStudy[] {
  try {
    const dirPath = path.join(contentDir, locale);

    if (!fs.existsSync(dirPath)) {
      return [];
    }

    return fs
      .readdirSync(dirPath)
      .filter((file) => file.endsWith('.md'))
      .map((file) => getCaseBySlug(file.replace(/\.md$/, ''), locale))
      .filter((item): item is CaseStudy => item !== null)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error reading cases for locale ${locale}:`, error);
    return [];
  }
}

/**
 * The slug this case uses in another language, or null when that language has
 * no version of it. hreflang must never name a URL that does not exist.
 */
export function getCaseSlugForLocale(key: string, locale: string): string | null {
  const match = getAllCases(locale).find((item) => item.key === key);
  return match ? match.slug : null;
}
