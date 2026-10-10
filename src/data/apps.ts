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
  id: 'time-tracker' | 'budget';
  repo: 'WE-Time-Tracker' | 'WE-Budget';
  name: string;
  /** The app bundle name, for the one-time Gatekeeper command on macOS. */
  macAppName: string;
  repoUrl: string;
  privacyUrl: string;
  /** The phone version, installed from the browser to the home screen. */
  phoneUrl?: string;
  screenshot: string;
  screenshotAlt: string;
  icon: string;
  /** schema.org applicationCategory */
  category: string;
  release: AppRelease;
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
    icon: '/assets/apps/we-time-tracker-icon.png',
    category: 'BusinessApplication',
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
    icon: '/assets/apps/we-budget-icon.png',
    category: 'FinanceApplication',
    release: rel['WE-Budget'],
  },
];
