"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ClientCarousel.css";

interface Client {
  name: string;
  url: string;
  logo: string;
}

// 3 groups of 4 — in the exact order specified
const pages: Client[][] = [
  [
    { name: "Synchro ŽRALOK", url: "https://synchrozralok.sk/",     logo: "/assets/logo-zralok.webp" },
    { name: "Top Sklad",    url: "https://top-sklad.com/",          logo: "/assets/logo-topsklad.webp" },
    { name: "Biliardovna",  url: "https://biliardovna.sk/",         logo: "/assets/logo-biliardovna.webp" },
    { name: "Ram Service",  url: "https://ramservice.sk/",           logo: "/assets/logo-ramservice.webp" },
  ],
  [
    { name: "Rebuy Stars",  url: "https://www.rebuystars.sk/",       logo: "/assets/logo-rebuystars.webp" },
    { name: "Recorder",     url: "https://recorder.sk/",            logo: "/assets/logo-recorder.webp" },
    { name: "Moj Servis",   url: "https://www.moj-servis.sk/",      logo: "/assets/logo-mojservis.webp" },
    { name: "Chicago",      url: "https://www.chicago.sk/",         logo: "/assets/logo-chicago.webp" },
  ],
  [
    { name: "Severské Drevo", url: "https://severskedrevo.sk/",     logo: "/assets/logo-severskedrevo.webp" },
    { name: "Studio Krasy", url: "https://studio-krasy.sk/",        logo: "/assets/logo-studiokrasy.webp" },
    { name: "Slov Uni Sport", url: "https://www.slovunisport.sk/",  logo: "/assets/logo-slovunisport.webp" },
    { name: "Top Kobka",    url: "https://top-kobka.sk/",           logo: "/assets/logo-topkobka.webp" },
  ],
];

const TOTAL = pages.length;

export const ClientCarousel: React.FC = () => {
  const t = useTranslations("clients");
  const [page, setPage] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const navigate = (dir: "next" | "prev") => {
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setPage((p) => dir === "next" ? (p + 1) % TOTAL : (p - 1 + TOTAL) % TOTAL);
  };

  return (
    <div className="clients-section">
      <div className="container">
        <h3 className="clients-title">{t("title")}</h3>

        <div className="clients-slider-wrap">
          <button
            className="clients-arrow clients-arrow--prev"
            onClick={() => navigate("prev")}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            key={animKey}
            className={`clients-grid clients-grid--anim-${direction}`}
          >
            {pages[page].map((client) => (
              <a
                key={client.name}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="client-logo-item"
                title={client.name}
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  className="client-logo-img"
                  width={200}
                  height={90}
                />
              </a>
            ))}
          </div>

          <button
            className="clients-arrow clients-arrow--next"
            onClick={() => navigate("next")}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots */}
        <div className="clients-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`clients-dot${i === page ? " clients-dot--active" : ""}`}
              onClick={() => { setDirection(i > page ? "next" : "prev"); setAnimKey((k) => k + 1); setPage(i); }}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
