import React from "react";
import "./ServiceFacts.css";

export interface ServiceFact {
  value: string;
  label: string;
}

/**
 * The three or four numbers a visitor looks for before reading anything else:
 * what it costs, how long it takes, what stays theirs. Server component - the
 * values come straight from the translations, nothing here is interactive.
 */
export function ServiceFacts({ facts }: { facts: ServiceFact[] }) {
  if (!facts?.length) return null;

  return (
    <div className="service-facts">
      {facts.map((fact, i) => (
        <div key={i} className="service-fact">
          <span className="service-fact-value">{fact.value}</span>
          <span className="service-fact-label">{fact.label}</span>
        </div>
      ))}
    </div>
  );
}
