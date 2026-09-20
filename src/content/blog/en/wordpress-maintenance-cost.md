---
title: 'WordPress maintenance: updates, backups, changes and what it costs'
description: >-
  What WordPress maintenance covers, how often to update, why updates must
  never be run blind, where maintenance ends and development begins, and what
  it all costs. And why a site on a modern stack needs a fraction of the upkeep.
date: '2026-09-12'
key: 'wordpress-maintenance'
faq:
  - q: 'What does WordPress maintenance include?'
    a: 'Core, plugin and theme updates with a backup before each, off-server backups with a tested restore, a current PHP version, uptime and SSL certificate monitoring, form tests, a check of user accounts, and removal of unused plugins. Small content changes are usually handled along the way.'
  - q: 'How often should WordPress be updated?'
    a: 'Security fixes as soon as they are released, other updates once a month. Major versions of a page builder, shop or theme go onto a test copy first. Updating once a year is not enough: mass hacks exploit holes that have had a fix available for weeks or months.'
  - q: 'What does WordPress maintenance cost?'
    a: 'The work is billed hourly at 35 euros. For a small company site the monthly check with updates and testing usually takes an hour or two. On top come hosting and the domain, roughly 50 to 150 euros a year, and annual licences for any premium plugins. Unplanned repairs after a bad update are extra.'
  - q: 'What happens when nobody maintains the site?'
    a: 'Nothing visible at first. Then a vulnerability turns up in a plugin and the site is hacked, or the host drops support for an old PHP version and the site falls apart at the forced switch, or the form stops sending and enquiries go nowhere for months.'
  - q: 'Does a custom-built site need maintenance too?'
    a: 'Less. A site on a modern stack with no plugins and no public admin panel has nothing to update monthly; dependencies are refreshed occasionally and on schedule. Every new site I build comes with six months of free support: monitoring, backups, updates and bug fixes.'
---
![WordPress maintenance: updates, backups, changes | White Eagles & Co.](/assets/blog/sprava-wordpress-webu.webp)

# WordPress maintenance: updates, backups, changes and what it costs

A WordPress site is not finished on launch day. It is core, a theme and ten to thirty plugins from different authors, each releasing updates at its own pace. When nobody keeps track, the site looks the same for years while quietly ageing inside, until one day it breaks all at once.

Below: what maintenance covers, how to do it so an update does not take the site down, where maintenance ends and development begins, what it costs, and when to stop paying to keep outdated technology alive.

[CTA_FORM:bugfix]

## What maintenance covers

**1. Updates.** WordPress core, plugins, the theme, translations. Security fixes immediately, the rest monthly. Never without a fresh backup.

**2. Backups.** Files and database, stored away from the server the site runs on. A backup on the same hosting disappears with the site when the host fails or suspends the account. And every so often a **tested restore**: a backup you cannot restore from is only a feeling of safety.

**3. The PHP version.** Every PHP version has a limited support period. PHP 8.1 stopped receiving security fixes at the end of 2025; PHP 8.2 stops at the end of 2026. The host then switches the version off, and old plugins that do not work with the new one take the site down.

**4. Uptime and the SSL certificate.** Monitoring that reports an outage before a customer calls, and a check that the certificate renews.

**5. Form tests.** Once a month, a real submission from a phone in a private window. A form that pretends to have sent is the most expensive silent fault: enquiries fail to arrive for months and nobody knows.

**6. Security.** The administrator list, two-factor authentication, deleting unused plugins and themes. Every unused plugin is third-party code that brings nothing and may carry a vulnerability.

**7. Licences.** Premium plugins and themes are paid yearly. When a licence lapses, the security updates stop too.

## Why updates must never be run blind

An update is the most common reason a WordPress site goes down. Not because the update is faulty, but because two plugins from different authors stop working together after the change, or edits made directly inside the theme get overwritten by the new version.

The order that saves your nerves:

1. **A backup** right before updating.
2. **A test copy** for major versions of a page builder, shop or theme.
3. **Updating** one major plugin at a time, not everything with one click.
4. **Checking** the home page, the form, the cart and the admin area.
5. **Never on a Friday evening**, and never before a campaign.

