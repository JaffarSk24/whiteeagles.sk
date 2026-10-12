import { useEffect, useState } from "react";
import type { AppRelease } from "../data/apps";

// The download links are baked into the page at build time, and a release
// published after the last deploy would otherwise wait for the next one. So
// the page also asks GitHub in the visitor's browser and swaps in a newer
// release when there is one. The baked data stays as the first paint and as
// the fallback when GitHub is unreachable or rate-limits the visitor
// (60 unauthenticated requests an hour per IP).
//
// Which asset serves which platform: the same rules as fetch_app_releases.js.
// The names are set by electron-builder in each app's package.json.
const PLATFORMS: { key: keyof AppRelease["assets"]; test: (n: string) => boolean }[] = [
  { key: "macArm", test: (n) => /-mac-(arm64|universal)\.dmg$/.test(n) },
  { key: "macIntel", test: (n) => /-mac-(x64|universal)\.dmg$/.test(n) },
  { key: "windows", test: (n) => /-win-x64\.exe$/.test(n) },
];

interface GitHubRelease {
  tag_name: string;
  published_at: string;
  html_url: string;
  assets: { name: string; browser_download_url: string; size: number }[];
}

const parse = (rel: GitHubRelease): AppRelease | null => {
  const assets: AppRelease["assets"] = {};
  for (const p of PLATFORMS) {
    const a = rel.assets.find((x) => p.test(x.name));
    if (a) assets[p.key] = { name: a.name, url: a.browser_download_url, size: a.size };
  }
  // A release still uploading its builds is not worth showing.
  if (!assets.windows || !assets.macArm) return null;
  return {
    version: rel.tag_name.replace(/^v/, ""),
    publishedAt: rel.published_at.slice(0, 10),
    page: rel.html_url,
    assets,
  };
};

// Ten minutes is short enough to pick up a release the same hour and long
// enough that browsing between languages does not spend the visitor's quota.
const TTL = 10 * 60 * 1000;

const readCache = (repo: string): AppRelease | null => {
  try {
    const raw = sessionStorage.getItem(`app-release:${repo}`);
    if (!raw) return null;
    const { at, release } = JSON.parse(raw);
    return Date.now() - at < TTL ? release : null;
  } catch {
    return null;
  }
};

const writeCache = (repo: string, release: AppRelease) => {
  try {
    sessionStorage.setItem(`app-release:${repo}`, JSON.stringify({ at: Date.now(), release }));
  } catch {
    // Private mode or storage disabled: the next page view asks GitHub again.
  }
};

const newer = (a: string, b: string) => {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d > 0;
  }
  return false;
};

export function useLatestRelease(repo: string, baked: AppRelease): AppRelease {
  const [release, setRelease] = useState(baked);

  useEffect(() => {
    let cancelled = false;
    const apply = (r: AppRelease) => {
      if (!cancelled && newer(r.version, baked.version)) setRelease(r);
    };

    const cached = readCache(repo);
    if (cached) {
      Promise.resolve(cached).then(apply);
      return () => {
        cancelled = true;
      };
    }

    fetch(`https://api.github.com/repos/JaffarSk24/${repo}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: GitHubRelease | null) => {
        const r = json ? parse(json) : null;
        if (!r) return;
        writeCache(repo, r);
        apply(r);
      })
      .catch(() => {
        // Offline or blocked: the baked links still work.
      });

    return () => {
      cancelled = true;
    };
  }, [repo, baked.version]);

  return release;
}
