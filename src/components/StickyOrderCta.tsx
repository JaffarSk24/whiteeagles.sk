"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useOrderModal } from "./AppShell";
import { trackGAEvent } from "../utils/analytics";
import "./StickyOrderCta.css";

/**
 * On a phone the order button scrolls out of sight after the first screen and
 * never comes back. This bar keeps it one thumb away for the whole page. It
 * appears only once the visitor has read past the opening screen, so the first
 * impression stays clean.
 */
export function StickyOrderCta({ serviceId }: { serviceId: string }) {
  const t = useTranslations("service_ui");
  const { openOrderModal } = useOrderModal();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = serviceId === "bugfix" ? t("cta_button_repair") : t("cta_button");

  return (
    <div className={`sticky-order-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <button
        type="button"
        className="sticky-order-cta-btn"
        tabIndex={visible ? 0 : -1}
        onClick={() => {
          trackGAEvent("cta_click", { location: `service_${serviceId}_sticky` });
          openOrderModal(serviceId);
        }}
      >
        {label}
      </button>
    </div>
  );
}
