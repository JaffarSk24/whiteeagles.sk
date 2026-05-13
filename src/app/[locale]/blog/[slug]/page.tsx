import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getAllPosts } from '@/utils/blog';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { BlogCTA } from '@/components/BlogCTA';
import '../Blog.css';

export function generateStaticParams(props: { params: { locale: string } }) {
  const { locale } = props.params;
  const posts = getAllPosts(locale);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: `${post.title} | White Eagles & Co.`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="blog-post-page">
      <div className="container">
        <Link href="/blog" className="back-link">
          <ArrowLeft size={16} /> {t('back_to_blog')}
        </Link>
        
        <article className="post-article">

          
          <div className="post-content">
            <ReactMarkdown
              components={{
                p: ({ node, children }) => {
                  // Check if the paragraph text is exactly [CTA_FORM]
                  if (
                    children && 
                    Array.isArray(children) && 
                    children.length === 1 && 
                    typeof children[0] === 'string' && 
                    children[0].trim() === '[CTA_FORM]'
                  ) {
                    return <BlogCTA title={t('cta_title')} buttonText={t('cta_button')} />;
                  }
                  
                  // For normal strings, check if they contain [CTA_FORM]
                  if (typeof children === 'string' && children.trim() === '[CTA_FORM]') {
                     return <BlogCTA title={t('cta_title')} buttonText={t('cta_button')} />;
                  }
                  
                  return <p>{children}</p>;
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
