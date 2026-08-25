"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { X, Send } from "lucide-react";
import { services } from "../data/services";
import { trackGAEvent } from "../utils/analytics";
import Image from "next/image";
import "./Chatbot.css";

interface Message {
  id: string;
  type: "bot" | "user" | "typing";
  text?: string;
  options?: { value: string; label: string }[];
  isInput?: "text" | "email" | "tel" | "textarea";
  inputPlaceholder?: string;
  isSummary?: boolean;
}

interface ChatbotProps {
  isOrderFormOpen?: boolean;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOrderFormOpen = false }) => {
  const t = useTranslations("chatbot");
  const tCommon = useTranslations("common");
  const tOrder = useTranslations("order");
  const tServices = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    service: "",
    serviceName: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Initial trigger animation - delayed by 30 seconds per strategy
  useEffect(() => {
    const hasClosed = sessionStorage.getItem("we_chatbot_closed") === "true";
    if (hasClosed) {
      setShowTrigger(true);
      return;
    }

    const timer1 = setTimeout(() => {
      if (!isOpen && !isOrderFormOpen && pathname === "/") {
        setShowTrigger(true);
        const timer2 = setTimeout(() => {
          if (!isOpen && !isOrderFormOpen && pathname === "/") {
            setShowBubble(true);
            // No sound notification as per strategy update
          }
        }, 1000);
        return () => clearTimeout(timer2);
      }
    }, 30000); // 30 seconds delay per new strategy

    return () => clearTimeout(timer1);
  }, [isOpen, isOrderFormOpen, pathname]);

  useEffect(() => {
    if (isOrderFormOpen) {
      setIsOpen(false);
      setShowBubble(false);
    }
  }, [isOrderFormOpen]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    scrollToBottom();
    if (inputRef.current && window.innerWidth > 480) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, step]);

  useEffect(() => {
    if (step > 0 && step < 7) {
      trackGAEvent("chat_step_completed", {
        step_number: step,
        service: formData.service || "not_selected_yet",
      });
    }
  }, [step, formData.service]);

  const addTyping = () => {
    const id = Date.now().toString();
    setMessages((prev) => [...prev, { id, type: "typing", text: "" }]);
    return id;
  };

  const removeTyping = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const addBotMessage = (
    textKey: string,
    options?: { value: string; labelKey: string }[],
    isInput?: Message["isInput"],
    inputPlaceholderKey?: string,
    isSummary?: boolean
  ) => {
    const translatedOptions = options?.map((o) => ({ value: o.value, label: t(o.labelKey as any) || tServices(o.labelKey as any) }));

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        type: "bot",
        text: t(textKey as any) || tOrder(textKey as any),
        options: translatedOptions,
        isInput,
        inputPlaceholder: inputPlaceholderKey ? t(inputPlaceholderKey as any) : undefined,
        isSummary,
      },
    ]);
  };

  const addUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + Math.random(),
        type: "user",
        text,
      },
    ]);
  };

  const simulateBotTyping = async (delay: number) => {
    const id = addTyping();
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        removeTyping(id);
        resolve();
      }, delay);
    });
  };

  const startChat = async () => {
    setStep(1);
    setMessages([]);
    setFormData({ service: "", serviceName: "", name: "", email: "", phone: "", message: "" });
    await simulateBotTyping(800);

    addBotMessage("greeting_1");
    await simulateBotTyping(1500);
    addBotMessage("greeting_2");

    await simulateBotTyping(800);
    const serviceOptions = [
      { value: "webdev", labelKey: "serv_webdev" },
      { value: "bugfix", labelKey: "serv_bugfix" },
      { value: "ads", labelKey: "serv_ads" },
      { value: "analytics", labelKey: "serv_analytics" },
      { value: "chatbot", labelKey: "serv_chatbot" },
      { value: "cookies", labelKey: "serv_cookies" },
    ];
    addBotMessage("q_service", serviceOptions);
  };

  const handleOptionSelect = async (value: string, label: string) => {
    if (step === 1) {
      addUserMessage(label);
      setFormData((prev) => ({ ...prev, service: value, serviceName: label }));
      setStep(2);

      const selectedServiceObj = services.find((s) => s.id === value);
      trackGAEvent("add_to_cart", {
        currency: "EUR",
        value: selectedServiceObj?.priceRate || 0,
        items: [
          {
            item_id: value,
            item_name: label,
            price: selectedServiceObj?.priceRate || 0,
            quantity: 1,
          },
        ],
      });

      await simulateBotTyping(1500);
      addBotMessage("q_name", undefined, "text", "placeholder_name");
    }
  };

  const handleInputSubmit = async () => {
    const val = inputValue.trim();
    if (!val) {
      setInputError(t("error_required").replace("{0}", "*"));
      return;
    }

    if (step === 2) {
      addUserMessage(val);
      setFormData((prev) => ({ ...prev, name: val }));
      setInputValue("");
      setInputError("");
      setStep(3);

      await simulateBotTyping(1500);
      addBotMessage("q_email", undefined, "email", "placeholder_email");
    } else if (step === 3) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setInputError(tOrder("email_error"));
        return;
      }
      addUserMessage(val);
      setFormData((prev) => ({ ...prev, email: val }));
      setInputValue("");
      setInputError("");
      setStep(4);

      await simulateBotTyping(1500);
      addBotMessage("q_phone", undefined, "tel", "placeholder_phone");
    } else if (step === 4) {
      const phoneRegex = /^\+?[0-9\s\-\(\)]{9,}$/;
      if (!phoneRegex.test(val.replace(/\s+/g, ""))) {
        setInputError(tOrder("phone_error"));
        return;
      }
      addUserMessage(val);
      setFormData((prev) => ({ ...prev, phone: val }));
      setInputValue("");
      setInputError("");

      setStep(6);

      await simulateBotTyping(3000);
      addBotMessage("q_summary", undefined, undefined, undefined, true);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    addUserMessage("✔️");

    const typingId = addTyping();

    try {
      if (!document.getElementById("recaptcha-script-chatbot")) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.id = "recaptcha-script-chatbot";
          script.src = "https://www.google.com/recaptcha/api.js?render=6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi";
          script.onload = () => resolve();
          document.body.appendChild(script);
        });

        await new Promise((r) => setTimeout(r, 1000));
      }

      const selectedServiceObj = services.find((s) => s.id === formData.service);
      const priceString = selectedServiceObj ? `${selectedServiceObj.priceRate}€/${tCommon("hour")}` : "";

      // @ts-ignore
      const token = await window.grecaptcha.execute("6LdmAj0sAAAAAOdnsxEGoEH6xx6nw-lXmNQEvUFi", {
        action: "chatbot_submit",
      });

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: tServices(services.find((s) => s.id === formData.service)?.titleKey || "") || formData.serviceName,
        price: priceString,
        message: t("message_default"),
        language: locale,
        recaptchaToken: token,
      };

      const response = await fetch("/api/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      removeTyping(typingId);
      setIsSubmitting(false);

      if (response.ok) {
        setStep(7);

        const eventValue = selectedServiceObj?.priceRate || 0;

        trackGAEvent("order_send", {
          source: "chatbot",
          service: formData.service,
          value: eventValue,
          currency: "EUR",
          language: locale,
        });

        // Same reasoning as in OrderForm: a chatbot request is a lead, not a
        // sale. order_send above is the single key event for it.
      } else {
        addBotMessage("error"); // "error" key exists in order NS? Let's use order's error if chatbot doesn't have it
      }
    } catch (e) {
      console.error(e);
      removeTyping(typingId);
      setIsSubmitting(false);
      addBotMessage("error");
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setShowTrigger(false);
    setShowBubble(false);
    sessionStorage.removeItem("we_chatbot_closed");
    trackGAEvent("chat_open");
    if (step === 0) {
      startChat();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setShowBubble(false);
    sessionStorage.setItem("we_chatbot_closed", "true");
  };

  const isHidden = pathname !== "/" || isOrderFormOpen;

  return (
    <div id="we-chatbot-widget" style={{ display: isHidden ? "none" : "block" }}>
      {/* TRIGGER */}
      <div id="we-chatbot-trigger" className={showTrigger && !isOpen ? "we-show" : ""} onClick={openChat}>
        <div className={`we-chatbot-bubble ${showBubble ? "we-show" : ""}`}>{t("bubble_text")}</div>
        <div className="we-chatbot-icon">
          <Image src="/assets/Kirill_Mosin.webp" alt="Kirill Mosin" width={56} height={56} className="we-avatar-img" />
          <span className="we-chatbot-trigger-status-dot"></span>
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div id="we-chatbot-window" className={isOpen ? "we-open" : ""}>
        <div className="we-chatbot-header">
          <div className="we-chatbot-header-title">
            <div className="we-chatbot-avatar-wrap">
              <Image
                src="/assets/Kirill_Mosin.webp"
                alt="Kirill Mosin"
                width={36}
                height={36}
                className="we-chatbot-avatar-img-img"
              />
              <span className="we-chatbot-status-dot"></span>
            </div>
            {t("bot_title")}
          </div>
          <div className="we-chatbot-header-actions">
            <button id="we-chatbot-close" onClick={closeChat}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="we-chatbot-body" id="we-chatbot-body">
          {step === 7 ? (
            <div className="we-chatbot-success">
              <div className="we-emoji">🎉</div>
              <div className="we-title">{tOrder("success_title")}</div>
              <div className="we-desc">{tOrder("success")}</div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`we-chat-msg we-chat-msg-${msg.type} we-animate-fade ${
                    msg.isInput || msg.isSummary ? "we-chat-msg-full" : ""
                  }`}
                >
                  {msg.type === "typing" ? (
                    <div className="we-typing-indicator">
                      <div className="we-dot"></div>
                      <div className="we-dot"></div>
                      <div className="we-dot"></div>
                    </div>
                  ) : (
                    <>
                      <div className={`we-chat-bubble ${msg.isInput || msg.isSummary ? "we-transparent" : ""}`}>
                        {msg.text && (
                          <div
                            className={msg.isInput || msg.isSummary ? "we-chat-bubble-inner" : ""}
                            dangerouslySetInnerHTML={{ __html: msg.text }}
                          ></div>
                        )}

                        {/* Options UI */}
                        {msg.options && (
                          <div className="we-chat-options">
                            {msg.options.map((opt) => (
                              <button
                                key={opt.value}
                                className="we-chat-option-btn"
                                onClick={() => handleOptionSelect(opt.value, opt.label)}
                                disabled={step !== 1}
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
                              {msg.isInput === "textarea" ? (
                                <textarea
                                  ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                  className="we-chat-input"
                                  placeholder={msg.inputPlaceholder || ""}
                                  value={inputValue}
                                  onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setInputError("");
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
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
                                  placeholder={msg.inputPlaceholder || ""}
                                  value={inputValue}
                                  onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setInputError("");
                                  }}
                                  onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                                />
                              )}
                              <div className="we-chat-input-actions">
                                <button className="we-chat-action-btn" onClick={handleInputSubmit}>
                                  {t("btn_next")} <Send size={14} style={{ marginLeft: "6px" }} />
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
                                <tr>
                                  <td>{tOrder("service")}</td>
                                  <td>{tServices(services.find((s) => s.id === formData.service)?.titleKey || "")}</td>
                                </tr>
                                <tr>
                                  <td>{tOrder("name")}</td>
                                  <td>{formData.name}</td>
                                </tr>
                                <tr>
                                  <td>{tOrder("email")}</td>
                                  <td>{formData.email}</td>
                                </tr>
                                <tr>
                                  <td>{tOrder("phone")}</td>
                                  <td>{formData.phone}</td>
                                </tr>
                              </tbody>
                            </table>
                            <button
                              className="we-chat-action-btn we-btn-submit-final"
                              onClick={handleFinalSubmit}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? tOrder("sending") : t("btn_send")}
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
