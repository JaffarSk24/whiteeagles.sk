---
title: 'Configuring GA4 in 2026: how to make sure enquiries are actually counted'
description: >-
  Step-by-step Google Analytics 4 setup through Tag Manager with Consent Mode
  v2: events, key events, linking Search Console and Ads. Plus five mistakes
  that leave reports showing zero conversions while enquiries keep arriving.
date: '2026-08-04'
key: 'ga4-setup'
faq:
  - q: 'Why does GA4 show zero conversions when enquiries are arriving?'
    a: 'The most common cause: the event goes into dataLayer but there is no tag in Tag Manager passing it to GA4. The second most common: the event arrives but is not marked as a key event, so it is missing from the conversions report. Both take ten minutes to check.'
  - q: 'Should GA4 be connected directly or through Tag Manager?'
    a: 'Through Tag Manager. Direct connection looks simpler, but within a month you will need a second script, a third, cookie consent and events — all of it requiring edits to the site code. The critical rule: never connect both ways at once, or every figure doubles.'
  - q: 'What is Consent Mode v2 and is it mandatory?'
    a: 'It is the mode in which Google receives a signal about the visitor''s consent and behaves in a limited way until it arrives. Since March 2024, without it Google Ads does not accept EU data for remarketing and conversion modelling. In practice: without Consent Mode v2 some conversions are not counted at all.'
  - q: 'How long does GA4 keep data?'
    a: 'Two months by default. It is changed by hand in the data retention settings to 14 months — the maximum for the free version. Leaving the default is a bad idea: after two months you can no longer compare period against period.'
  - q: 'Does a small company need server-side Tag Manager?'
    a: 'Usually not. It addresses data loss from blockers and browser restrictions and is justified where the advertising budget is significant. A small company should first get ordinary measurement working correctly.'
---
![Configuring Google Analytics 4 in 2026 | White Eagles & Co.](/assets/blog/blog3.webp)

# Configuring GA4 in 2026: how to make sure enquiries are actually counted

Analytics is installed on almost every site. Working analytics is on far fewer.

The difference is simple. The first shows how many people arrived. The second answers the question the site was built for: **how many of them left an enquiry, and where they came from.** Between those two states lie a handful of settings almost nobody finishes.

Below: the order of operations and the five mistakes I find most often when called in to work out why the reports are empty.

[CTA_FORM:analytics]

## The order this is done in

The sequence matters: each step rests on the previous one.

1. Google Tag Manager on the site.
2. GA4 connected **through** Tag Manager, not directly.
3. A cookie banner with Consent Mode v2.
4. Events matching the real actions on the site.
5. Key events (conversions).
6. Links to Search Console and Google Ads.
7. Data retention and an internal traffic filter.

## Step 1. Tag Manager, not code in the site

GA4 can be installed two ways: paste the code into the site, or connect it through Google Tag Manager.

Pasting directly is faster exactly once. Then it starts: an advertising pixel is needed — edit the code; a form submission event is needed — edit the code; all of it needs disabling until cookie consent — edit the code again. Through Tag Manager this is done in an interface, without a developer.

**An important warning.** The most expensive mistake at this step is connecting GA4 both ways — directly and through the container. Every pageview is then counted twice, and every figure in the reports is exactly double the reality.

Checking is simple. Open the site, right-click → "View page source" and search for `gtag/js?id=G-`. If that line is there and GA4 is also in the container, you have double counting.

## Step 2. Consent Mode v2 — before configuring events

The order here is not obvious but it matters. Consent Mode is configured **before** events, otherwise everything has to be redone later.

What it is. A visitor from the EU must not be tracked personally before consenting to cookies. Consent Mode v2 is the mechanism by which the site reports the consent state to Google. Before consent Google collects anonymised signals; after it, full data.

Why you cannot do without it. Since March 2024 Google Ads does not accept EU data for remarketing and conversion modelling if there is no consent signal. In practice it looks like this: the advertising runs, enquiries arrive, and the reports show the campaign losing money.

The second common problem is the opposite: the banner blocks measurement more than it should, and data is lost even where the person did consent. Full analysis in [the cookie banner in 2026](/en/blog/cookie-banner-2026/).

