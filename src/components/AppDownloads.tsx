"use client";

import React, { useSyncExternalStore } from "react";
import { Apple, Monitor, Smartphone } from "lucide-react";
import { trackGAEvent } from "../utils/analytics";
import type { AppRelease } from "../data/apps";

interface Labels {
  macArm: string;
  macIntel: string;
  mac: string;
  windows: string;
  phone: string;
}

interface AppDownloadsProps {
  appId: string;
  release: AppRelease;
  phoneUrl?: string;
  labels: Labels;
}

type Platform = "mac" | "windows" | "other";

const detect = (): Platform => {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "windows";
  // iPhones and iPads report Mac-like strings; they get the phone version.
  if (/Mac/i.test(ua) && !/iPhone|iPad|iPod/i.test(ua) && navigator.maxTouchPoints < 2) return "mac";
  return "other";
};

const noop = () => () => {};

// All buttons are rendered on the server so every link is crawlable; once
// hydrated, the visitor's own platform is moved first and gets the primary
// style. The others use .btn-activate, the site-wide outlined button
// (.btn-secondary lives in Home.css, which this page does not load).
export function AppDownloads({ appId, release, phoneUrl, labels }: AppDownloadsProps) {
  const platform = useSyncExternalStore<Platform>(noop, detect, () => "other");

  const { assets } = release;
  const universal = assets.macArm && assets.macIntel && assets.macArm.url === assets.macIntel.url;

  const click = (target: string) => () =>
    trackGAEvent("app_download", { app: appId, platform: target, version: release.version });

  const mac = universal
    ? [{ key: "mac", label: labels.mac, asset: assets.macArm! }]
    : [
        ...(assets.macArm ? [{ key: "mac-arm64", label: labels.macArm, asset: assets.macArm }] : []),
        ...(assets.macIntel ? [{ key: "mac-x64", label: labels.macIntel, asset: assets.macIntel }] : []),
      ];

  const macButtons = mac.map((b) => (
    <a
      key={b.key}
      href={b.asset.url}
      className={`btn app-dl ${platform === "mac" ? "btn-primary" : "btn-activate"}`}
      onClick={click(b.key)}
      rel="noopener"
    >
      <Apple size={18} />
      <span>{b.label}</span>
    </a>
  ));

  const winButton = assets.windows ? (
    <a
      key="win"
      href={assets.windows.url}
      className={`btn app-dl ${platform === "windows" ? "btn-primary" : "btn-activate"}`}
      onClick={click("windows")}
      rel="noopener"
    >
      <Monitor size={18} />
      <span>{labels.windows}</span>
    </a>
  ) : null;

  const phoneButton = phoneUrl ? (
    <a
      key="phone"
      href={phoneUrl}
      className={`btn app-dl ${platform === "other" ? "btn-primary" : "btn-activate"}`}
      onClick={click("phone")}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Smartphone size={18} />
      <span>{labels.phone}</span>
    </a>
  ) : null;

  const ordered =
    platform === "windows"
      ? [winButton, ...macButtons, phoneButton]
      : platform === "other" && phoneButton
        ? [phoneButton, ...macButtons, winButton]
        : [...macButtons, winButton, phoneButton];

  return <div className="app-downloads">{ordered}</div>;
}