If an update leaves a white screen or an error, the steps are in [WordPress website repair](/en/blog/wordpress-website-repair/).

## Changes: where maintenance ends and development begins

Swapping a text, a price or a photo, or adding a page to an existing template, is ordinary site upkeep. A new feature, such as booking, a client portal or a link to accounting software, is development and deserves its own estimate.

Two rules that save a lot of money:

- **Never put code changes directly into the theme.** The next update wipes them. They belong in a child theme or a custom plugin.
- **"The plugin almost fits" is a warning.** Bending someone else's plugin to your logic is a change you must repeat at every update. With enough such changes, you are paying to maintain something that does not fit anyway.

[CTA_FORM:consult]

## What WordPress maintenance costs

Honestly, line by line:

| Item | Cost |
|---|---|
| **Domain and hosting** | roughly 50-150 € a year |
| **Premium plugin and theme licences** | if the site uses them, each is paid yearly |
| **Monthly maintenance** (updates, backup check, form test) | for a small company site usually 1-2 hours, at 35 € with me |
| **Unplanned repairs** | after a bad update, a hack, or a forced PHP change |

The last line is the most expensive because it cannot be planned. Regular maintenance does not eliminate it, but shrinks it considerably.

## What happens without maintenance

The scenarios people call me about most often:

- **A hack** through an out-of-date plugin. The site redirects to a casino and Google warns visitors. The steps are in [hacked WordPress site](/en/blog/hacked-wordpress-site/).
- **A slowdown** that creeps in with every added plugin until the site takes four seconds to load on a phone. More in [slow WordPress site](/en/blog/slow-wordpress-site/).
- **A forced PHP change** by the host, and a site that falls apart afterwards because half its plugins have not been updated in years.
- **A silently broken form.** The site looks fine, enquiries stop, and nobody knows why.

## Maintenance versus a new site on a modern stack

Here is the heart of it. With WordPress, maintenance is **a permanent cost built into the way it is made**: a site assembled from plugins by twenty authors has to be checked every month, because each one is a separate risk. The best maintenance cannot remove that; it can only pay for it.

A custom site on a modern stack, such as Next.js, is built differently. It has no plugins, no admin panel on the public address, and its pages are generated in advance. There is nothing to update every month, dependencies are refreshed occasionally and on schedule, and a content change can never result in one plugin breaking another.

When it pays to stop paying for upkeep and rebuild:

- the site **breaks after an update** more than once a year;
- half its plugins **depend on an old PHP version**;
- there are so many "make the plugin almost fit" changes that **nobody dares to update**;
- over the last two years you have paid for upkeep and repairs as much as a new site would cost.

Real prices for a new site are in [what a website costs in Slovakia](/en/blog/website-cost-slovakia/), and the two approaches are compared in [WordPress or custom](/en/blog/wordpress-or-custom/).

## A monthly checklist

If you look after the site yourself, this is the monthly minimum:

1. A backup of files and database, off the server.
2. Core, plugin and theme updates, major versions on a copy first.
3. A check of the home page, form, cart and admin area after updating.
4. A test form submission from a phone.
5. The administrator list: nobody unknown, everyone on two-factor authentication.
6. Deleting unused plugins and themes.
7. Once a quarter, a trial restore from backup.

## If you need help

I maintain existing WordPress sites: updates with a backup and testing, off-server backups, PHP version changes, small changes, and repairs after bad updates. I bill hourly at **35 €**, with no flat fee for months when nothing is done. I do not sell hosting or plugin licences; my part is the work on the site.

I build new sites on a modern stack that need a fraction of the upkeep, and each comes with **six months of free support**. I have lived in Slovakia for over ten years and have launched **12+ sites for Slovak companies**, such as [Krása štúdio OK](/en/case/studio-krasy/) with booking through Telegram. I work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details on the [website repair service page](/en/service/bugfix/). If you want to know what state your site is in today, the [free audit](/en/seo-audit/) returns results within 3 working days.

[CTA_FORM:webdev]
