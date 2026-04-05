// Cache-bust: v4 (Sad Cat Icon)
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import './ExitPopup.css';

const SadCatIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Cat head shape from lucide */}
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
    <path d="M8 14v.01" />
    <path d="M16 14v.01" />
    <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
    {/* Sad mouth (frown) */}
    <path d="M9.5 19c.8-1 4.2-1 5 0" />
  </svg>
);

interface ExitPopupProps {
  onOrderClick?: () => void;
}

export const ExitPopup: React.FC<ExitPopupProps> = ({ onOrderClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if popup has already been shown in this session OR if order was submitted
    const hasShown = sessionStorage.getItem('exit_popup_shown');
    const hasSubmitted = sessionStorage.getItem('order_submitted');
    
    if (hasShown || hasSubmitted) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves the window at the top (exit intent)
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    const handleVisibilityChange = () => {
      // Trigger when user switches tabs (document hidden)
      if (document.hidden) {
        showPopup();
      }
    };

    const showPopup = () => {
      const shown = sessionStorage.getItem('exit_popup_shown');
      const submitted = sessionStorage.getItem('order_submitted');
      
      if (!shown && !submitted) {
        setIsVisible(true);
        sessionStorage.setItem('exit_popup_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCtaClick = () => {
    setIsVisible(false);
    if (onOrderClick) {
      onOrderClick();
    } else {
      // Fallback smooth scroll to order section
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="exit-popup-overlay" onClick={handleClose}>
      <div className="exit-popup-content" onClick={e => e.stopPropagation()}>
        <button className="exit-popup-close" onClick={handleClose} aria-label="Close">
          <X size={24} />
        </button>
        
        <div className="exit-popup-icon-wrapper">
          <SadCatIcon size={48} className="exit-popup-icon" />
        </div>
        
        <h2 className="exit-popup-title">{t('popup.title', "Don't leave yet!")}</h2>
        
        <p className="exit-popup-text-intro">
          {t('popup.intro', "Why work with me?")}
        </p>

        <ul className="exit-popup-list">
          {(t('popup.list', { returnObjects: true }) as string[]).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <p className="exit-popup-text-outro">
          {t('popup.outro')}
        </p>
        
        <button className="btn btn-primary btn-lg exit-popup-btn" onClick={handleCtaClick}>
          {t('popup.button', "Discuss Project")}
        </button>
      </div>
    </div>
  );
};
