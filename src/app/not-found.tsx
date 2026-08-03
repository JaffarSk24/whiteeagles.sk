import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | White Eagles & Co.",
  robots: { index: false, follow: true },
};

// nginx serves this file for any missing path, at any locale, so it cannot know
// which language the visitor reads - it offers all three. It carries its own
// <html> because the root layout renders bare children; every real page gets
// its document from [locale]/layout.tsx.
const LOCALES = [
  {
    code: "sk",
    lang: "Slovensky",
    heading: "Stránka sa nenašla",
    text: "Adresa neexistuje alebo sa presunula.",
    home: "Domov",
    services: "Služby",
    blog: "Blog",
  },
  {
    code: "ru",
    lang: "По-русски",
    heading: "Страница не найдена",
    text: "Такого адреса нет или он изменился.",
    home: "Главная",
    services: "Услуги",
    blog: "Блог",
  },
  {
    code: "en",
    lang: "English",
    heading: "Page not found",
    text: "This address does not exist or has moved.",
    home: "Home",
    services: "Services",
    blog: "Blog",
  },
];

export default function NotFound() {
  return (
    <html lang="sk">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          color: "#e2e8f0",
          fontFamily:
            'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: "40px 20px",
        }}
      >
        <main style={{ maxWidth: "760px", width: "100%" }}>
          <p
            style={{
              fontSize: "clamp(56px, 12vw, 96px)",
              fontWeight: 700,
              lineHeight: 1,
              margin: "0 0 32px",
              color: "#3b82f6",
            }}
          >
            404
          </p>

          <div style={{ display: "grid", gap: "28px" }}>
            {LOCALES.map((l) => (
              <section
                key={l.code}
                style={{
                  borderTop: "1px solid rgba(226,232,240,0.12)",
                  paddingTop: "20px",
                }}
              >
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#64748b",
                  }}
                >
                  {l.lang}
                </p>
                <h1
                  style={{
                    margin: "0 0 6px",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {l.heading}
                </h1>
                <p style={{ margin: "0 0 14px", color: "#94a3b8", fontSize: "15px" }}>
                  {l.text}
                </p>
                <p style={{ margin: 0, display: "flex", gap: "18px", flexWrap: "wrap" }}>
                  <a href={`/${l.code}/`} style={linkStyle}>
                    {l.home}
                  </a>
                  <a href={`/${l.code}/#services`} style={linkStyle}>
                    {l.services}
                  </a>
                  <a href={`/${l.code}/blog/`} style={linkStyle}>
                    {l.blog}
                  </a>
                </p>
              </section>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}

const linkStyle: React.CSSProperties = {
  color: "#3b82f6",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: 500,
};
