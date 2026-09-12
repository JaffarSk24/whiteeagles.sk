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
  // Set when an article is materially revised; feeds dateModified and the
  // sitemap lastmod while the visible publication date stays the same.
  updated?: string;
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
      updated: data.updated,
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

/**
 * Words that end in a full stop without ending a sentence. Without this list
 * "Kompletný rozbor registrácie s.r.o. Lehoty, poplatky…" is cut after the
 * company form and the description reads as four words.
 */
const ABBREVIATIONS = new Set([
  'napr', 'resp', 'tzv', 'tzn', 'atd', 'atď', 'str', 'cca', 'tis', 'mil', 'mld',
  'č', 'kap', 'obr', 'tab', 'napr', 'zb', 'sb',
  'напр', 'руб', 'см', 'стр', 'тыс', 'млн', 'млрд', 'рис', 'табл',
  'etc', 'vs', 'approx', 'no', 'fig', 'incl',
]);

/**
 * Whether the punctuation mark at `index` really closes a sentence.
 */
function endsSentence(text: string, index: number): boolean {
  if (text[index] !== '.') return true;

  const word = (text.slice(0, index).match(/\S+$/) ?? [''])[0];

  // s.r.o., a.s., t.j. - a full stop inside the word gives it away.
  if (word.includes('.')) return false;
  // A single letter before the stop is an initial, not the end of a thought.
  if (word.length <= 1) return false;

  return !ABBREVIATIONS.has(word.toLowerCase());
}

/**
 * A description short enough to survive a search result. Google shows roughly
 * 155 characters; anything longer is cut mid-word with an ellipsis that the
 * author did not write. Cutting at the last sentence end before the limit
 * keeps the snippet a finished thought, and the last space is the fallback
 * when the text has no sentence break that early.
 */
export function shortDescription(text: string, limit = 155): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();

  if (clean.length <= limit) {
    return clean;
  }

  const window = clean.slice(0, limit);

  for (let i = window.length - 2; i >= 0; i -= 1) {
    const mark = window[i];
    if ((mark === '.' || mark === '?' || mark === '!') && window[i + 1] === ' ') {
      if (endsSentence(window, i)) {
        // Keep the punctuation mark, drop the space that followed it.
        return window.slice(0, i + 1);
      }
    }
  }

  // No sentence ends early enough: cut on a word boundary and say so, rather
  // than leaving the line hanging in the middle of a thought.
  const space = window.lastIndexOf(' ');
  const cut = space > 0 ? window.slice(0, space) : window.slice(0, limit - 1);

  return `${cut.replace(/[\s,;:\u2014\u2013-]+$/, '')}\u2026`;
}
