import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { X, Send } from 'lucide-react';
import { services } from '../data/services';
import { trackGAEvent } from '../utils/analytics';
import './Chatbot.css';

interface Message {
  id: string;
  type: 'bot' | 'user' | 'typing';
  text?: string;
  options?: { value: string; label: string }[];
  isInput?: 'text' | 'email' | 'tel' | 'textarea';
  inputPlaceholder?: string;
  isSummary?: boolean;
}

interface ChatbotProps {
  isOrderFormOpen?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOrderFormOpen = false }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);
  
  const [formData, setFormData] = useState({
    service: '',
    serviceName: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Initial trigger animation
  useEffect(() => {
    // Only bother the user if they haven't closed it in this session
    const hasClosed = sessionStorage.getItem('we_chatbot_closed') === 'true';
    if (hasClosed) {
      setShowTrigger(true); // show the icon, but don't auto-open bubble
      return;
    }

    const timer1 = setTimeout(() => {
      if (!isOpen && !isOrderFormOpen && location.pathname === '/') {
        setShowTrigger(true);
        const timer2 = setTimeout(() => {
          if (!isOpen && !isOrderFormOpen && location.pathname === '/') {
            setShowBubble(true);
            playNotification();
          }
        }, 1000);
        return () => clearTimeout(timer2);
      }
    }, 7000); // 7 seconds delay as requested
    
    return () => clearTimeout(timer1);
  }, [isOpen, isOrderFormOpen, location.pathname]);

  // Handle global order form opening
  useEffect(() => {
    if (isOrderFormOpen) {
      setIsOpen(false);
      setShowBubble(false);
    }
  }, [isOrderFormOpen]);

  const scrollToBottom = () => {
    // Small delay to ensure React has fully committed the new DOM nodes
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Watch both messages and the current step change to ensure scrolling 
  // hits exactly when new UI (like the input field) appears
  useEffect(() => {
    scrollToBottom();
    // Focus input if available
    if (inputRef.current && window.innerWidth > 480) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, step]);

  // Track Chatbot Funnel Steps
  useEffect(() => {
    if (step > 0 && step < 7) {
      trackGAEvent('chat_step_completed', { 
        step_number: step, 
        service: formData.service || 'not_selected_yet' 
      });
    }
  }, [step, formData.service]);

  const playNotification = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        // Will unlock on first interaction
        return;
      }
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      // Ignore audio errors
    }
  };

  const addTyping = () => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { id, type: 'typing', text: '' }]);
    return id;
  };

  const removeTyping = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addBotMessage = (textKey: string, options?: {value: string, labelKey: string}[], isInput?: Message['isInput'], inputPlaceholderKey?: string, isSummary?: boolean) => {
    // Translate immediately, store static strings
    const translatedOptions = options?.map(o => ({ value: o.value, label: t(o.labelKey) }));
    
    setMessages(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      type: 'bot',
      text: t(textKey),
      options: translatedOptions,
      isInput,
      inputPlaceholder: inputPlaceholderKey ? t(inputPlaceholderKey) : undefined,
      isSummary
    }]);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString() + Math.random(),
      type: 'user',
      text
    }]);
  };

  const simulateBotTyping = async (delay: number) => {
    const id = addTyping();
    return new Promise<void>(resolve => {
      setTimeout(() => {
        removeTyping(id);
        resolve();
      }, delay);
    });
  };

  // Chat Flow Logic
  const startChat = async () => {
    setStep(1);
    setMessages([]);
    setFormData({ service: '', serviceName: '', name: '', email: '', phone: '', message: '' });
    await simulateBotTyping(800);
    
    // Pass raw keys here, they get translated instantly inside addBotMessage
    addBotMessage('chatbot.greeting_1');
    await simulateBotTyping(1500);
    addBotMessage('chatbot.greeting_2');
    
    await simulateBotTyping(800);
    const serviceOptions = [
      { value: 'webdev', labelKey: 'chatbot.serv_webdev' },
      { value: 'bugfix', labelKey: 'chatbot.serv_bugfix' },
      { value: 'ads', labelKey: 'chatbot.serv_ads' },
      { value: 'analytics', labelKey: 'chatbot.serv_analytics' },
      { value: 'chatbot', labelKey: 'chatbot.serv_chatbot' },
      { value: 'cookies', labelKey: 'chatbot.serv_cookies' }
    ];
    addBotMessage('chatbot.q_service', serviceOptions);
  };

  const handleOptionSelect = async (value: string, label: string) => {
    // Determine context based on step
    if (step === 1) { // Service selection
      addUserMessage(label);
      setFormData(prev => ({ ...prev, service: value, serviceName: label }));
      setStep(2);

      const selectedServiceObj = services.find(s => s.id === value);
      trackGAEvent('add_to_cart', {
        currency: 'EUR',
        value: selectedServiceObj?.priceRate || 0,
        items: [{
          item_id: value,
          item_name: label,
          price: selectedServiceObj?.priceRate || 0,
          quantity: 1
        }]
      });
      
      await simulateBotTyping(1500);
      addBotMessage(
        'chatbot.q_name', 
        undefined, 
        'text', 
        'chatbot.placeholder_name'
      );
    }
  };

  const handleInputSubmit = async () => {
    const val = inputValue.trim();
    if (!val) {
      setInputError(t('chatbot.error_required', '*'));
      return;
    }

    if (step === 2) { // Name
      addUserMessage(val);
      setFormData(prev => ({ ...prev, name: val }));
      setInputValue('');
      setInputError('');
      setStep(3);
      
      await simulateBotTyping(1500);
      addBotMessage(
        'chatbot.q_email', 
        undefined, 
        'email', 
        'chatbot.placeholder_email'
      );
    } 
    else if (step === 3) { // Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setInputError(t('order.email_error', 'Invalid email format'));
        return;
      }
      addUserMessage(val);
      setFormData(prev => ({ ...prev, email: val }));
      setInputValue('');
      setInputError('');
      setStep(4);
      
      await simulateBotTyping(1500);
      addBotMessage(
        'chatbot.q_phone', 
        undefined, 
        'tel', 
        'chatbot.placeholder_phone'
      );
    }
    else if (step === 4) { // Phone
      const phoneRegex = /^\+?[0-9\s\-\(\)]{9,}$/;
      if (!phoneRegex.test(val.replace(/\s+/g, ''))) {
        setInputError(t('order.phone_error', 'Invalid phone format'));
        return;
      }
      addUserMessage(val);
      setFormData(prev => ({ ...prev, phone: val }));
      setInputValue('');
      setInputError('');
      
      // Skip step 5 (Message) -> go straight to step 6 (Summary)
      setStep(6);
      
      await simulateBotTyping(3000);
      addBotMessage('chatbot.q_summary', undefined, undefined, undefined, true);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    addUserMessage("✔️");
    
    const typingId = addTyping();
    
    try {
      // Lazy load ReCAPTCHA if not loaded
      if (!document.getElementById('recaptcha-script-chatbot')) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script');
          script.id = 'recaptcha-script-chatbot';
          script.src = 'https://www.google.com/recaptcha/api.js?render=6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi';
          script.onload = () => resolve();
          document.body.appendChild(script);
        });
        
        // Wait a bit for it to initialize
        await new Promise(r => setTimeout(r, 1000));
      }

      const selectedServiceObj = services.find(s => s.id === formData.service);
      const priceString = selectedServiceObj ? `${selectedServiceObj.priceRate}€/${t('common.hour', 'hour')}` : '';

      // @ts-ignore
      const token = await window.grecaptcha.execute('6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi', { action: 'chatbot_submit' });

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: t(services.find(s => s.id === formData.service)?.titleKey || formData.serviceName),
        price: priceString,
        message: t('chatbot.message_default', 'Отправлено через чат-бот'),
        language: i18n.language,
        recaptchaToken: token
      };

      const response = await fetch('/api/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      removeTyping(typingId);
      setIsSubmitting(false);

      if (response.ok) {
        setStep(7); // Success
        
        const eventValue = selectedServiceObj?.priceRate || 0;
        
        trackGAEvent('order_send', { 
          source: 'chatbot', 
          service: formData.service,
          value: eventValue,
          currency: 'EUR',
          language: i18n.language
        });

        trackGAEvent('purchase', {
          transaction_id: `T_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          value: eventValue,
          currency: 'EUR',
          items: [{
            item_id: formData.service,
            item_name: t(selectedServiceObj?.titleKey || ''),
            price: eventValue,
            quantity: 1
          }]
        });
      } else {
        addBotMessage('order.error');
      }

    } catch (e) {
      console.error(e);
      removeTyping(typingId);
      setIsSubmitting(false);
      addBotMessage('order.error');
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setShowTrigger(false);
    setShowBubble(false);
    sessionStorage.removeItem('we_chatbot_closed'); // Remove closed state when opening
    trackGAEvent('chat_open');
    if (step === 0) {
      startChat();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setShowBubble(false);
    sessionStorage.setItem('we_chatbot_closed', 'true');
  };

  const isHidden = location.pathname !== '/' || isOrderFormOpen;

  return (
    <div id="we-chatbot-widget" style={{ display: isHidden ? 'none' : 'block' }}>
      {/* TRIGGER */}
      <div 
        id="we-chatbot-trigger" 
        className={showTrigger && !isOpen ? 'we-show' : ''} 
        onClick={openChat}
      >
        <div className={`we-chatbot-bubble ${showBubble ? 'we-show' : ''}`}>
          {t('chatbot.bubble_text', 'Помогу подобрать услугу за 1 минуту!')}
        </div>
        <div className="we-chatbot-icon">
          <img src="/assets/Kirill_Mosin.png" alt="Kirill Mosin" className="we-avatar-img" />
          <span className="we-chatbot-trigger-status-dot"></span>
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div id="we-chatbot-window" className={isOpen ? 'we-open' : ''}>
        <div className="we-chatbot-header">
          <div className="we-chatbot-header-title">
            <div className="we-chatbot-avatar-wrap">
              <img src="/assets/Kirill_Mosin.png" alt="Kirill Mosin" className="we-chatbot-avatar-img-img" />
              <span className="we-chatbot-status-dot"></span>
            </div>
            {t('chatbot.bot_title', 'Kirill Mosin (CEO)')}
          </div>
          <div className="we-chatbot-header-actions">
            <button id="we-chatbot-close" onClick={closeChat}><X size={24} /></button>
          </div>
        </div>
        
        <div className="we-chatbot-body" id="we-chatbot-body">
          {step === 7 ? (
            <div className="we-chatbot-success">
              <div className="we-emoji">🎉</div>
              <div className="we-title">{t('order.success_title', 'Thank you!')}</div>
              <div className="we-desc">{t('order.success', 'We have received your information and will contact you as soon as possible during business hours.')}</div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={`we-chat-msg we-chat-msg-${msg.type} we-animate-fade ${msg.isInput || msg.isSummary ? 'we-chat-msg-full' : ''}`}>
                  {msg.type === 'typing' ? (
                    <div className="we-typing-indicator">
                      <div className="we-dot"></div><div className="we-dot"></div><div className="we-dot"></div>
                    </div>
                  ) : (
                    <>
                      <div className={`we-chat-bubble ${msg.isInput || msg.isSummary ? 'we-transparent' : ''}`}>
                        {msg.text && <div className={msg.isInput || msg.isSummary ? 'we-chat-bubble-inner' : ''} dangerouslySetInnerHTML={{ __html: msg.text}}></div>}
                        
                        {/* Options UI */}
                        {msg.options && (
                          <div className="we-chat-options">
                            {msg.options.map(opt => (
                              <button 
                                key={opt.value} 
                                className="we-chat-option-btn"
                                onClick={() => handleOptionSelect(opt.value, opt.label)}
                                disabled={step !== 1} // Only active if it's the current step
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Input UI */}
                        {msg.isInput && step > 1 && msg === messages[messages.length - 1] && (
                          <div className="we-chat-input-wrapper">
                            <div className="we-chat-input-row">
                              {msg.isInput === 'textarea' ? (
                                <textarea
                                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                  className="we-chat-input"
                                  placeholder={msg.inputPlaceholder || ''}
                                  value={inputValue}
                                  onChange={(e) => { setInputValue(e.target.value); setInputError(''); }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      handleInputSubmit();
                                    }
                                  }}
                                  rows={2}
                                />
                              ) : (
                                <input 
                                  ref={inputRef as React.RefObject<HTMLInputElement>}
                                  type={msg.isInput}
                                  className="we-chat-input"
                                  placeholder={msg.inputPlaceholder || ''}
                                  value={inputValue}
                                  onChange={(e) => { setInputValue(e.target.value); setInputError(''); }}
                                  onKeyDown={(e) => e.key === 'Enter' && handleInputSubmit()}
                                />
                              )}
                              <div className="we-chat-input-actions">
                                <button className="we-chat-action-btn" onClick={handleInputSubmit}>
                                  {t('chatbot.btn_next', 'Далее')} <Send size={14} style={{marginLeft: '6px'}}/>
                                </button>
                              </div>
                            </div>
                            {inputError && <div className="we-error-text">{inputError}</div>}
                          </div>
                        )}

                        {/* Summary UI */}
                        {msg.isSummary && step === 6 && msg === messages[messages.length - 1] && (
                          <div className="we-summary-wrapper">
                            <table className="we-chat-summary-table">
                              <tbody>
                                <tr><td>{t('order.service', 'Service')}</td><td>{t(services.find(s => s.id === formData.service)?.titleKey || formData.serviceName)}</td></tr>
                                <tr><td>{t('order.name', 'Name')}</td><td>{formData.name}</td></tr>
                                <tr><td>{t('order.email', 'Email')}</td><td>{formData.email}</td></tr>
                                <tr><td>{t('order.phone', 'Phone')}</td><td>{formData.phone}</td></tr>
                              </tbody>
                            </table>
                            <button className="we-chat-action-btn we-btn-submit-final" onClick={handleFinalSubmit} disabled={isSubmitting}>
                                {isSubmitting ? t('order.sending', 'Sending...') : t('chatbot.btn_send', 'Отправить заявку')}
                            </button>
                          </div>
                        )}

                      </div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
