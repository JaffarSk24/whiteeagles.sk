import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'auto' }); // Instant scroll for new page load feel
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      setIsMobileMenuOpen(false);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo" onClick={handleLogoClick}>
          <img src="/assets/white-eagles-logo-white.png" alt="White Eagles & Co." className="logo-img" />
          <span>White Eagles & Co.</span>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
          <a href="/#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>{t('header.services', 'Services')}</a>
          <a href="/#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>{t('header.portfolio', 'Portfolio')}</a>
          <a href="/#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('header.about', 'About')}</a>
          <a href="/#steps" onClick={(e) => { e.preventDefault(); scrollToSection('steps'); }}>{t('header.process', 'Process')}</a>
          <a href="/#contacts" onClick={(e) => { e.preventDefault(); scrollToSection('contacts'); }}>{t('header.contacts', 'Contacts')}</a>
          
          <div className="lang-switcher">
            <button aria-label="Switch to Slovak" className={(i18n.language === 'sk' || !i18n.language || i18n.language.startsWith('sk')) ? 'active' : ''} onClick={() => changeLanguage('sk')}>SK</button>
            <button aria-label="Switch to Russian" className={i18n.language?.startsWith('ru') ? 'active' : ''} onClick={() => changeLanguage('ru')}>RU</button>
            <button aria-label="Switch to English" className={i18n.language?.startsWith('en') ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
          </div>
        </nav>

        <button className="btn btn-primary btn-order" onClick={onOrderClick}>
          {t('header.order')}
        </button>

        <button className="mobile-menu-btn" aria-label="Toggle menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};
