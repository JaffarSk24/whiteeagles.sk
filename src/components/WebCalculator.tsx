"use client";

import React, { useMemo, useState } from "react";
import { useOrderModal } from "./AppShell";
import { trackGAEvent } from "../utils/analytics";
import "./WebCalculator.css";

export interface CalculatorType {
  id: string;
  label: string;
  price: number;
  time: string;
}

export interface CalculatorExtra {
  id: string;
  label: string;
  price: number;
  /** Site types where this already comes with the base price. */
  included_in?: string[];
}

export interface CalculatorTexts {
  title: string;
  intro: string;
  type_label: string;
  types: CalculatorType[];
  langs_label: string;
  langs_note: string;
  lang_price: number;
  extras_label: string;
  extras: CalculatorExtra[];
  included_label: string;
  included: string[];
  included_mark: string;
  result_label: string;
  from: string;
  time_label: string;
  cta: string;
  message_prefix: string;
  langs_word: string;
}

const formatPrice = (n: number) => n.toLocaleString("sk-SK").replace(/ /g, " ") + "€";

/**
 * A rough price in thirty seconds. The table above gives the floor for each
 * site type; this adds what the visitor ticks and hands the whole selection
 * to the order form, so the first call starts from a number instead of
 * "how much is a website".
 */
export function WebCalculator({ texts, serviceId }: { texts: CalculatorTexts; serviceId: string }) {
  const { openOrderModal } = useOrderModal();
  const [typeId, setTypeId] = useState(texts.types[0]?.id ?? "");
  const [langs, setLangs] = useState(1);
  const [extras, setExtras] = useState<string[]>([]);

  const type = texts.types.find((x) => x.id === typeId) ?? texts.types[0];

  const total = useMemo(() => {
    let sum = type.price + (langs - 1) * texts.lang_price;
    for (const e of texts.extras) {
      if (extras.includes(e.id) && !(e.included_in ?? []).includes(type.id)) sum += e.price;
    }
    return sum;
  }, [type, langs, extras, texts]);

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const summary = () => {
    const picked = texts.extras.filter((e) => extras.includes(e.id)).map((e) => e.label);
    const parts = [type.label, `${langs} ${texts.langs_word}`, ...picked];
    return `${texts.message_prefix} ${parts.join(", ")}. ${texts.result_label}: ${texts.from} ${formatPrice(total)}.`;
  };

  return (
    <section className="detail-block web-calc">
      <h2>{texts.title}</h2>
      <p className="web-calc-intro">{texts.intro}</p>

      <div className="web-calc-grid">
        <div className="web-calc-controls">
          <fieldset className="web-calc-group">
            <legend>{texts.type_label}</legend>
            <div className="web-calc-options">
              {texts.types.map((x) => (
                <label key={x.id} className={`web-calc-option${x.id === type.id ? " is-active" : ""}`}>
                  <input type="radio" name="web-calc-type" value={x.id} checked={x.id === type.id} onChange={() => setTypeId(x.id)} />
                  <span className="web-calc-option-label">{x.label}</span>
                  <span className="web-calc-option-price">{texts.from} {formatPrice(x.price)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="web-calc-group">
            <legend>{texts.langs_label}</legend>
            <div className="web-calc-langs" role="radiogroup" aria-label={texts.langs_label}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`web-calc-lang${n === langs ? " is-active" : ""}`}
                  aria-pressed={n === langs}
                  onClick={() => setLangs(n)}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="web-calc-note">{texts.langs_note}</p>
          </fieldset>

          <fieldset className="web-calc-group">
            <legend>{texts.extras_label}</legend>
            <div className="web-calc-options">
              {texts.extras.map((e) => {
                const included = (e.included_in ?? []).includes(type.id);
                return (
                  <label key={e.id} className={`web-calc-option${extras.includes(e.id) || included ? " is-active" : ""}${included ? " is-included" : ""}`}>
                    <input type="checkbox" checked={included || extras.includes(e.id)} disabled={included} onChange={() => toggleExtra(e.id)} />
                    <span className="web-calc-option-label">{e.label}</span>
                    <span className="web-calc-option-price">{included ? texts.included_mark : `+${formatPrice(e.price)}`}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>

        <aside className="web-calc-result">
          <span className="web-calc-result-label">{texts.result_label}</span>
          <strong className="web-calc-result-price">
            {texts.from} {formatPrice(total)}
          </strong>
          <span className="web-calc-result-time">
            {texts.time_label}: {type.time}
          </span>
          <button
            type="button"
            className="btn btn-activate web-calc-cta"
            onClick={() => {
              trackGAEvent("calculator_quote", { service: serviceId, site_type: type.id, languages: langs, extras: extras.join(","), value: total, currency: "EUR" });
              openOrderModal(serviceId, summary());
            }}
          >
            {texts.cta}
          </button>
          <div className="web-calc-included">
            <span className="web-calc-included-label">{texts.included_label}</span>
            <ul>
              {texts.included.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
