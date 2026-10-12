import type { AbstractIntlMessages } from "next-intl";

// The messages the browser actually needs. NextIntlClientProvider in the
// layout used to receive every message of the locale, so the full text of the
// six service pages, the apps, audit and legal pages travelled inside the HTML
// of every page as script data (about 120 KB on a Russian page) to be parsed
// on load, although client components read only these namespaces. Server
// components keep reading the full set on the server.
//
// A client component ("use client", or anything imported from one) that
// starts using another namespace has to be added here, otherwise it shows the
// message key instead of the text.
const CLIENT_NAMESPACES = [
  "header", // Header, Footer
  "footer", // Footer
  "contacts", // Footer
  "common", // OrderForm, Chatbot
  "order", // OrderForm, Chatbot, InlineContactForm
  "chatbot", // Chatbot
  "clients", // ClientCarousel
  "portfolio", // PortfolioCarousel
  "cases", // PortfolioCarousel
  "contact_form", // InlineContactForm
  "service_ui", // ServiceCta, StickyOrderCta, RepairQuickForm
] as const;

export function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  const picked: AbstractIntlMessages = {};
  for (const namespace of CLIENT_NAMESPACES) {
    if (messages[namespace] !== undefined) picked[namespace] = messages[namespace];
  }

  // Of a service, the browser only shows the name: in the order form, the
  // chat, the footer and the repair form. Its page texts are server-rendered.
  const services: AbstractIntlMessages = {};
  for (const [id, service] of Object.entries(messages.services as AbstractIntlMessages)) {
    if (typeof service === "object") services[id] = { title: service.title };
  }
  picked.services = services;

  return picked;
}
