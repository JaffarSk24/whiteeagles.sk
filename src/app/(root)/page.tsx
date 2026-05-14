import { Metadata } from "next";
import RootRedirect from "./RootRedirect";

export const metadata: Metadata = {
  title: "White Eagles & Co.",
  description: "Profesionálna tvorba webstránok, dátová analytika a online marketing na Slovensku. Weby na mieru, oprava chýb a PPC kampane pre rast vášho podnikania.",
  alternates: {
    canonical: "https://whiteeagles.sk/sk/",
  },
  robots: {
    index: false,
    follow: true,
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
