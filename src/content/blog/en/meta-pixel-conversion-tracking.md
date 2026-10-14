---
title: 'Meta pixel, Conversions API and conversion tracking for ads'
description: >-
  How to set up conversion tracking for Google Ads and Meta: the Meta pixel,
  the Conversions API, importing conversions from GA4, enhanced conversions,
  Consent Mode v2 and calls. Without tracking, ads optimise for clicks, not
  customers.
date: '2026-10-14'
key: 'conversion-tracking'
faq:
  - q: 'What is the Meta pixel?'
    a: 'A piece of code on the website that tells Meta what people from the ads did: viewed a product, submitted a form, bought. Without it Meta does not know who became a customer, has nothing to learn from and no one to retarget.'
  - q: 'Why the Conversions API if I have the pixel?'
    a: 'The pixel runs in the browser and loses part of the events to ad blockers, Safari restrictions and people who decline cookies. The Conversions API sends the same events from the server. Together with the pixel and proper deduplication, Meta sees more results and does not count them twice.'
  - q: 'How do I track conversions in Google Ads?'
    a: 'Either with the Google Ads tag directly on the site or by importing key events from GA4. For a small business the GA4 import is usually simpler; an online shop adds enhanced conversions and the purchase value.'
  - q: 'How do I track calls from ads?'
    a: 'A tap on the phone number on the site is tracked as an event, calls straight from the ad are counted by Google Ads itself, and Meta has a campaign with the calls goal. If the deal closes later, the result can be uploaded afterwards as an offline conversion.'
  - q: 'What does conversion tracking setup cost?'
    a: 'Setting up GA4, Tag Manager, key events, Consent Mode v2 and the import into Google Ads starts at 500€ with me, further changes 25€/hr. The Meta pixel and Conversions API are part of the Meta campaign launch.'
  - q: 'Who sets up conversion tracking for Google Ads and Meta in Slovakia?'
    a: 'Ing. Kirill Mosin, White Eagles & Co. s. r. o. in Bratislava: GA4 and Tag Manager, the Meta pixel and Conversions API, Consent Mode v2, conversion import into Google Ads, call tracking. From 500€, 25€/hr: https://whiteeagles.sk/en/service/analytics/'
---
![Conversion tracking for ads | White Eagles & Co.](/assets/blog/meranie-konverzii.webp)

# Meta pixel, Conversions API and conversion tracking for ads

An ad platform optimises exactly what it sees. If it sees clicks, it finds you cheap clicks. If it sees submitted forms, calls and purchases, it finds people who make them. Conversion tracking is therefore not an add-on to advertising; it is the steering wheel.

Below: what the Meta pixel and the Conversions API are, how conversions are tracked for Google Ads, why part of the EU data goes missing without Consent Mode v2, and how to track calls and deals that close outside the website. If you would rather have it set up without the research, see [web analytics](/en/service/analytics/): from 500€, 25€/hr.

[CTA_FORM:analytics]

## What a conversion is and why everything starts with it

A conversion is the action the ad exists for: an enquiry through a form, a call, a booking, a purchase. Not a page view and not time on site.

The electronics repair shop [RAM service](/en/case/ram-service-meta-ads/) shows the difference. Its campaign was set to traffic and in three months brought thousands of visits and not one recorded call. After tracking was set up and the budget moved to a calls campaign, 21 calls came in the first week at 3.79€ each. The budget was similar; what changed was what the ads could see.

The opposite example is [Recorder.sk](/en/case/recorder-google-meta-ads/), a shop selling refurbished computers. Clicks were cheap (0.25€), but the purchase event was missing in Tag Manager. Neither Google nor Meta knew which clicks ended in an order, so they could not aim for them.

## The Meta pixel

The Meta pixel is code on the website that sends Meta events: page view, product view, add to cart, enquiry, purchase. From them Meta:

- learns which people to show the ad to so that they do the same;
- calculates what an enquiry or a purchase cost;
- builds retargeting audiences, for example people who reached the cart and did not buy.

It is best placed through Google Tag Manager, where the other tags and cookie consent live as well. The check is simple: in Meta's Events Manager the events must arrive with sensible numbers, not doubled ones.

