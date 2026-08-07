---
title: 'Accepting card payments on your website in Slovakia: what to choose in 2026'
description: >-
  Terminal, payment gateway or QR code — what each costs, what to check before
  signing with a provider, what has to work on the website side, and what to
  have ready before the 1 May obligation.
date: '2026-08-04'
key: 'card-payments'
faq:
  - q: 'Am I obliged to accept cashless payment?'
    a: 'From 1 May 2026, yes — on any purchase above one euro. The law requires you to make it possible, not to install a terminal, so a QR code for a bank transfer satisfies it.'
  - q: 'Terminal or payment gateway?'
    a: 'A terminal makes sense where customers pay on the spot in volume. A gateway suits anyone selling remotely: usually a transaction fee only, no monthly rental.'
  - q: 'Can I take card details directly on my own site?'
    a: 'You should not. The moment a card number reaches your server you fall under PCI DSS with everything that follows. The correct pattern is that details are entered on the gateway''s side and your site only receives the result.'
  - q: 'What do Slovak buyers expect besides cards?'
    a: 'Apple Pay and Google Pay, payment through their own banking app, and often cash on delivery. Leaving only one method cuts off everyone who prefers another.'
  - q: 'How long does connecting a gateway take?'
    a: 'The technical part is quick. The provider''s checks are not — they review your line of business and may ask for documents, and in some sectors that takes weeks. Start before you promise clients online payment.'
---
![Accepting card payments on your website | White Eagles & Co.](/assets/blog/webvardpay.webp)

# Accepting card payments on your website in Slovakia: what to choose in 2026

From 1 May 2026 a seller in Slovakia must give the buyer a way to pay cashlessly on any purchase above one euro. That turns a question many small businesses kept postponing into a deadline.

The good news: the law asks you to **make it possible**, not to buy hardware. There are three ways to do it, and they differ in cost by an order of magnitude.

[CTA_FORM:consult]

## Three ways to take money

**A payment terminal.** A physical device at the point of sale. Rental plus a percentage of turnover. Justified where the flow of customers is heavy and they pay on the spot.

**Payment on the website through a gateway.** The client pays by card without leaving the page. Usually a transaction fee only, no monthly rental. Suits online shops and anyone selling services remotely.

**A QR code for a bank transfer.** The cheapest option: no fee at all, the client scans the code and confirms the transfer in their own bank. It formally satisfies the legal requirement.

| | Terminal | Payment on site | QR code |
|---|---|---|---|
| Monthly charge | yes | usually none | none |
| Fee per payment | yes | yes | none |
| Works remotely | no | yes | yes |
| Money arrives | quickly | quickly | as an ordinary transfer |
| Suits | points of sale | shops and services | small turnover |

## What to check when choosing a gateway

There are enough providers on the Slovak market, and they differ in more than the percentage.

**The fee and its structure.** Look at the fixed part per transaction, not only the percentage. On an average order of 10 euros a fixed 0.25 euros weighs more than an extra half a percent.

**Payout timing.** Providers transfer to your account with different delays — from the next day to a week. For working capital that matters.

**Payment methods.** Cards are the minimum. But a Slovak buyer often expects Apple Pay, Google Pay and payment through their banking app too. Fewer steps, fewer abandoned carts.

**Onboarding checks.** The provider reviews your line of business and may refuse or request documents. In some sectors that takes weeks — worth establishing before you promise clients online payment.

**Refunds.** How a refund is processed, what it costs and how long it takes. This is thought about last and then dealt with in a hurry.

## What not to do

**Do not take card details directly on your own site.** The moment a card number reaches your server you fall within PCI DSS and everything it requires. The correct pattern is that details are entered on the gateway's side and your site receives only the result.

**Do not show a price without the final total.** If delivery or a fee is added at the last step, a share of buyers leaves precisely there. The total has to be visible earlier.

**Do not leave only one method.** Some Slovak buyers pay by card, some prefer a transfer, some want cash on delivery. One method cuts off the rest.

[CTA_FORM:webdev]

## What has to work on the website side

Connecting a gateway is not only pasting a key into settings.

**The payment page has to work on a phone.** More than half of payments come from mobile, and any awkwardness on a small screen turns into an abandoned cart.

**The return has to land somewhere meaningful.** After paying, the client should reach an order confirmation, not a blank "thank you" with no detail.

**Payment errors have to be handled.** Card declined, insufficient funds, expired — each needs a clear message and a way to try again. Otherwise the client simply leaves.

**The funnel must be measured.** How many people reached the payment page, how many pressed the button, how many paid. Without it you learn about a problem a month later from the revenue. How to set it up — [configuring GA4](/en/blog/ga4-setup/).

**And the link to the cash register.** If you are obliged to run an eKasa, it makes sense for the receipt to be issued automatically on payment rather than typed in per order. Details — [eKasa in 2026](/en/blog/ekasa-online-cash-register/).

## What it costs

Fees depend on the provider and your turnover, so I will not quote specific percentages — they change, and negotiating with a provider makes sense once turnover is meaningful.

What is worth calculating:

1. Work out your **average order value**. It determines whether the percentage or the fixed part weighs more.
2. Work out the **number of transactions a month**. At low volumes terminal rental does not pay for itself.
3. Add the **one-off integration cost**.
4. Compare against the QR code option, where there is no fee at all.

It often turns out that for a small business the combination of a QR code plus payment on the website satisfies both the law and the customers more cheaply than a terminal.

## What to do before 1 May

1. Decide how you make cashless payment possible. It is an obligation, not a preference.
2. If you sell online, connect a gateway now — the provider's checks take time.
3. Test the payment page on a phone.
4. Set up measurement of the payment funnel.
5. Link payment to the cash register if one is mandatory for you.

## If you need the technical part

I connect payment gateways, wire them to the cash register and to measurement, and make sure the payment page actually works on a phone. Details on the [web development service page](/en/service/webdev/).

I have lived in Slovakia for over ten years, work as a Slovak s.r.o. and issue a faktúra with an IČO.

Related: [eKasa in 2026](/en/blog/ekasa-online-cash-register/), [VAT registration](/en/blog/vat-registration-slovakia/) and [running an online shop in Slovakia](/en/blog/online-shop-in-slovakia/).

[CTA_FORM:audit]
