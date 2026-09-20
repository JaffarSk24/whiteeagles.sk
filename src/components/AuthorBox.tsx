"use client";

import React from "react";
import Image from "next/image";
import { useOrderModal } from "./AppShell";
import { trackGAEvent } from "../utils/analytics";

interface AuthorBoxProps {
  /** One line about who wrote the article, already translated by the page. */
  line: string;
  buttonText: string;
  /**
   * Telegram is where the Russian-speaking readers actually write from, so the
   * link is offered to them and to nobody else. Left out elsewhere.
   */
  telegramText?: string;
  /** The order form the article's first call to action opens. */
  service?: string;
  /** GA4 location for the button, e.g. blog_<slug>_author. */
  location: string;
  /**
   * The service pages, as plain links with their names as anchors. Every
   * article then points at the services from its body, which is where a
   * crawler weighs a link; the header and footer buttons alone left the
   * advertising page unfetched for a year.
   */
  services?: { href: string; label: string }[];
}

/**
 * Who wrote this, and one way to reach him - the last block of every article.
 * A reader who got to the end of two thousand words is the one most likely to
 * ask for a quote, and until now the page simply stopped.
 *
 * Rendered through the same route as the other interactive blocks: the page is
 * a server component and passes the translated strings in, so the text is in
 * the HTML while the button keeps its click handler.
 */
export function AuthorBox({ line, buttonText, telegramText, service, location, services }: AuthorBoxProps) {
  const { openOrderModal } = useOrderModal();

  return (
    <section className="author-box">
      <Image
        src="/assets/Kirill_Mosin.webp"
        alt="Kirill Mosin"
        width={96}
        height={96}
        className="author-box-photo"
      />
      <div className="author-box-body">
        <p className="author-box-name">Ing. Kirill Mosin</p>
        <p className="author-box-line">{line}</p>
        {services && services.length > 0 && (
          <p className="author-box-services">
            {services.map((s, i) => (
              <React.Fragment key={s.href}>
                {i > 0 && <span className="author-box-sep"> · </span>}
                <a href={s.href}>{s.label}</a>
              </React.Fragment>
            ))}
          </p>
        )}
        <div className="author-box-actions">
          <button
            type="button"
            className="btn btn-primary author-box-button"
            onClick={() => {
              trackGAEvent("cta_click", { location, service });
              openOrderModal(service);
            }}
          >
            {buttonText}
          </button>
          {telegramText && (
            <a
              className="author-box-telegram"
              href="https://t.me/whiteeaglessk"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGAEvent("contact_click", { method: "telegram" })}
            >
              {telegramText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
