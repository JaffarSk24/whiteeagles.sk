---
title: 'Server-side GTM: when it pays for itself and when plain GA4 is enough'
description: >-
  Server-side tagging without the marketing: how much data is really lost, what
  server-side GTM fixes and what it does not, what running it costs, and from
  what budget it makes sense. And what to do first.
date: '2026-08-25'
key: 'server-side-gtm'
faq:
  - q: 'What is server-side GTM in plain terms?'
    a: 'Normally the visitor''s browser sends the data to Google. With server-side tagging your own server receives it first and forwards it on. Blockers and browser restrictions hit the first route, not the second.'
  - q: 'How much data is lost without it?'
    a: 'It depends on the audience. For an ordinary Slovak company it is single digits to low tens of percent; for a technical audience more, because most of them run blockers. The exact figure cannot be guessed from outside, but it can be measured: compare the enquiries in your inbox with the conversions in GA4.'
  - q: 'What does running it cost?'
    a: 'The setup itself from 500 euros at 25 euros an hour. On top of that a server running around the clock — a recurring monthly cost, unlike ordinary GA4, which costs nothing.'
  - q: 'From what budget does it make sense?'
    a: 'While the ad budget is in the hundreds of euros a month, the gain will not pay for the server or the work. It starts making sense at a steady budget in the thousands, and for an online shop where measurement accuracy directly changes what the algorithm decides.'
  - q: 'Does server-side GTM replace cookie consent?'
    a: 'No. Consent is a legal requirement and server-side tagging does not lift it — Consent Mode v2 has to work just the same. Anyone selling it as a way around consent is selling you a problem.'
---
![Server-side GTM and GA4 setup | White Eagles & Co.](/assets/blog/GTM-GA4.webp)

# Server-side GTM: when it pays for itself and when plain GA4 is enough

Server-side tagging is sold as the cure for lost data. Sometimes it genuinely is. Far more often it is an expensive solution to a problem the company does not have — while the ones it does have go unfixed.

Below, factually: what it is, what it fixes, what it does not, what running it costs, and from what budget it is worth considering.

[CTA_FORM:analytics]

## What it is, without the marketing

In an ordinary setup the data goes to Google from **the visitor's browser**: a script loads, collects events and sends them straight to Google.

With server-side tagging the route differs. The browser sends the data **to your own server**, and that server forwards it on — to GA4, to Google Ads, to Meta. The difference is who talks to Google: not a third-party script in a browser, but your infrastructure.

Everything else follows from that — the benefits and the costs alike.

## What it genuinely fixes

**Ad blockers.** They block known script addresses. A request to your own domain is not blocked, because they do not know it.

**Browser restrictions.** Safari and Firefox cut the lifetime of cookies set by a browser script to a few days. A cookie set by the server is not subject to that, so a returning visitor does not show up as a new one.

**Page speed.** Some scripts move off the page onto the server. On sites carrying five measurement tools at once it is noticeable — and Google factors speed into positions.

**Control over what leaves.** On the server you can strip out what does not belong in the data — an email address in a page URL, parameters carrying personal data.

## What it does not fix

This is where most of the disappointment comes from.

**It does not replace cookie consent.** Consent Mode v2 has to work exactly the same. Server-side tagging is not a way around GDPR, and anyone selling it that way is selling you a problem. The requirements: [the cookie banner in 2026](/en/blog/cookie-banner-2026/).

**It does not turn wrong measurement into right measurement.** If the event fired on a button click rather than after a successful form submission, the same wrong event travels through the server.

**It does not bring enquiries.** It counts more accurately. What sells is the page, not the measurement.

**It is not free going forward.** The server runs continuously and bills monthly, even when nothing is happening.

## How much data is actually lost

The number most often inflated in proposals. The honest answer is that it depends on the audience: for an ordinary Slovak company it is single digits to low tens of percent, for a technical audience considerably more.

**You cannot guess it from outside, but you can measure it.** Take a month and compare two numbers:

1. how many enquiries actually arrived — inbox, Telegram, phone calls;
2. how many conversions GA4 shows for the same period.

The difference is your loss. And here comes the uncomfortable part: **in the overwhelming majority of cases I see, the blocker is not the culprit.** The culprit is measurement that never worked — the event does not reach GA4, it is not marked as a key event, GA4 is connected twice, or the cookie banner blocks measurement even after consent.

Server-side GTM changes none of that. How to check is in [configuring GA4](/en/blog/ga4-setup/).

[CTA_FORM:audit]

## What to do first

The order matters because it saves money. Until this works, server-side tagging has nothing to improve:

1. **GA4 through Tag Manager**, not directly in the code — and certainly not both at once, or every figure doubles.
2. **Consent Mode v2** configured before events.
3. **Events that match reality**: `generate_lead` after a successful submission, clicks on the phone number and messenger.
4. **Key events marked** — otherwise conversions read zero while enquiries keep arriving.
5. **Links to Google Ads and Search Console.**

Only once those five work, and the gap between your inbox and GA4 is still large, is there anything to discuss about a server.

## What it costs

Two lines, and the second is the one people forget when deciding.

**Setup** — from **500 €**, hourly rate **25 €/hr**. That covers the server, your own subdomain, moving the container, connecting GA4 and the ad accounts, and testing.

**Running the server** — a recurring monthly cost. The exact figure depends on traffic; the point is that unlike ordinary GA4, which costs nothing, here you pay every month including the quiet ones.

## From what budget it makes sense

Bluntly, because for most small companies the answer is "not yet":

**Not yet**, if the ad budget is in the hundreds of euros a month. More accurate measurement will save less than the server and the work cost.

**Yes**, if at least one of these holds:

- a steady ad budget in the thousands per month, where conversion accuracy directly changes what the automated strategies decide;
- an online shop measuring purchases and order value, not just enquiries;
- a long decision cycle where a visitor returns over weeks and a shortened cookie splits them into several different people;
- a technical audience where most people run blockers.

If none of that applies, the same money does more in content or in advertising — what that costs and returns is in [what Google Ads costs in Slovakia](/en/blog/google-ads-cost-slovakia/).

## How it is done

1. **A check of the current measurement.** Often it ends here, because the cause turns out to have nothing to do with a server.
2. **Server and subdomain** on your own domain.
3. **Moving the container** and connecting GA4, Google Ads, Meta.
4. **Consent Mode v2** on the server side.
5. **Running both routes side by side** for a few weeks — otherwise there is no way to say whether anything improved.
6. **Switching the old route off** only after that is confirmed.

Most guides skip the fifth step, and it is the one that answers whether the money was well spent.

## If you need help

First I look at whether you are losing data to blockers or to measurement that never ran correctly — and I say so plainly even when it does not turn into a larger job. Measurement setup from **500 €**, rate **25 €/hr**.

I have lived in Slovakia for over ten years, work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details on the [web analytics service page](/en/service/analytics/). Related: [configuring GA4](/en/blog/ga4-setup/), [the cookie banner and Consent Mode v2](/en/blog/cookie-banner-2026/) and [ads running, no enquiries](/en/blog/ads-running-no-leads/).

[CTA_FORM:consult]
