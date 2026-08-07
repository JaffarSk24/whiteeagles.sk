"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";
import slugMap from "@/data/slug-map.json";
import "./Header.css";

const LOCALE_NAMES = { sk: "Slovak", ru: "Russian", en: "English" } as const;

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const t = useTranslations("header");
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Articles and cases carry a different slug in every language, so the path
  // has to be translated rather than reused. Falls back to the section index
  // when a version is missing, which beats sending the visitor to a 404.
  const translatePath = (target: "sk" | "en" | "ru") => {
    const match = pathname.match(/^\/(blog|case)\/([^/]+)\/?$/);
    if (!match) return pathname;

    const [, kind, slug] = match;
    const section: Record<string, Partial<Record<string, string>>> =
      slugMap[kind as "blog" | "case"];
    const translated = section[slug]?.[target];
    if (translated) return `/${kind}/${translated}`;
    return kind === "blog" ? "/blog" : "/portfolio";
  };

  const changeLanguage = (lng: "sk" | "en" | "ru") => {
    if (typeof window !== "undefined") {
      localStorage.setItem("NEXT_LOCALE", lng);
    }
    router.replace(translatePath(lng), { locale: lng });
    setIsMobileMenuOpen(false);
  };

  // The logo is a link to the home page; this only adds the scroll-to-top that
  // a plain link would not do when you are already there.
  const handleLogoClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="container header-content">
        <Link href="/" className="logo" onClick={handleLogoClick}>
          <Image
            src="/assets/white-eagles-logo-white.webp"
            alt="White Eagles & Co"
            width={200}
            height={40}
            className="logo-img"
            priority
          />
          <span>White Eagles & Co.</span>
        </Link>

        <nav className={`nav-links ${isMobileMenuOpen ? "nav-active" : ""}`}>
          <a
            href="/#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("services");
            }}
          >
            {t("services")}
          </a>
          <a
            href="/#portfolio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("portfolio");
            }}
          >
            {t("portfolio")}
          </a>
          <a
            href="/#testimonials"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("testimonials");
            }}
          >
            {t("testimonials")}
          </a>
          <a
            href="/#process"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("process")}
            }
          >
            {t("process")}
          </a>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>
            {t("blog")}
          </Link>
          <a
            href="/#contacts"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contacts");
            }}
          >
            {t("contacts")}
          </a>

          {/* Deliberately buttons, not links. Every article now exists in all
              three languages, but each language has its own slug, so a link
              built from the current path would point at a 404 and a crawler
              would follow it. The switcher translates the slug itself (see
              changeLanguage); language versions stay declared per page with
              hreflang in <head>, which is the documented mechanism. */}
          <div className="lang-switcher">
            {(["sk", "ru", "en"] as const).map((lng) => (
              <button
                key={lng}
                aria-label={`Switch to ${LOCALE_NAMES[lng]}`}
                className={locale === lng ? "active" : ""}
                onClick={() => changeLanguage(lng)}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Order button inside burger menu — mobile only */}
          <button
            className="btn btn-activate nav-order-btn"
            onClick={() => {
              onOrderClick();
              setIsMobileMenuOpen(false);
            }}
          >
            {t("order")}
          </button>
        </nav>

        <button className="btn btn-activate btn-order" onClick={onOrderClick}>
          {t("order")}
        </button>

        <button
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};
