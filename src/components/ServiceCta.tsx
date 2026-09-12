"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useOrderModal } from "./AppShell";
import { trackGAEvent } from "../utils/analytics";
import "./ServiceCta.css";

interface ServiceCtaProps {
  serviceId: string;
  /** Which block on the page the button belongs to, for the GA event. */
  block: string;
}

/**
 * A way out of the page at the end of every long block. Reading the process or
 * the cases is where the decision is made, and until now the only button was
 * far above, inside the card.
 */
export function ServiceCta({ serviceId, block }: ServiceCtaProps) {
  const t = useTranslations("service_ui");
  const { openOrderModal } = useOrderModal();

  const label = serviceId === "bugfix" ? t("cta_button_repair") : t("cta_button");

  return (
    <div className="service-cta">
      <button
        type="button"
        className="btn btn-activate"
        onClick={() => {
          trackGAEvent("cta_click", { location: `service_${serviceId}_${block}` });
          openOrderModal(serviceId);
        }}
      >
        {label}
      </button>
    </div>
  );
}
