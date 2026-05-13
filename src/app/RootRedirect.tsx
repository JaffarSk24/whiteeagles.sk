"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 1. Check local storage for manually selected language
    const savedLocale = localStorage.getItem("NEXT_LOCALE");
    if (savedLocale && ["sk", "en", "ru"].includes(savedLocale)) {
      router.replace(`/${savedLocale}`);
      return;
    }

    // 2. Check browser language for auto-detection
    const browserLang = navigator.language.toLowerCase();
    let targetLocale = "en"; // default
    
    if (browserLang.startsWith("ru") || browserLang.startsWith("uk") || browserLang.startsWith("be")) {
      targetLocale = "ru";
    } else if (browserLang.startsWith("sk") || browserLang.startsWith("cs")) {
      targetLocale = "sk";
    } else {
      targetLocale = "en";
    }

    router.replace(`/${targetLocale}`);
  }, [router]);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0f172a" }}>
      {/* Minimal loading indicator while redirecting */}
      <div style={{ width: "40px", height: "40px", border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
