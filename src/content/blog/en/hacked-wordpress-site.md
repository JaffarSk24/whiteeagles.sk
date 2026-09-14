---
title: 'Hacked WordPress site: how to tell you have been hacked, and what to do right now'
description: >-
  The site redirects to a casino, Google warns visitors off, there is a
  stranger among the administrators. What to do in the first hour, the order
  to clean up in, how to close the hole, and when patching no longer pays and
  the site should be rebuilt.
date: '2026-09-12'
updated: '2026-09-14'
key: 'hacked-wordpress'
faq:
  - q: 'How do I tell whether my WordPress site has been hacked?'
    a: 'The commonest signs: mobile visitors end up on a casino or pharmacy site, Google notes under the result that the site may be hacked, a search for site:yourdomain.sk shows pages in Japanese or full of spam, and an unknown administrator has appeared. The owner is usually the last to notice, because malicious code often hides itself from logged-in administrators.'
  - q: 'Is installing a security plugin enough to clean the site?'
    a: 'No. A scanner finds known patterns of malicious code, but not the hole the attacker came in through, and often not the backdoors in the database or the uploads folder. Leave the hole open and the site is hacked again within days.'
  - q: 'Do I have to report the hack to anyone?'
    a: 'If the attacker could reach personal data, such as form submissions or online-shop customers, and that creates a risk for people, the GDPR requires notifying the Slovak data protection authority within 72 hours of becoming aware. I do not give legal advice, but I can establish what the attacker actually had access to.'
  - q: 'What does cleaning a hacked site cost?'
    a: 'The hourly rate is 35 euros. A clean-up including finding and closing the hole usually takes several hours; I give a precise estimate after diagnosis, before any work. If the same hack returns through the same hole, I fix it without a further invoice.'
  - q: 'Is it worth cleaning a hacked WordPress site, or should I build a new one?'
    a: 'A one-off hack of a maintained site is worth cleaning. If it is the second hack in a year, or the site runs on a pirated theme or dozens of plugins nobody updates, it is cheaper to rebuild on a modern stack with no public admin panel and no plugins.'
---
![Hacked WordPress site: how to tell and what to do | White Eagles & Co.](/assets/blog/napadnuty-wordpress.webp)

# Hacked WordPress site: how to tell you have been hacked, and what to do right now

It usually starts with a call from a customer: "I clicked your website and ended up on a casino." You open the site on your computer and everything looks fine. It is not. Malicious code on hacked WordPress sites is often set up to stay invisible to a logged-in administrator and to anyone typing the address directly, and to redirect only people arriving from search and on mobile.

Below: what to do in the first hour, the clean-up order that actually works, and an honest answer to when a site is no longer worth patching.

[CTA_FORM:bugfix]

## The signs: how to recognise a hack

One of these is enough to act at once:

- **A redirect to someone else's site**, especially on mobile or after clicking a Google result. Test from a phone on mobile data, not from the computer where you are logged in.
- **A warning from Google.** A note appears under the search result saying the site may be hacked, or Chrome shows a red warning screen.
- **Pages you never created.** Search for `site:yourdomain.sk`. Hundreds of pages in Japanese, or selling pills or gambling, mean the so-called Japanese keyword hack, one of the most widespread.
- **An unknown administrator** in the WordPress user list.
- **Your host has suspended the account**, or writes that spam is leaving your server.
- **Search Console**, the Security & Manual Actions section: a security issue reported there means Google has already confirmed the hack.

## The first hour: what to do and what not to do

**Do:**

1. **Copy the current state** of the files and the database before changing anything. It is the evidence used to find how the attacker got in. Delete everything and you destroy the trail.
2. **Change every password:** hosting, FTP or SFTP, the database, every WordPress administrator, and the email address that password resets go to.
3. **Remove unknown administrators** and check the permissions of the other accounts.
4. **If the site is sending visitors to scam pages, take it down** behind a maintenance page. You are protecting customers and the company's name. A day without a site costs less than a week of sending people to a fraud.
5. **Contact your host.** They usually keep access logs showing when and from where the attack happened.
6. **If the site has forms or a shop,** establish whether the attacker could reach personal data. Where there is a risk to people, the 72-hour notification duty applies; more in [GDPR for a small business](/en/blog/gdpr-for-small-business/).

**Do not:**

- **Blindly restore the last backup** and consider the matter closed. The backup may already contain the backdoor, and the hole the attacker used stays open.
- **Install three security plugins at once.** You add third-party code and a feeling of safety; the hole stays open.
- **Wait for it to pass.** Within days Google drops a hacked site from the results and stops showing ads that point to it.

