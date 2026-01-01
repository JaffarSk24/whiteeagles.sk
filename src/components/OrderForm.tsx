import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { services } from '../data/services';
import './OrderForm.css';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, initialService = '' }) => {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || services[0].id,
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        service: initialService || services[0].id
      }));
    }
  }, [isOpen, initialService]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert(t('order.validation_error', 'Please fill in all required fields.'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert(t('order.email_error', 'Invalid email format'));
      return;
    }

    const phoneRegex = /^\+?[0-9\s\-\(\)]{9,}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert(t('order.phone_error', 'Invalid phone format'));
      return;
    }

    setStatus('submitting');
    
    const selectedServiceObj = services.find(s => s.id === formData.service);
    const serviceName = selectedServiceObj ? t(selectedServiceObj.titleKey) : formData.service;

    try {
      // Execute reCAPTCHA
      // @ts-ignore
      const token = await window.grecaptcha.execute('6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi', { action: 'submit' });

      const response = await fetch('/api/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceName, // Send localized name
          language: i18n.language, // Send current language
          recaptchaToken: token
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X /></button>
        
        <h2>{t('order.title', 'Order Service')}</h2>
        
        {status === 'success' ? (
          <div className="success-message">
            {t('order.success', 'Thank you! We will contact you soon.')}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('order.name', 'Name')}</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder={t('order.name_placeholder', 'John Doe')}
              />
            </div>
            
            <div className="form-group">
              <label>{t('order.email', 'Email')}</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder={t('order.email_placeholder', 'example@gmail.com')}
              />
            </div>

            <div className="form-group">
              <label>{t('order.phone', 'Phone')}</label>
              <input 
                type="tel" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder={t('order.phone_placeholder', '+421 123 456 789')}
              />
            </div>

            <div className="form-group">
              <label>{t('order.service', 'Service')}</label>
              <select 
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
                required
              >
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {t(service.titleKey)} — {service.priceRate}€/{t('common.hour', 'hour')}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                {t('order.message', 'Message')} 
                <span style={{ fontSize: '0.8em', opacity: 0.7, marginLeft: '6px' }}>({t('common.optional', 'optional')})</span>
              </label>
              <textarea 
                rows={4}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? t('order.sending', 'Sending...') : t('order.submit', 'Send Request')}
            </button>
            
            {status === 'error' && (
              <p className="error-text">{t('order.error', 'Something went wrong. Please try again.')}</p>
            )}
            
            <p className="privacy-note">
              {t('order.privacy', 'By submitting you agree to processing of personal data.')}
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
