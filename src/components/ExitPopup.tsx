import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, X } from 'lucide-react';
import './ExitPopup.css';

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
          <Sparkles size={48} className="exit-popup-icon" />
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
