import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { portfolio } from '../data/portfolio';
import './PortfolioCarousel.css';

export const PortfolioCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extend portfolio to handle the "wrap around" visual if we show 3 items
  // We append the first 2 items to the end so when we are at the last index, we see [Last, First, Second]
  const extendedPortfolio = [...portfolio, ...portfolio.slice(0, 2)];

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
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {extendedPortfolio.map((item, index) => (
            <div key={`${item.id}-${index}`} className="portfolio-slide">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="portfolio-card-slide">
                <div className="portfolio-img-slide">
                   <img 
                      src={item.image || `https://placehold.co/600x400/374161/FFF?text=${item.title}`} 
                      alt={item.title} 
                    />
                </div>
                <div className="portfolio-content-slide">
                  <h3>{item.title}</h3>
                  <p>{t(item.descKey)}</p>
                  <span className="portfolio-link">{t('common.visit', 'Visit Website')} <ExternalLink size={16} /></span>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-nav-btn next" onClick={nextSlide} aria-label="Next Project">
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Indicators if needed, but user didn't ask for them specifically, better remove to keep it clean 'stylish' or keep minimalist */}
    </div>
  );
};
