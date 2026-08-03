import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getAllPosts } from '@/utils/blog';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// Without this, GitHub-flavoured markdown - tables above all - renders as raw
// pipe characters in the middle of the article.
import remarkGfm from 'remark-gfm';
import { AuditCTA } from '@/components/AuditCTA';
import '@/components/AuditCTA.css';
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
  const isEnglish = locale === 'en';

  // The English blog is kept out of the index. It collected 696 impressions in
  // a year - 41% of the whole domain - and zero clicks, all from countries the
  // business does not serve, while eating a third of a crawl budget that only
  // stretches to about 40 pages a fortnight. The pages stay reachable; they
  // just stop competing for attention they cannot convert. Drop `en` from the
  // language set too, so hreflang never points at a noindexed page.
  const languages = isEnglish
    ? undefined
    : {
        sk: `https://whiteeagles.sk/sk/blog/${slug}/`,
        ru: `https://whiteeagles.sk/ru/blog/${slug}/`,
        'x-default': `https://whiteeagles.sk/sk/blog/${slug}/`,
      };

  return {
    title,
    description,
    ...(isEnglish ? { robots: { index: false, follow: true } } : {}),
    alternates: {
      canonical: pageUrl,
      ...(languages ? { languages } : {}),
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
  
  const tAudit = await getTranslations({ locale, namespace: 'audit' });
  let ctaIndex = 0;

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
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, children }) => {
                  // Check if the paragraph text is exactly [CTA_FORM]
                  const raw = Array.isArray(children) && children.length === 1 && typeof children[0] === 'string'
                    ? children[0]
                    : typeof children === 'string'
                    ? children
                    : null;

                  if (raw && raw.trim() === '[CTA_FORM]') {
                    ctaIndex += 1;
                    return (
                      <AuditCTA
                        title={t('cta_title')}
                        text={tAudit('cta_text')}
                        buttonText={t('cta_button')}
                        position={`blog_${slug}_${ctaIndex}`}
                      />
                    );
                  }
                  
                  return <p>{children}</p>;
                },
                // A comparison table wider than a phone screen has to scroll
                // inside its own box, not drag the whole page sideways.
                table: ({ children }) => (
                  <div className="table-scroll">
                    <table>{children}</table>
                  </div>
                ),
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
