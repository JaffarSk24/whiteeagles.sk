import { Metadata } from "next";
import RootRedirect from "./RootRedirect";

export const metadata: Metadata = {
  title: "White Eagles & Co.",
  description: "Web development and digital solutions",
  alternates: {
    canonical: "https://whiteeagles.sk/sk",
  },
};

export default function RootPage() {
  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/sk/" />
      </noscript>
      <RootRedirect />
    </>
  );
}
