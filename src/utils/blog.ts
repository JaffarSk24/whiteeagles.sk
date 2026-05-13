import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  locale: string;
}

export function getPostBySlug(slug: string, locale: string): BlogPost | null {
  try {
    const fullPath = path.join(contentDir, locale, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      content,
      locale
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
