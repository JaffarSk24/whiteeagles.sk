---
title: 'How to check a GA4 setup: the checks that catch the errors'
description: >-
  How to check GA4 and Tag Manager set up by someone else: comparing enquiries
  in GA4 with your inbox, account ownership, time zone, data retention,
  internal traffic, duplicate events, Consent Mode v2, and a table of checks
  showing what good looks like.
date: '2026-09-12'
key: 'ga4-audit'
faq:
  - q: 'How do I know GA4 counts enquiries correctly?'
    a: 'Compare the number of enquiry events in GA4, usually generate_lead, with the enquiries that actually arrived by email over the same period. Slightly fewer in GA4 is normal, because some people decline cookies. More in GA4 than in the inbox means a duplicate or clicks counted instead of submissions. Zero or a fraction means the chain is broken.'
  - q: 'Why should the GA4 and Tag Manager accounts belong to the company, not the contractor?'
    a: 'Because the data and the configuration belong to the company. If the property was created in an agency, freelancer or former employee account, you can lose both the data history and the container with all its tags when the relationship ends. The owner should be the company Google account, with the contractor given access.'
  - q: 'How many months of data does GA4 keep?'
    a: 'Two months by default; the free version can be set to 14 months. The limit applies to detailed data in explorations, standard reports are not restricted by it. The change only works going forward: data already deleted does not come back.'
  - q: 'How do I check that Consent Mode v2 works?'
    a: 'Open the site in Tag Assistant preview mode and look at the consent state on the first events. Before a choice is made on the banner, storage should be denied and the tags should wait for consent. After accepting, a consent update to granted must follow; after declining, the state must stay denied.'
  - q: 'What does checking or fixing a GA4 setup cost?'
    a: 'The free website audit also checks whether GA4 and Tag Manager record enquiries or only page views, with a written result within 3 working days. Setting up or fixing GA4 with Tag Manager starts from 500 euros, the work is billed at 25 euros an hour, and the price is known before work begins.'
---
![How to check a GA4 setup | White Eagles & Co.](/assets/blog/kontrola-ga4.webp)

# How to check a GA4 setup: the checks that catch the errors

GA4 is on the site, so is Tag Manager, and the contractor says "everything is set up". The reports show visits, sources and even some conversions. Whether those numbers match reality, though, cannot be told by looking at a report. When I check other people's setups, errors are far more common than a clean configuration, and most are silent: decisions simply get made on the wrong numbers.

This article follows on from the [GA4 setup guide](/en/blog/ga4-setup/), which covers the five most common mistakes and a quick realtime test. Here the subject is a deeper audit of a finished setup that someone else built: what to check, where to find it, and what state a professional GA4 setup should pass.

[CTA_FORM:analytics]

## The check that tells you the most: GA4 versus the inbox

Before opening a single setting, run a comparison that needs no knowledge of GA4:

1. Pick a closed period, for example the last full month.
2. In GA4, find the number of enquiry events for that period, most often `generate_lead`.
3. In your inbox, CRM or spreadsheet, count the enquiries that actually came from the site on the same days.

How to read the result:

| Result | What it means |
|---|---|
| GA4 slightly lower than the inbox | normal: some people decline cookies or block tracking |
| GA4 higher than the inbox | the event is counted twice, or fires on the click rather than on a successful submission |
| GA4 at zero or a fraction | the chain is broken: tag, trigger, consent or key event |
| GA4 matches, Google Ads shows another number | the fault is in the link or in how Ads counts the conversion |

How big a gap is normal depends on how many visitors decline the banner, but when most enquiries are missing, that is an error, not consent. Watch the dates too: if the property uses a different time zone, late-evening enquiries shift into the neighbouring day and a day-by-day comparison will not match.

This comparison matters most. Every other check only looks for where the gap comes from.

## Who owns the GA4 account and the Tag Manager container

- In GA4, under **Admin**, open access management at both account and property level. The highest role should belong to the company Google account, not the personal account of an agency, a freelancer or a former employee.
- In Tag Manager, the same for the account and the container: the company should have full permissions, including publishing and user management.
- The contractor should have **granted access** that can be removed at any time.

If everything sits in the contractor's account, parting ways can cost you the data history and the whole container. Sort it out while the contractor still cooperates. On the sites I build, domain and hosting are likewise registered to the client.

## Property settings: time zone, currency, data retention

**Time zone and currency.** Property details should show Slovakia with the **Europe/Bratislava** time zone and **EUR** as the currency. A wrong time zone shifts days in reports and breaks the inbox comparison; a wrong currency distorts conversion values and revenue. A time zone change only applies going forward.

**Data retention.** Two months by default; the free version can be set to **14 months**. This applies to detailed data in explorations; standard reports are not limited by it. At two months, seasons cannot be compared in explorations.

## Internal traffic and unwanted referrals

**Internal traffic** has two parts, and both are needed. The first is the internal traffic definition in the data stream's tag settings, usually by the office IP address. The second is a **data filter** that excludes it. A filter can sit in testing state, where it excludes nothing yet. A common finding: the rule exists, and the filter has been in testing for years. The opposite mistake: an active filter with the wrong IP address that cuts out customers too. Data excluded by an active filter cannot be recovered.

