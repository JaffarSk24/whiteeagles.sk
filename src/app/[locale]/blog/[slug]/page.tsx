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
  
  const title = post.title;
  const description = post.description;
  const pageUrl = `https://whiteeagles.sk/${locale}/blog/${slug}/`;
  
  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        sk: `https://whiteeagles.sk/sk/blog/${slug}/`,
        en: `https://whiteeagles.sk/en/blog/${slug}/`,
        ru: `https://whiteeagles.sk/ru/blog/${slug}/`,
        'x-default': `https://whiteeagles.sk/sk/blog/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
    },
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
  
  const homeName = locale === "ru" ? "Главная" : locale === "sk" ? "Domov" : "Home";
  const blogName = locale === "ru" ? "Блог" : locale === "sk" ? "Blog" : "Blog";
  
  const imageMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  const postImage = imageMatch 
    ? (imageMatch[1].startsWith('http') ? imageMatch[1] : `https://whiteeagles.sk${imageMatch[1]}`)
    : 'https://whiteeagles.sk/assets/me.jpg';

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `https://whiteeagles.sk/${locale}/blog/${slug}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": homeName,
            "item": `https://whiteeagles.sk/${locale}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": blogName,
            "item": `https://whiteeagles.sk/${locale}/blog/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `https://whiteeagles.sk/${locale}/blog/${slug}/`
          }
        ]
      },
      {
        "@type": "BlogPosting",
        "@id": `https://whiteeagles.sk/${locale}/blog/${slug}/#blogposting`,
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "dateModified": post.date,
        "mainEntityOfPage": `https://whiteeagles.sk/${locale}/blog/${slug}/`,
        "image": postImage,
        "author": {
          "@type": "Person",
          "name": "Kirill Mosin",
          "url": "https://whiteeagles.sk"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://whiteeagles.sk/#organization",
          "name": "White Eagles & Co.",
          "logo": {
            "@type": "ImageObject",
            "url": "https://whiteeagles.sk/assets/white-eagles-logo-white.webp"
          }
        }
      }
    ]
  };

  return (
    <div className="blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
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
