"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { trackGAEvent } from "../utils/analytics";
import "./RepairQuickForm.css";

/**
 * A broken site is an urgent problem, and the modal asks for more than someone
 * in that state wants to type. Three fields, at the top of the page: where the
 * site is, what it does, how to reach you.
 */
export function RepairQuickForm() {
  const t = useTranslations("service_ui.repair_form");
  const tRoot = useTranslations();
  const locale = useLocale();

  const [form, setForm] = useState({ url: "", problem: "", contact: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.url.trim() || !form.contact.trim()) return;

    setStatus("sending");
    trackGAEvent("form_submit", { form_id: "repair_quick" });

    try {
      const isEmail = form.contact.includes("@");
      const message = form.problem.trim()
        ? `${form.url.trim()}\n\n${form.problem.trim()}`
        : form.url.trim();

      const res = await fetch("/api/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `Web: ${form.url.trim()}`,
          email: isEmail ? form.contact.trim() : "",
          phone: !isEmail ? form.contact.trim() : "",
          message,
          service: tRoot("services.bugfix.title"),
          language: locale,
        }),
      });

      if (res.ok) {
        setStatus("success");
        trackGAEvent("order_send", { form_id: "repair_quick" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="repair-quick-form">
      <div className="repair-quick-head">
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>

      {status === "success" ? (
        <div className="repair-quick-success">{t("success")}</div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="repair-quick-fields">
            <input
              type="text"
              inputMode="url"
              className="repair-quick-input"
              placeholder={t("url_placeholder")}
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
            <input
              type="text"
              className="repair-quick-input"
              placeholder={t("contact_placeholder")}
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
            <textarea
              className="repair-quick-input repair-quick-textarea"
              placeholder={t("problem_placeholder")}
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              rows={3}
            />
          </div>

          <button type="submit" className="repair-quick-submit" disabled={status === "sending"}>
            {status === "sending" ? t("sending") : t("submit")}
          </button>

          {status === "error" && <p className="repair-quick-error">{t("error")}</p>}
        </form>
      )}
    </section>
  );
}
