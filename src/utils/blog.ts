import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  locale: string;
  /**
   * Stable identifier shared by every language version of one article. It is
   * what lets each language keep a slug in its own language: without it the
   * hreflang tags and the sitemap can only pair versions that happen to have
   * the same file name. Falls back to the slug for articles written before
   * this existed.
   */
  key: string;
  /**
   * Questions declared in front matter. They are emitted as FAQPage markup,
   * which is what puts an article into the "People also ask" block - the
   * prose alone does not do it.
   */
  faq: BlogFaqItem[];
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDir, locale, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const faq: BlogFaqItem[] = Array.isArray(data.faq)
      ? data.faq.filter((item: BlogFaqItem) => item && item.q && item.a)
      : [];

    return {
      slug,
      key: typeof data.key === 'string' && data.key ? data.key : slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
      locale,
      faq
    };
  } catch (error) {
    console.error(`Error reading post ${slug} in locale ${locale}:`, error);
    return null;
  }
}

export function getAllPosts(locale: string): BlogPost[] {
  try {
    const dirPath = path.join(contentDir, locale);
    
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    
    const files = fs.readdirSync(dirPath);
    
    const posts = files
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const slug = file.replace(/\.md$/, '');
        return getPostBySlug(slug, locale);
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => (a.date > b.date ? -1 : 1));
      
    return posts;
  } catch (error) {
    console.error(`Error reading posts for locale ${locale}:`, error);
    return [];
  }
}

/**
 * The slug the same article uses in another language, or null when that
 * language has no version of it. hreflang must never name a URL that does not
 * exist, so the caller drops the locale when this returns null.
 */
export function getSlugForLocale(key: string, locale: string): string | null {
  const match = getAllPosts(locale).find((post) => post.key === key);
  return match ? match.slug : null;
}