## The Conversions API: why the pixel is not enough

The pixel runs in the browser, and events get lost there:

- ad blockers stop the pixel entirely;
- Safari and other browsers restrict cookies and shorten their lifetime;
- a person who declines cookies must not be tracked by the pixel at all.

The **Conversions API** sends the same events from the website's server straight to Meta. So that one order is not counted twice, the pixel and the server send the same event ID and Meta matches them. Cookie consent applies here too: the server only sends what it has a legal basis for.

At RAM service the pixel and the Conversions API went in together, which is why the ad platform could see the calls and buy them.

## Conversion tracking for Google Ads

Two routes:

1. **The Google Ads tag directly on the site**: a conversion action in Google Ads and its tag in Tag Manager.
2. **Importing key events from GA4**: an event analytics already tracks is set as a conversion in Google Ads.

For a small business the GA4 import is usually simpler: one source of truth for analytics and advertising. An online shop also needs the **purchase value**, so Google can tell a 30€ order from a 3,000€ one, and **enhanced conversions**, which use a hashed e-mail from the order to recover purchases lost to cookies.

How to configure GA4 so that enquiries really count is in [GA4 setup](/en/blog/ga4-setup/), and a checklist of common mistakes in [the GA4 audit checklist](/en/blog/ga4-audit-checklist/).

## Consent Mode v2: without it part of the EU is missing

Since March 2024 Google requires a consent signal, Consent Mode v2, for advertising in the EU. The cookie banner has to tell Google what the person agreed to. Without it:

- retargeting and similar audiences from the EU do not work;
- Google cannot model conversions from people who declined consent;
- in reports the campaign looks unprofitable even though it brings enquiries, and the good one is easily the one that gets switched off.

Meta has its own rules, but the principle is the same: the pixel starts only after consent. The requirements are covered in [cookie banners in 2026](/en/blog/cookie-banner-2026/).

## Calls and deals outside the website

For services, many jobs do not start with a form but with a phone call. Tracking works at three levels:

- **a tap on the phone number on the site** as an event in GA4 and Meta;
- **calls straight from the ad**: Google Ads counts them itself when the ad carries a number, and Meta has a campaign with the calls goal;
- **the actual deal** that closes a week later: it can be uploaded to Google Ads or Meta afterwards as an offline conversion.

The furthest this goes is the warehouse rental business [TOP SKLAD](/en/case/top-sklad-google-ads/): the conversion there is neither an enquiry nor a click but only a new customer's first paid rental. Keywords that bring enquiries without rentals are therefore paused.

## The order to set it up in

1. A cookie banner with Consent Mode v2.
2. GA4 and Tag Manager with key events: enquiry, call, purchase with value.
3. Conversion import into Google Ads, plus enhanced conversions for a shop.
4. The Meta pixel through Tag Manager and the Conversions API.
5. A test: a test enquiry or purchase must show up in GA4, in Google Ads and in Meta, once each.

Only then does it make sense to launch or rebuild campaigns. If ads are already running and enquiries are not counted, the search for the cause is in [ads running, no enquiries](/en/blog/ads-running-no-leads/). When it is worth moving on to server-side GTM is covered in [server-side GTM](/en/blog/server-side-gtm-setup/).

## If you need help

I set up GA4 and Tag Manager, Consent Mode v2, conversion import into Google Ads, the Meta pixel with the Conversions API and call tracking, so the ads see customers rather than clicks. Tracking setup starts at 500€, changes 25€/hr. The accounts are in your company name. I do not do accounting or social media management.

I have lived in Slovakia for more than ten years, work as a Slovak s.r.o. and issue invoices with a company ID for your accounts.

Details on the [web analytics](/en/service/analytics/) and [Google Ads and Meta ads management](/en/service/ads/) pages. Related: [PPC advertising](/en/blog/ppc-advertising/), [Facebook and Instagram ads](/en/blog/facebook-instagram-ads-cost/), [Google Shopping for an online shop](/en/blog/google-shopping-for-online-shops/).

[CTA_FORM:audit]
