import { Metadata } from "next";
import RootRedirect from "../../RootRedirect";
import { getAllPosts } from "@/utils/blog";

export function generateStaticParams() {
  // We only need slugs to generate the root redirects
  // Since all locales have the same articles (slugs), we just get them from 'sk'
  const posts = getAllPosts('sk');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata: Metadata = {
  title: "Blog & Novinky | White Eagles & Co.",
  description: "Blog o web developmente, online marketingu a analytike v oblasti tvorby webstránok a PPC.",
  robots: {
    index: false,
    follow: true,
  },
};

export default async function BlogPostRedirectPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=/sk/blog/${slug}`} />
      </noscript>
      <RootRedirect targetPath={`/blog/${slug}`} />
    </>
  );
}
