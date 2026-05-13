import { Metadata } from "next";
import RootRedirect from "../RootRedirect";

export const metadata: Metadata = {
  title: "Blog & Novinky | White Eagles & Co.",
  description: "Blog o web developmente, online marketingu a analytike v oblasti tvorby webstránok a PPC.",
  alternates: {
    canonical: "https://whiteeagles.sk/sk/blog",
  },
};

export default function BlogRedirectPage() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/sk/blog/" />
      </noscript>
      <RootRedirect targetPath="/blog" />
    </>
  );
}
