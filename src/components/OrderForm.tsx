import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import './OrderForm.css';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isOpen, onClose, initialService = '' }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialService,
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Placeholder for actual submission logic to PHP backend
    try {
      const response = await fetch('/api/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', service: '', message: '' });
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
              />
            </div>
            
            <div className="form-group">
              <label>{t('order.email', 'Email')}</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>{t('order.service', 'Service')}</label>
              <input 
                type="text" 
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
                placeholder={t('order.service_placeholder', 'E.g., Analytics Setup')}
              />
            </div>

            <div className="form-group">
              <label>{t('order.message', 'Message')}</label>
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
