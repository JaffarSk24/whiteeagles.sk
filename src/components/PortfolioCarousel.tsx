"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { portfolio } from "../data/portfolio";
import Image from "next/image";
import "./PortfolioCarousel.css";

export const PortfolioCarousel: React.FC = () => {
  const t = useTranslations();
  const tCommon = useTranslations("common");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setItemsPerPage(1);
      } else if (window.innerWidth <= 900) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const extendedPortfolio = [...portfolio, ...portfolio.slice(0, itemsPerPage - 1)];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolio.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
  };

  return (
    <div className="portfolio-carousel-wrapper">
      <button className="carousel-nav-btn prev" onClick={prevSlide} aria-label="Previous Project">
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <div className="portfolio-carousel-container">
        <div
          className="portfolio-track"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
        >
          {extendedPortfolio.map((item, index) => (
            <div key={`${item.id}-${index}`} className="portfolio-slide">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-card-slide">
                <div className="portfolio-img-slide">
                  <Image
                    src={item.image || `https://placehold.co/600x400/374161/FFF?text=${item.title}`}
                    alt={item.title}
                    width={800}
                    height={400}
                  />
                </div>
                <div className="portfolio-content-slide">
                  <h3>{item.title}</h3>
                  <p>{t(item.descKey as any)}</p>
                  <span className="portfolio-link">
                    {tCommon("visit")} <ExternalLink size={16} />
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-nav-btn next" onClick={nextSlide} aria-label="Next Project">
        <ChevronRight size={48} strokeWidth={1} />
      </button>
    </div>
  );
};
