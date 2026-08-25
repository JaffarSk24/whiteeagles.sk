---
title: 'WordPress website repair: what you can fix yourself and when to call someone'
description: >-
  Your WordPress site is down, slow or throwing an error. The order to work
  through, from the cheapest check to the most expensive, what to do about a
  white screen and a hack, and what repair costs in Slovakia.
date: '2026-08-25'
key: 'wordpress-repair'
faq:
  - q: 'What does repairing a WordPress site cost?'
    a: 'The hourly rate is 25 euros. Something small like a broken form or an error after an update usually takes an hour or two. Cleaning up a hack takes longer: besides the repair you have to find the way in, or it happens again.'
  - q: 'The site shows a white screen and nothing else. What now?'
    a: 'A white screen is a fatal PHP error with the output suppressed. Usually the last plugin or update is to blame. If you have FTP access, rename the folder of the most recent plugin — the site normally comes back and you know the culprit.'
  - q: 'How do I know the site was hacked?'
    a: 'Redirects to somebody else''s site, unknown users with administrator rights, files with odd names in the root, a browser warning, or a message in Search Console. Slowness alone does not mean a hack.'
  - q: 'Repair it, or build a new site?'
    a: 'If the failure is a one-off, repair is far cheaper. If things break every month, the template has hit its ceiling and the money goes on maintaining something that has to be rebuilt anyway.'
  - q: 'How long does a repair take?'
    a: 'An ordinary fault I can diagnose the same day. Removing a hack takes longer, because after the repair the hole has to be closed and the site checked for back doors.'
---
![WordPress website repair | White Eagles & Co.](/assets/blog/wordpress-bugfix.webp)

# WordPress website repair: what you can fix yourself and when to call someone

A WordPress site does not break on its own. It gets broken by an update, by a plugin that fell out with another plugin, by an expired certificate, or by someone who found an un-patched hole before you did.

Below is the order to work through, cheapest step first. The first three checks cost nothing and cover most cases.

[CTA_FORM:bugfix]

## First, work out what is actually broken

"The site is down" means five different things, and each has a different fix. Open the page and see what you get.

| What you see | What it usually is |
|---|---|
| A completely white page | fatal PHP error, usually a plugin or the theme |
| "Error establishing a database connection" | the site cannot reach the database |
| Error 500 | a server error, often `.htaccess` or a memory limit |
| Error 403 | file permissions or a security plugin |
| The site loads but falls apart | the CSS did not load — often mixed http/https |
| It redirects somewhere else | almost always a hack |
| It loads slowly | images, plugins or hosting |

The first thing to do in every case: **open the site in a private window and over mobile data.** Surprisingly often a "broken site" is an old version in the browser cache, or an outage at your own provider.

## Three free checks before you call anyone

**1. Has the certificate expired?** If the browser says "Not secure", the certificate has lapsed. Let's Encrypt renews itself, but when renewal fails the site looks suspicious to a visitor. Click the padlock in the address bar to see the expiry date.

**2. Is the hosting up?** Try opening the hosting control panel. If that is down too, the problem is not your site.

**3. Turn on error output.** This is the one step that actually tells you what is happening. In `wp-config.php` find the `WP_DEBUG` line and set:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Errors start being written to `wp-content/debug.log`. The last lines usually name the culprit — a specific file in a specific plugin. **Turn it off after the repair**, or the log grows and can reveal server paths.

## The white screen: what to do

The most common case and the most frightening. The last change you made is the likely cause.

**If you can still reach the admin**, switch plugins off one at a time, starting with the most recently installed or updated. When the site comes back, you have your culprit.

**If you cannot reach the admin**, you need FTP or the hosting file manager. Rename the `wp-content/plugins` folder to something like `plugins-off`. WordPress switches every plugin off at once and the site usually returns. Then rename it back and disable them individually inside until you find the right one.

The same logic applies to the theme: rename its folder and WordPress falls back to the default one.

## When the site redirects, or Google warns about it

This is not a fault, this is a hack, and one rule applies: **cleaning up is not enough on its own.**

If you clean the files without closing the hole they came through, you are back where you started in a week. The mechanism is almost always the same — a vulnerability is found in a popular plugin, the author releases an update, and bots sweep the internet looking for those who did not apply it.

What to check straight away:

- **Users in the admin.** An unknown account with administrator rights is an unambiguous signal.
- **Files in the site root.** Random names like `wp-c0nfig.php` or `radio.php` do not belong there.
- **Scheduled cron jobs** — malicious code restores itself through them.
- **Search Console**, the Security Issues section.

The first step on any suspicion: **change the passwords** — admin, FTP, database, hosting. Only then clean up.

[CTA_FORM:audit]

## A slow site is not a fault, but it costs money

Google factors speed into positions and judges by the mobile version. If you are also paying for advertising, a slow page is paid for twice — first in low conversion, then in an expensive click through Quality Score.

Open **PageSpeed Insights**, the **Mobile** tab, not Desktop. The two most common causes are always the same:

**Heavy images.** A photograph straight off a phone weighs several megabytes. On a website it should weigh tens of kilobytes and be in WebP.

**Too many plugins.** Each one drags its own scripts and styles onto every page, including the ones where it is not used. Fifteen plugins instead of three is the most ordinary cause of a slow WordPress — and the fault is not WordPress itself, as covered in [WordPress or a custom build](/en/blog/wordpress-or-custom/).

The remaining checks are in [the DIY SEO audit](/en/blog/seo-audit-yourself/).

## The form that pretends to have sent

A separate case you will never find in any log, because technically nothing crashed.

The form displays "thank you" and no email arrives. The mail script broke after a migration, a mailbox password changed, or messages land in spam because the domain has no SPF, DKIM and DMARC records.

**Test it once a month with a real submission** from a phone in a private window. The owner is the last to hear about this kind of failure — and meanwhile loses enquiries they never even see. In detail in [ads running, no enquiries](/en/blog/ads-running-no-leads/).

## How to stop it happening again

Regular maintenance is not an optional service but part of the cost of owning a WordPress site.

1. **Backups that actually run.** And a restore tested at least once — a backup you cannot restore is only a feeling of safety.
2. **Updates monthly**, not yearly. Mass compromises almost always go through holes for which an update has existed for ages.
3. **Fewer plugins.** Each one is third-party code with its own history of vulnerabilities.
4. **A staging copy** for any larger change.
5. **Domain and hosting registered to you**, not to your contractor — otherwise you have nowhere to turn when something breaks. Why it matters: [the .sk domain](/en/blog/sk-domain-guide/).

## When repair is not worth it

Plainly, because it saves money. If things break every month, a plugin almost fits but not quite, a theme edit disappears with every update and nobody dares to update anything — you are repairing something that has to be rebuilt anyway.

At that point building afresh is cheaper than paying to keep it alive. Real prices are in [what a website costs](/en/blog/website-cost-slovakia/).

## If you need help

I repair sites on WordPress and on custom code alike: errors after updates, white screens, malware removal, speed, broken forms. **25 €/hr**, and an ordinary fault I can diagnose the same day.

I have lived in Slovakia for over ten years and have launched **12+ sites for Slovak companies**. I work as a Slovak s.r.o. and issue a faktúra with an IČO you can put through your books.

Details on the [bugfix and support service page](/en/service/bugfix/). If you cannot tell what is wrong with the site — the [free audit](/en/seo-audit/), result within 3 working days.

[CTA_FORM:consult]
