import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { getPostBySlug, getAllPosts, getSlugForLocale, shortDescription } from '@/utils/blog';
import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
// Without this, GitHub-flavoured markdown - tables above all - renders as raw
// pipe characters in the middle of the article.
import remarkGfm from 'remark-gfm';
import { AuditCTA } from '@/components/AuditCTA';
import '@/components/AuditCTA.css';
import { getPublicImageSize } from '@/utils/imageSize';
import { AuthorBox } from '@/components/AuthorBox';
import '@/components/AuthorBox.css';
import '../Blog.css';

export function generateStaticParams(props: { params: { locale: string } }) {
  const { locale } = props.params;
  const posts = getAllPosts(locale);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Front matter dates come through either as a string or, when the YAML parser
// recognises them, as a Date. Open Graph wants ISO 8601 either way.
function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString().split('T')[0];
  const raw = String(value).trim();
  return /^\d{4}-\d{2}-\d{2}/.test(raw) ? raw.split('T')[0] : undefined;
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
  // Trimmed to what a search result actually shows, so the snippet ends on a
  // finished sentence instead of Google's own ellipsis.
  const description = shortDescription(post.description);
  const pageUrl = `https://whiteeagles.sk/${locale}/blog/${slug}/`;
  const isEnglish = locale === 'en';

  // The lead image of the article, so a shared link shows the article's own
  // picture instead of nothing. The page body already parses it out for the
  // BlogPosting markup; without this the Open Graph tag was simply absent and
  // every article shared to Telegram or LinkedIn came out as a bare link.
  const imageMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
  const ogImage = imageMatch
    ? (imageMatch[1].startsWith('http') ? imageMatch[1] : `https://whiteeagles.sk${imageMatch[1]}`)
    : 'https://whiteeagles.sk/assets/me.jpg';

  // The English blog is kept out of the index. It collected 696 impressions in
  // a year - 41% of the whole domain - and zero clicks, all from countries the
  // business does not serve, while eating a third of a crawl budget that only
  // stretches to about 40 pages a fortnight. The pages stay reachable; they
  // just stop competing for attention they cannot convert. Drop `en` from the
  // language set too, so hreflang never points at a noindexed page.
  // Each language keeps a slug in its own language, so the counterpart URL is
  // looked up by the shared key rather than assumed to be the same string.
  const skSlug = getSlugForLocale(post.key, 'sk');
  const ruSlug = getSlugForLocale(post.key, 'ru');

  const languages = isEnglish
    ? undefined
    : {
        ...(skSlug ? { sk: `https://whiteeagles.sk/sk/blog/${skSlug}/` } : {}),
        ...(ruSlug ? { ru: `https://whiteeagles.sk/ru/blog/${ruSlug}/` } : {}),
        ...(skSlug ? { 'x-default': `https://whiteeagles.sk/sk/blog/${skSlug}/` } : {}),
      };

  return {
    // The article headline is already the length of a full title tag; the
    // site-wide "%s | White Eagles & Co." template pushed it past what a
    // result shows and the end of the headline was cut off instead.
    title: { absolute: title },
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
      type: 'article',
      // LinkedIn and Facebook read the author and the dates from these
      // og article tags, not from the JSON-LD below. Without them the
      // LinkedIn Post Inspector reports "No author found" and no date,
      // and a shared article loses its byline.
      publishedTime: toIsoDate(post.date),
      modifiedTime: toIsoDate(post.updated || post.date),
      authors: ['Ing. Kirill Mosin'],
      images: [ogImage],
    },
    // Without this the card falls back to the site-wide language image from
    // the layout, so an article shared on X showed the home page picture.
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
  
  const tCta = await getTranslations({ locale, namespace: 'cta' });
  const tAuthor = await getTranslations({ locale, namespace: 'author' });
  const tServices = await getTranslations({ locale, namespace: 'services' });
  const authorServices = ['webdev', 'bugfix', 'ads', 'analytics'].map((id) => ({
    href: `/${locale}/service/${id}/`,
    label: tServices(`${id}.title`),
  }));
  let ctaIndex = 0;
  let imageIndex = 0;

  // Articles pick which offer each form makes: [CTA_FORM:webdev] and so on.
  // A bare [CTA_FORM] falls back to a soft consultation rather than pushing
  // the same free audit three times down one page.
  const CTA_VARIANTS = ['consult', 'webdev', 'bugfix', 'audit', 'analytics', 'cookies', 'ads', 'bot'];

  // Which order form each variant opens. The article has already told the
  // reader what they need, so the form should not ask them again; only the
  // soft consultation stays a general enquiry.
  const CTA_SERVICE: Record<string, string | undefined> = {
    consult: undefined,
    webdev: 'webdev',
    bugfix: 'bugfix',
    audit: 'audit',
    analytics: 'analytics',
    cookies: 'cookies',
    ads: 'ads',
    bot: 'telegram',
  };

  // The author box at the foot of the article offers the same thing the
  // article's first call to action did. Read from the source rather than from
  // the renderer, because the markdown is rendered further down the tree.
  const firstCtaMatch = post.content.match(/^\[CTA_FORM(?::([a-z]+))?\]$/m);
  const firstCtaVariant = firstCtaMatch && CTA_VARIANTS.includes(firstCtaMatch[1] ?? '')
    ? firstCtaMatch[1]!
    : 'consult';
  const authorService = CTA_SERVICE[firstCtaVariant];

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
        "dateModified": post.updated || post.date,
        "mainEntityOfPage": `https://whiteeagles.sk/${locale}/blog/${slug}/`,
        "image": postImage,
        "author": {
          "@type": "Person",
          "name": "Ing. Kirill Mosin",
          "url": "https://whiteeagles.sk/"
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
      },
      // Only emitted when the article actually declares questions, so the
      // markup never claims content the page does not have.
      ...(post.faq.length
        ? [{
            "@type": "FAQPage",
            "@id": `https://whiteeagles.sk/${locale}/blog/${slug}/#faq`,
            "mainEntity": post.faq.map((item) => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": { "@type": "Answer", "text": item.a },
            })),
          }]
        : []),
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

                  const cta = raw && raw.trim().match(/^\[CTA_FORM(?::([a-z]+))?\]$/);
                  if (cta) {
                    ctaIndex += 1;
                    const variant = CTA_VARIANTS.includes(cta[1] ?? '') ? cta[1]! : 'consult';
                    return (
                      <AuditCTA
                        title={tCta(`${variant}.title` as any)}
                        text={tCta(`${variant}.text` as any)}
                        buttonText={tCta(`${variant}.button` as any)}
                        position={`blog_${slug}_${ctaIndex}_${variant}`}
                        service={CTA_SERVICE[variant]}
                      />
                    );
                  }
                  
                  return <p>{children}</p>;
                },
                // Every image in an article used to arrive with no dimensions
                // at all, so the text jumped down the page each time one
                // loaded. The size is read out of the file itself at build
                // time. The first image is the one the reader sees before
                // scrolling: it is fetched at high priority and never lazily,
                // while everything further down waits until it is near.
                img: ({ node, src, alt, title, ...rest }) => {
                  imageIndex += 1;
                  const isHero = imageIndex === 1;
                  const source = typeof src === 'string' ? src : '';
                  const size = getPublicImageSize(source);

                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={source}
                      alt={alt ?? ''}
                      {...(title ? { title } : {})}
                      {...(size ? { width: size.width, height: size.height } : {})}
                      {...(isHero
                        ? { fetchPriority: 'high' as const }
                        : { loading: 'lazy' as const, decoding: 'async' as const })}
                      {...rest}
                    />
                  );
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

          {/* The front-matter FAQ used to exist only as FAQPage markup, on a
              page where the reader could not see a word of it. Google's
              structured-data guidelines require the content to be visible, so
              it is rendered here rather than dropped - the answers are worth
              reading, and several of them are what people actually searched
              for to arrive on the page. */}
          {post.faq.length > 0 && (
            <section className="post-faq">
              <h2>{t('faq_title')}</h2>
              <div className="post-faq-list">
                {post.faq.map((item, i) => (
                  <details key={i} className="post-faq-item">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* A reader who reached the end is the one most likely to write, and
              the page used to stop dead here. The offer repeats the one the
              article's first call to action made. */}
          <AuthorBox
            line={tAuthor('line')}
            buttonText={tAuthor('button')}
            telegramText={locale === 'ru' ? tAuthor('telegram') : undefined}
            service={authorService}
            location={`blog_${slug}_author`}
            services={authorServices}
          />
        </article>
      </div>
    </div>
  );
}
