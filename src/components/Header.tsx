"use client";

import React, { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import Image from "next/image";
import "./Header.css";

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

  const changeLanguage = (lng: "sk" | "en" | "ru") => {
    router.replace(pathname, { locale: lng });
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname !== "/") {
      router.push("/");
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
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
        <div className="logo" onClick={handleLogoClick}>
          <Image
            src="/assets/white-eagles-logo-white.webp"
            alt="White Eagles & Co"
            width={200}
            height={40}
            className="logo-img"
            priority
          />
          <span>White Eagles & Co.</span>
        </div>

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
            href="/#about"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            {t("about")}
          </a>
          <a
            href="/#steps"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("process")}
            }
          >
            {t("process")}
          </a>
          <a
            href="/#contacts"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contacts");
            }}
          >
            {t("contacts")}
          </a>

          <div className="lang-switcher">
            <button
              aria-label="Switch to Slovak"
              className={locale === "sk" ? "active" : ""}
              onClick={() => changeLanguage("sk")}
            >
              SK
            </button>
            <button
              aria-label="Switch to Russian"
              className={locale === "ru" ? "active" : ""}
              onClick={() => changeLanguage("ru")}
            >
              RU
            </button>
            <button
              aria-label="Switch to English"
              className={locale === "en" ? "active" : ""}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
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