## How the attacker got in

On WordPress it is nearly always the same routes:

- **An out-of-date plugin or theme** with a known vulnerability. The author releases a fix, the vulnerability becomes public, and the same week automated scripts sweep the internet for sites that did not update.
- **A pirated "nulled" theme or plugin.** A paid theme downloaded free from a sharing site ships with the backdoor built in. Updating will not help here.
- **An abandoned plugin** its author stopped developing. Nobody will ever fix the vulnerability in it.
- **A weak or reused password** without two-factor authentication.
- **Another site on the same hosting account**, such as a forgotten test copy at `old.yourdomain.sk`. The attacker comes in through it and reaches everything alongside.

Hence the main rule: **cleaning without finding the hole is pointless.** The site stays clean until the next pass of the bot.

## Cleaning up in the right order

Order matters, because malicious code restores itself from places a quick clean-up forgets:

1. **WordPress core** against the official version. The WP-CLI command `wp core verify-checksums` lists every altered file. Reinstalling core entirely is safest.
2. **Plugins and themes** replaced with clean copies from official sources. Delete unused ones, and pirated ones without discussion.
3. **The `wp-content/uploads` folder**: there must be no PHP file in it. If there is one, it is not yours.
4. **The `wp-config.php` and `.htaccess` files and the `mu-plugins` folder**: redirects and backdoors are most often planted here.
5. **The database**: the settings table (site address, active plugin list), the users, scripts injected into post content, and scheduled tasks.
6. **New security keys** in `wp-config.php`. They log everyone out, including an attacker holding a stolen session.
7. **Updates, two-factor authentication and a limit on login attempts.**
8. **Search Console**: request a review in Security & Manual Actions. Pages the attacker created must return 404 or 410, and resubmit the sitemap.

How to recognise the other faults that have nothing to do with a hack is covered in [WordPress website repair](/en/blog/wordpress-website-repair/).

[CTA_FORM:audit]

## What doing nothing costs

A hack is not a technical detail that can wait until next month:

- **Traffic from Google falls** while the warning sits under the result, and it is lifted only after a review.
- **Advertising stops.** Google Ads does not serve ads that lead to compromised sites, and you are paying for a campaign that is not running.
- **Email lands in spam.** If spam went out from the server, the domain ends up on blocklists, and your invoices and quotes with it.
- **Trust.** A customer you sent to a scam page does not come back.

## When to stop cleaning and rebuild

Plainly: WordPress with plugins from twenty different authors is a technology whose upkeep is a permanent cost, and a hack is the bill for skipped upkeep. A one-off hack of a maintained site is worth cleaning. Patching stops making sense when:

- it is the **second hack in a year**;
- the site runs on a **pirated theme** or a **page builder with thirty plugins**, half of which nobody develops any more;
- the plugins need an **old PHP version** and the site falls apart on updating;
- **nobody will update the site every month**, so a year from now you are back here.

At that point it is cheaper to rebuild on a modern stack. A site generated in advance with Next.js, for instance, has no login page on its public address, no database anyone can write to, and no plugins from strangers. No site is unhackable, but the attack surface is a fraction of an ordinary WordPress install. This site runs that way: no database and no admin panel on the public address, with the server answering in about 0.09 seconds.

Both approaches are compared in [WordPress or custom](/en/blog/wordpress-or-custom/), and real prices for a new site are in [what a website costs in Slovakia](/en/blog/website-cost-slovakia/).

## Avoiding a hack while the site still runs

If you are not replacing the site yet, the minimum is clear: updates once a month, off-server backups with a tested restore, two-factor authentication for every administrator, and deleting everything unused. What exactly maintenance covers and what it costs is in [WordPress maintenance](/en/blog/wordpress-maintenance-cost/).

## If you need help

I clean hacked sites, including finding and closing the hole the attacker came through, and handle the review request in Search Console. **35 €/hr**; I usually diagnose on the day you report it and give an estimate before any work. I do not run hosting for you and do not give legal advice on the GDPR. My part is the site, cleaning it and securing it.

I build new sites on a modern stack, without plugins and without a public admin panel. I have lived in Slovakia for over ten years, have launched **12+ sites for Slovak companies**, and work as a Slovak s.r.o. issuing a faktúra you can expense.

Details on the [website repair service page](/en/service/bugfix/). If you would rather first know what is wrong with the site, the [free audit](/en/seo-audit/) returns results within 3 working days.

[CTA_FORM:webdev]