**Unwanted referrals.** When a customer leaves for a payment gateway or an external booking service and comes back, GA4 may start a new session with the gateway as the source. The purchase or enquiry is then credited to the gateway, not to the ad that brought the customer. Such domains belong in the unwanted referrals list in the tag settings.

**Your own domain** among the sources is suspicious too: usually a page lacks the tag, or cross-domain measurement is missing.

## Duplicate page views and unreliable form events

Beyond GA4 installed twice, which the setup guide covers, an audit finds subtler variants:

- **Code hard-coded into the template plus a tag in Tag Manager** with the same measurement ID.
- **Browser history changes.** Enhanced measurement can count a page view when the address changes without a reload. If Tag Manager also sends its own `page_view` on the same change, every page is counted twice.
- **Form interactions from enhanced measurement.** The automatic `form_start` and `form_submit` follow browser behaviour, not whether the enquiry was really sent: on some forms they never fire, on others they count failed attempts. An enquiry should be its own event after a successful submission.

To check: in Tag Assistant preview, visit three pages and count `page_view` on each. There should be exactly one.

## Key events and links

- **Key events** should be enquiries and, if you want them, phone clicks, not `page_view`, `scroll` or `form_start`.
- **Product links** should include Google Ads, if ads are running, and Search Console. Without the Ads link, campaigns do not optimise for enquiries; without Search Console, GA4 has no search queries.
- In Google Ads, the enquiry conversion should be **primary** and counted as **one per interaction**, so a repeated form submission is not two enquiries.

More causes of ads without enquiries are in [ads running, no leads](/en/blog/ads-running-no-leads/).

[CTA_FORM:audit]

## Consent Mode v2: verify, do not trust the banner

A cookie banner on the site does not yet mean Consent Mode v2 works. It is verified in **Tag Assistant** preview mode:

1. Open the site and click nothing on the banner. On the first events, the default consent state should be **denied** for `ad_storage`, `analytics_storage`, `ad_user_data` and `ad_personalization`.
2. The GA4 and Google Ads tags should wait for consent: no analytics or advertising cookies written.
3. Click accept. A consent **update** to granted must follow, and measurement continues.
4. Repeat in a new window and decline: the state must stay denied.

Typical findings: no default state, so tags fire before a choice; consent set only after the tags fire; or no update after accepting. What the rules actually require is in [the cookie banner in 2026](/en/blog/cookie-banner-2026/).

## DebugView and the landing page report

**DebugView** in Admin shows events from a test device in the order they arrive, with their parameters. A test enquiry should show `generate_lead` once, with the expected parameters. While Tag Assistant preview is running, your device appears in DebugView.

**"(not set)" among landing pages.** In the landing page report for the last month, check how many sessions show "(not set)" instead of a page. It happens when a session does not begin with a page view, for example when tags and consent run in the wrong order. A small share appears almost everywhere; a noticeable share means the page tag is not arriving reliably.

If the site also sends data through its own server, the checks are the same, with a server container added. More in [server-side GTM: when it pays for itself](/en/blog/server-side-gtm-setup/).

## The table of checks

| Check | Where | Good looks like |
|---|---|---|
| GA4 enquiries versus inbox | GA4 reports, email | GA4 slightly lower, never higher |
| Ownership | GA4 and GTM access management | the owner is the company account, the contractor has access |
| Time zone and currency | property details | Europe/Bratislava, EUR |
| Data retention | data settings | 14 months |
| Internal traffic | data stream, data filters | definition exists, filter active |
| Unwanted referrals | tag settings | payment gateway and external services listed |
| `page_view` per page | Tag Assistant | exactly one |
| Enquiry event | Tag Manager | own event after a successful submission |
| Key events | Admin | only real enquiries and contacts |
| Links | product links | Google Ads and Search Console |
| Consent Mode v2 | Tag Assistant | denied by default, update after accepting |
| "(not set)" and own domain | landing pages, sources | small share, own domain is not a source |

If more than two rows are not in a good state, I would not yet base ad budget decisions on GA4 numbers.

## If you need help

I set up and audit GA4 and Tag Manager: enquiry events, key events, Consent Mode v2, links to Google Ads and Search Console, and fixing the errors an audit finds. A professional GA4 setup starts from **500€**, the work is billed at **25€** an hour, and I state the price before starting. I do not run advertising blind, without working measurement, and I do not sell GA4 licences or "SEO packages".

I have lived in Slovakia for over ten years and have launched **12+ sites for Slovak companies**. Every new site gets GA4 and Tag Manager with enquiry tracking and a cookie banner with Consent Mode v2. I work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details on the [analytics service page](/en/service/analytics/). If you first want to know whether your GA4 records enquiries or only page views, the [free audit](/en/seo-audit/) returns a written result within 3 working days. Access to Analytics and Search Console is optional but makes the result more precise.

[CTA_FORM:ads]
