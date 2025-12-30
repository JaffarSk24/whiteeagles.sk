import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onOrderClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const scrollToSection = (id: string) => {
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
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/assets/white-eagles-logo-white.png" alt="White Eagles & Co." className="logo-img" />
          <span>White Eagles & Co.</span>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'nav-active' : ''}`}>
          <a onClick={() => scrollToSection('services')}>{t('nav.services', 'Services')}</a>
          <a onClick={() => scrollToSection('portfolio')}>{t('nav.portfolio', 'Portfolio')}</a>
          <a onClick={() => scrollToSection('about')}>{t('nav.about', 'About')}</a>
          <a onClick={() => scrollToSection('steps')}>{t('nav.steps', 'Process')}</a>
          <a onClick={() => scrollToSection('contacts')}>{t('nav.contacts', 'Contacts')}</a>
          
          <div className="lang-switcher">
            <button className={i18n.language === 'en' ? 'active' : ''} onClick={() => changeLanguage('en')}>EN</button>
            <button className={i18n.language === 'sk' ? 'active' : ''} onClick={() => changeLanguage('sk')}>SK</button>
            <button className={i18n.language === 'ru' ? 'active' : ''} onClick={() => changeLanguage('ru')}>RU</button>
          </div>
        </nav>

        <button className="btn btn-primary btn-order" onClick={onOrderClick}>
          {t('header.order')}
        </button>

        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
};
