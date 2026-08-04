---
title: 'Krása štúdio OK: a beauty salon website with booking through Telegram'
description: >-
  A multilingual website for a beauty salon in Ružinov: the client picks a time,
  staff get a Telegram message, one tap confirms it and the slot closes.
client: 'Krása štúdio "OK"'
url: 'https://studio-krasy.sk'
image: '/assets/portfolio-studiokrasy.webp'
summary: 'A salon in Ružinov: booking on the site, confirmed with one tap in Telegram.'
service: 'telegram'
services:
  - 'Web development'
  - 'Bot and automation'
  - 'Three languages'
order: 2
---
![Krása štúdio OK — beauty salon website in Bratislava | White Eagles & Co.](/assets/portfolio-studiokrasy.webp)

# Krása štúdio OK: a beauty salon website with booking through Telegram

A beauty salon in Ružinov. A multi-page site with online booking — and the automation that makes that booking real rather than decorative.

## Where the difficulty is

Booking a salon appointment is not the same as ordering a product. A slot cannot be confirmed automatically: the specialist may fall ill, the previous treatment may run long, and the client may pick a time that is taken for that particular person.

The usual solution is a form that sends an email. Then someone has to see it, call back and agree on a time. So the form saved nothing, and the client is still waiting.

## What was built

Booking on the site is wired into Telegram.

1. The client picks a service, a specialist and a time.
2. Staff get a Telegram message immediately, not when someone opens their inbox.
3. One tap confirms it, and the slot closes on the site automatically.

No spreadsheets, no "I'll call you back", and no two clients booked into the same hour.

Telegram is not an arbitrary choice: staff already have it open. Any system that requires opening a separate panel does not survive in a salon, where the gap between treatments is a minute, not ten.

## Three languages

The site runs in Slovak, Russian and Ukrainian. For a salon in Bratislava that is not a luxury but a reflection of who walks in: some clients read Slovak comfortably, some do not, and losing the second group over language would be a waste.

Technically it matters that these are three versions on their own URLs linked by hreflang, not a switch over a single text. Otherwise a search engine cannot tell which version to show to whom, and ends up showing none of them properly.

## What it changed

Booking stopped depending on who checks the inbox and when. The client gets a confirmation while still thinking about the appointment, not a day later.

For the salon it is also protection against the most expensive mistake — a double booking. The slot is blocked the moment staff tap the button.

## Technically

Own hosting, domain registered to the client. A Python bot. Forms with spam protection and verified email delivery. Analytics that measures bookings, not views. A cookie banner with Consent Mode v2 and the company's mandatory legal details.

## If this sounds familiar

The "site plus Telegram" combination suits anyone who sells time: salons, barbershops, studios, trades, garages, tutors. The point is not the bot itself but that staff never switch tools.

More on the [Telegram bots](/en/service/telegram/) and [web development](/en/service/webdev/) service pages. Related projects: [Biliardovňa](/en/case/biliardovna/), [Top Sklad](/en/case/top-sklad/).
