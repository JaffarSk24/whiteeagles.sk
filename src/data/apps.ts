import releases from './app-releases.json';

// The free desktop apps offered on /apps/. Texts live in the `apps.items`
// namespace of the messages under the same id; download links come from
// app-releases.json, which fetch_app_releases.js refreshes before every build.
export interface AppRelease {
  version: string;
  publishedAt: string;
  page: string;
  assets: Partial<Record<'macArm' | 'macIntel' | 'windows', { name: string; url: string; size: number }>>;
}

export interface AppEntry {
  id: 'time-tracker' | 'budget' | 'invoice';
  repo: 'WE-Time-Tracker' | 'WE-Budget' | 'WE-Invoice';
  name: string;
  /** The app bundle name, for the one-time Gatekeeper command on macOS. */
  macAppName: string;
  repoUrl: string;
  /** `{locale}` is replaced with the page's language where the app has one. */
  privacyUrl: string;
  /** The app's own site, if it has one; `{locale}` as above. */
  siteUrl?: string;
  /** The phone version, installed from the browser to the home screen. */
  phoneUrl?: string;
  /** A full web version that runs in any browser, phones included. */
  webUrl?: string;
  /** schema.org operatingSystem */
  operatingSystem: string;
  /** Interface languages, for schema.org inLanguage. */
  languages: string[];
  screenshot: string;
  screenshotAlt: string;
  icon: string;
  /** schema.org applicationCategory */
  category: string;
  /** Missing until the app's first release is published on GitHub. */
  release?: AppRelease;
}

const rel = releases as Record<string, AppRelease>;

export const apps: AppEntry[] = [
  {
    id: 'time-tracker',
    repo: 'WE-Time-Tracker',
    name: 'WE Time Tracker',
    macAppName: 'WE Time Tracker',
    repoUrl: 'https://github.com/JaffarSk24/WE-Time-Tracker',
    privacyUrl: 'https://jaffarsk24.github.io/WE-Time-Tracker/privacy.html',
    screenshot: '/assets/apps/we-time-tracker.webp',
    screenshotAlt: 'WE Time Tracker dashboard',
    icon: '/assets/apps/we-time-tracker-icon.webp',
    category: 'BusinessApplication',
    operatingSystem: 'macOS, Windows',
    languages: ['en', 'ru'],
    release: rel['WE-Time-Tracker'],
  },
  {
    id: 'budget',
    repo: 'WE-Budget',
    name: 'WE Budget',
    macAppName: 'WE Budget',
    repoUrl: 'https://github.com/JaffarSk24/WE-Budget',
    privacyUrl: 'https://jaffarsk24.github.io/WE-Budget/privacy.html',
    phoneUrl: 'https://jaffarsk24.github.io/WE-Budget/app/',
    screenshot: '/assets/apps/we-budget.webp',
    screenshotAlt: 'WE Budget overview',
    icon: '/assets/apps/we-budget-icon.webp',
    category: 'FinanceApplication',
    operatingSystem: 'macOS, Windows, iOS, Android',
    languages: ['en', 'ru'],
    release: rel['WE-Budget'],
  },
  {
    id: 'invoice',
    repo: 'WE-Invoice',
    name: 'WE Invoice',
    macAppName: 'WE Invoice',
    repoUrl: 'https://github.com/JaffarSk24/WE-Invoice',
    privacyUrl: 'https://jaffarsk24.github.io/WE-Invoice/{locale}/privacy.html',
    siteUrl: 'https://jaffarsk24.github.io/WE-Invoice/{locale}/',
    webUrl: 'https://jaffarsk24.github.io/WE-Invoice/app/',
    screenshot: '/assets/apps/we-invoice-dark.webp',
    screenshotAlt: 'WE Invoice overview',
    icon: '/assets/apps/we-invoice-icon.webp',
    category: 'BusinessApplication',
    operatingSystem: 'macOS, Windows, web browser, iOS, Android',
    languages: ['sk', 'cs', 'en', 'de', 'ru', 'uk'],
    release: rel['WE-Invoice'],
  },
];
