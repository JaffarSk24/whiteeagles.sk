"use client";

import React from "react";
import { useOrderModal } from "./AppShell";
import { trackGAEvent } from "../utils/analytics";

interface AuditCTAProps {
  title: string;
  text: string;
  buttonText: string;
  /** Where on the page this block sits, so GA4 shows which one converts. */
  position: string;
}

/**
 * Horizontal call-to-action strip. Used on the audit landing page and inside
 * long articles, where a single CTA at the very bottom is reached by almost
 * nobody.
 */
export function AuditCTA({ title, text, buttonText, position }: AuditCTAProps) {
  const { openOrderModal } = useOrderModal();

  return (
    <section className="audit-cta">
      <div className="audit-cta-body">
        <h2 className="audit-cta-title">{title}</h2>
        <p className="audit-cta-text">{text}</p>
      </div>
      <button
        className="btn btn-primary btn-lg audit-cta-button"
        onClick={() => {
          trackGAEvent("cta_click", { location: position });
          openOrderModal();
        }}
      >
        {buttonText}
      </button>
    </section>
  );
}
