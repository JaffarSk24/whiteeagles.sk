---
title: 'Ads are running and no enquiries come: 7 causes and how to check each one'
description: >-
  The budget is going, the clicks are there, the inbox is empty. Seven causes in
  the order the chain breaks — from irrelevant queries and uncounted conversions
  to the landing page and a form that silently sends nothing.
date: '2026-08-04'
key: 'ads-no-leads'
faq:
  - q: 'Ads have run for a month with zero enquiries. Is that normal?'
    a: 'No. On a sensible budget a month should produce at least a few contacts. Zero almost always means one of two things: the wrong people are arriving, or enquiries are arriving but not reaching you and not being counted.'
  - q: 'How do I tell whether enquiries are being lost rather than absent?'
    a: 'Send a test enquiry from a phone in a private window and check three things: did the email arrive, did the event appear in GA4 realtime, is there a record in the CRM or chat. Wherever the chain breaks is your answer.'
  - q: 'Why does Google bring irrelevant queries?'
    a: 'Broad match without negative keywords. Google interprets the query loosely, so an ad for "tvorba webstránok" reaches people looking for courses, jobs or a free template. It is visible in the search terms report.'
  - q: 'Can the landing page be to blame?'
    a: 'Yes, and it is one of the most common causes. Advertising pointed at the home page instead of the specific service, slow loading on mobile, or no price — they clicked, you paid, they left.'
  - q: 'Should I pause the ads while I investigate?'
    a: 'If the cause is measurement or the form, yes — otherwise you are paying for enquiries you will never see. If it is irrelevant queries, no need: narrow the match types and add negative keywords instead.'
---
![Ads are running and no enquiries come | White Eagles & Co.](/assets/blog/0-orders.webp)

# Ads are running and no enquiries come: 7 causes and how to check each one

A familiar situation: the budget drains, the report shows clicks, the inbox is silent. Before switching the campaign off or changing contractor, it is worth finding out exactly which step the chain breaks at.

There are only a few steps: **the person saw the ad → clicked → reached the page → sent an enquiry → it arrived and was counted.** Below are seven causes in that order, each with a check.

[CTA_FORM:ads]

## 1. The wrong people are arriving

The most common cause, and the fastest to check.

**How to check.** Google Ads → **Campaigns → Insights → Search terms**. These are not your keywords but the actual phrases your ads appeared on. Read the first fifty.

What usually turns up: `práca`, `kurz`, `zadarmo`, `ako urobiť sám`, `šablóna` — people looking for a job, a course, or a way to do it themselves. They click willingly and never buy.

**Cause.** Broad match without a negative keyword list. Google interprets the query loosely and brings in an adjacent audience.

**What to do.** Narrow the match types to phrase and exact, add negative keywords. A starter set for Slovakia is in [Google Ads: how not to waste the budget](/en/blog/google-ads-getting-started/).

## 2. Enquiries arrive but are not counted

The second most common — and the most galling, because business is happening and you cannot see it.

**How to check.** Open the site in a private window and send a test enquiry from a phone. Then GA4 → **Reports → Realtime** — the event should appear within a minute.

What usually turns up:

- the event goes into `dataLayer` but there is no tag in Tag Manager passing it to GA4
- the event arrives but is not marked as a **key event**, so conversions read zero
- conversions are not linked to the Google Ads account

That last one hurts twice: you cannot see the result **and** the algorithm has nothing to optimise on, so it economises on the cheapest clicks, which lead nowhere.

Step by step — [configuring GA4](/en/blog/ga4-setup/); the service itself — [web analytics](/en/service/analytics/).

## 3. The form pretends to have sent

A separate case, and one you will never find in the ads interface.

**How to check.** The same test enquiry — but now watch the inbox. Did the email arrive? Not in spam?

What usually turns up: the form displays "thank you" but no email leaves — the mail script broke after a migration, a mailbox password changed, messages land in the recipient's spam.

Check the mailbox everything arrives at, too: if the address is on a free domain with no records configured, part of your mail never reaches the inbox. That is one more reason to have [email on your own domain](/en/blog/sk-domain-guide/).

## 4. Consent Mode is not configured

The cause that gets working advertising switched off.

Since March 2024 Google does not accept EEA data for remarketing and conversion modelling unless the site reports the cookie consent state. Part of the conversions simply are not counted.

**How to check.** Open the site, accept cookies, send an enquiry. If GA4 shows the event but no conversion appears in Google Ads within a day, this is almost certainly it.

Analysis — [the cookie banner in 2026](/en/blog/cookie-banner-2026/).

[CTA_FORM:cookies]

## 5. The advertising points somewhere else

Someone searched `oprava wordpress webstránky` and landed on a home page listing all six services. They have to search again, now inside your site. Some will leave.

**How to check.** Walk the path yourself: click your own ad and see whether the page answers the question that was in the query. Not "is it mentioned somewhere" but specifically **the first screen**.

**What to do.** Each campaign points at its own service page. If that page does not exist, build it: it is cheaper than paying for people who leave.

## 6. The page is slow or awkward on a phone

More than half of clicks come from mobile. If a page takes 5 seconds, you paid for a click from someone who never saw it.

**How to check.** PageSpeed Insights, the **Mobile** tab — not Desktop. LCP under 2.5 seconds.

Look at the form separately, through the eyes of someone holding a phone: how many fields, does it need scrolling, does the cookie banner cover it?

There is a second, less obvious side here: **page speed affects the cost per click** through Quality Score. A slow site is paid for twice.

How to check the rest — [the DIY SEO audit](/en/blog/seo-audit-yourself/).

## 7. There is no reason to choose you

Technically everything works, the audience is right, the page is fast — and no enquiries. Then it is the offer.

Look at your page through the eyes of someone who has just opened three competitors. Is there:

- **a price, or at least a range** — its absence turns away more people than a high figure
- **timelines** — specific, not "as soon as possible"
- **proof** — real projects with names, not "over 100 satisfied clients"
- **mandatory details** — the IČO and address a Slovak buyer checks before paying ([what is required](/en/blog/mandatory-website-details/))
- **a simple next step** — a three-field form, not a questionnaire

What a Slovak client actually looks at is covered separately: [how Slovaks choose a contractor](/en/blog/how-slovaks-choose-contractor/).

## The order to check in

Not by importance but by speed — the things that take minutes first:

| # | Check | Time |
|---|---|---|
| 1 | Test enquiry: email + event in GA4 | 5 min |
| 2 | Search terms report | 15 min |
| 3 | Key event marked, Ads linked to GA4 | 10 min |
| 4 | Page speed on mobile | 5 min |
| 5 | Where the ads point | 10 min |
| 6 | Price, timelines, proof present | — |

The first four cover most cases and take under an hour.

## If it is easier to have someone else look

I go through the campaigns and the site, find where the chain breaks and say what to fix first. It often turns out the advertising was fine and the enquiries were not being counted — and switching it off was the mistake.

I have lived in Slovakia for over ten years, work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details — [advertising setup](/en/service/ads/) and [web analytics](/en/service/analytics/). If you have a site and are unsure what to do with it, the [free audit](/en/seo-audit/) comes back within 3 working days.

[CTA_FORM:audit]