## Step 3. Events matching reality

GA4 collects some events itself: pageviews, scrolling, clicks on external links. Automatic events are useful, but enquiries are not among them.

Enquiries you have to send yourself. For a small company four are usually enough:

| Event | When it fires |
|---|---|
| `generate_lead` | the enquiry form was sent successfully |
| `click_phone` | a tap on the phone number |
| `click_email` | a tap on the email address |
| `click_whatsapp` | opening a messenger |

Clicks on phone numbers and messengers are usually underrated, and on mobile they are often the main way people get in touch.

**Critical:** the event must fire after a **successful** submission, not on the button press. Otherwise the reports show enquiries that never happened: the person clicked, the form errored, no email left, and a conversion was counted.

A separate warning. Do not use the `purchase` event for a form submission. That is an e-commerce event, it carries revenue with it, and money nobody paid starts appearing in reports. An enquiry is `generate_lead`.

## Step 4. Key events — without them there are no conversions

The point people stumble on most.

An event can reach GA4 perfectly, but until it is marked as a **key event** the conversions report shows zero. And Google Ads shows zero too, which means campaigns have nothing to optimise on.

It is done in GA4: **Admin → Events** → the "Mark as key event" toggle next to the one you need.

Checking takes a minute: **Reports → Realtime**, send a test enquiry from a phone and confirm the event appears.

[CTA_FORM:audit]

## Step 5. Links that give more than the analytics itself

Three connections, made once, that change the quality of the data:

**Search Console.** A search queries report appears inside GA4 — you can see which words bring people in and what they do next.

**Google Ads.** Conversions from GA4 pass into the campaigns and the algorithm starts optimising towards enquiries rather than clicks. Without this, advertising spends the budget on the cheapest clicks. More in [Google Ads for a small business](/en/blog/google-ads-getting-started/) and on the [advertising service page](/en/service/ads/).

**Microsoft Clarity.** A free session recording and heatmap service. It answers "why" once GA4 has shown "what" — for instance, that everyone abandons the form at the third field.

## Step 6. Settings people forget

**Data retention.** By default GA4 keeps detailed data for two months. Change it in **Admin → Data retention** to 14 months, the maximum for the free version. Otherwise, after two months comparing period against period becomes impossible.

**Internal traffic filter.** Your own visits and your contractor's land in the statistics and distort them at small volumes. Configured in the data stream, in the internal traffic section.

**Reporting time zone.** It must match the real one, otherwise daily figures shift.

## Five mistakes I find most often

Not theory — what actually turns up when checking other people's setups:

1. **Events go into `dataLayer` but there is no tag in the container** passing them to GA4. No enquiries in the reports at all, while technically everything is "configured".
2. **GA4 connected twice** — directly and through the container. Every figure doubled.
3. **The key event is not marked.** Enquiries arrive, conversions read zero.
4. **`purchase` instead of `generate_lead`.** Non-existent revenue glowing in the reports.
5. **The cookie banner blocks measurement after consent.** Data lost silently.

What all five share: the site works, enquiries arrive, and nobody suspects anything — until it is time to judge whether the advertising pays.

## How to check everything works

Three checks, fifteen minutes:

1. Open the site in a private window, accept cookies, send an enquiry.
2. GA4 → **Realtime** → the `generate_lead` event should appear.
3. A day later: **Reports → Engagement → Conversions** → the event should be in the list.

If any step is empty, the chain is broken somewhere and has to be walked backwards from the end.

## If it is easier to have someone else set it up

I will configure GA4, Tag Manager and Consent Mode so the numbers match reality, and show where the enquiries actually come from. Details on the [web analytics service page](/en/service/analytics/).

I have lived in Slovakia for over ten years, work as a Slovak s.r.o. and issue a faktúra with an IČO.

Related: [server-side GTM: when it pays off](/en/blog/server-side-gtm-setup/), [the DIY SEO audit](/en/blog/seo-audit-yourself/) and [why a cookie banner is mandatory](/en/blog/cookie-banner-2026/).

[CTA_FORM:cookies]
