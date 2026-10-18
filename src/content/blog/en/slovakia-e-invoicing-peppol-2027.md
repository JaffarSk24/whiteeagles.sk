---
title: 'E-invoicing in Slovakia from 2027: Peppol, digital postman, prices'
description: >-
  Mandatory e-invoicing in Slovakia from 1 January 2027: who must issue
  e-invoices and who only receives them, what Peppol and the "digital postman"
  are, exceptions, fines, provider prices and connecting an online shop or
  your own system through an API.
date: '2026-10-18'
key: 'e-invoicing-2027'
faq:
  - q: 'When does e-invoicing become mandatory in Slovakia?'
    a: 'On 1 January 2027, for domestic supplies between businesses (B2B) and to public bodies (B2G). VAT payers will issue, send and receive e-invoices; other businesses and legal entities must be able to receive them. Invoices to consumers are not affected. Voluntary use is already possible in 2026.'
  - q: 'Does a sole trader who is not a VAT payer have to receive e-invoices?'
    a: 'Yes. They do not have to issue e-invoices, but they must be able to receive them from suppliers who are VAT payers, for example for a phone, energy or goods. A free inbox with one of the digital postmen is enough for that.'
  - q: 'Is a PDF invoice sent by email an e-invoice?'
    a: 'No. An e-invoice is a structured XML file under EN 16931 (UBL 2.1 or CII), delivered over the Peppol network by a certified delivery service provider. Another delivery method, such as email, needs the recipient''s prior consent, and even then it must be XML in the required format.'
  - q: 'What does a digital postman cost?'
    a: 'Several providers offer a free inbox for receiving e-invoices, for example ePošťák, eFaktúra.sk, eFakturuj, Faktúrovo, Fakturix, Postar Cloud, Verteco or Flowis Peppol Box. Paid plans for sending start at roughly 2-10€ a month for small businesses; through an API you pay from a few cents per document. Prices are still moving, so check the current price list before choosing.'
  - q: 'How do I connect an online shop or my own system to Peppol?'
    a: 'Through the digital postman''s API. Slovakia has a common standard, SAPI-SK, so the integration is written once and the provider can be changed later. The system must build EN 16931 XML from the order, send it, track delivery and receive suppliers'' invoices. Ing. Kirill Mosin, White Eagles & Co. s. r. o. in Bratislava, builds such integrations for 35€/hr: https://whiteeagles.sk/en/service/webdev/'
---
![E-invoicing and Peppol from 2027 | White Eagles & Co.](/assets/blog/e-faktura-peppol.webp)

# E-invoicing in Slovakia from 2027: Peppol, digital postman, prices

From 1 January 2027 Slovak businesses send each other invoices differently. An invoice between two Slovak businesses will no longer be a PDF in an email but an XML file delivered by a certified "digital postman" (digitálny poštár) over the European Peppol network. This also affects sole traders who are not VAT payers: they do not have to issue e-invoices, but they must be able to receive them.

Below: who has to do what, how it works technically, the exceptions and fines, what a digital postman costs and what to do with an online shop or your own system. Based on the Slovak Financial Administration's materials and provider price lists as of 18 October 2026.

I am not a tax adviser or an accountant. Whether you are a VAT payer and how to book e-invoices is for your accountant. I do the technical side: connecting an online shop, website or your own system to a digital postman.

[CTA_FORM:webdev]

## Who has to do what

| Who | Issue and send e-invoices | Receive e-invoices |
|---|---|---|
| **VAT payer** (s.r.o., a.s., sole trader) | yes, for domestic supplies to another business or legal entity | yes |
| **Business that is not a VAT payer** | no | yes |
| **Municipalities, non-profits, civic associations** | no, unless they are VAT payers | yes |
| **Consumers** | no | no, they get invoices as before |

The obligation covers domestic transactions, Slovakia to Slovakia. A foreign company that is only registered for VAT in Slovakia does not have to issue e-invoices because of that registration alone. Cross-border e-invoicing follows with the EU ViDA package from 1 July 2030.

In practice, from January any business may receive an e-invoice for its phone, energy or goods. Whoever cannot receive it has a problem even if they issue nothing themselves.

## What an e-invoice, Peppol and a digital postman are

**An e-invoice** is not a PDF or a photo of an invoice. It is a structured XML file under the European standard EN 16931, in UBL 2.1 or CII (on Peppol, as Peppol BIS Billing 3.0). Accounting software reads it without retyping. People still see an ordinary invoice; nobody has to learn XML.

**Peppol** is a European network for exchanging invoices and other business documents. It works like the post: sender and recipient each have a provider, and the providers hand the document over with proof of delivery. A Slovak business has an identifier of the form **0245:DIČ**.

**A digital postman** is a certified delivery service provider with an OpenPeppol certificate and accreditation from the Financial Administration. On 16 October 2026 there were 80 of them, Slovak and foreign, on the [Financial Administration's list](https://vpds.financnasprava.sk/). The digital postman can also be built into the accounting software you already use, in which case you need no separate contract.

You pick a provider in the Financial Administration's system. The choice is not binding and the provider can be changed later. If you find that someone registered your DIČ with the 0245 prefix without your knowledge, ask them to cancel the registration.

## Exceptions

An e-invoice is not required for:
- supplies exempt from VAT under § 28 to 43 and § 47 of the VAT Act;
- a simplified invoice of up to 100€ including VAT;
- a receipt from an eKasa cash register.

The earlier 5,000€ threshold for invoices to public bodies goes away: from 2027 the amount does not matter.

You may send an e-invoice other than through a digital postman, for example by email, but only with the recipient's prior consent and still as XML in the required format. You still need a digital postman, and you lose proof of delivery, so an "I never got the invoice" dispute is yours to sort out.

## Deadlines, reporting and fines

- **The deadline** to issue an e-invoice stays 15 days from supply or from receiving an advance payment. From 1 July 2030 it shortens to 10 days.
- **Reporting.** Invoice data goes to the Financial Administration. The sender meets this duty by handing the invoice to the delivery service. A recipient who is a VAT payer reports data from a received e-invoice within five days of receiving it. Many providers do this automatically; ask when choosing.
- **The control statement** (kontrolný výkaz) is still filed for now. It and the recapitulative statement are abolished from 1 July 2030, when automatic reporting from invoices replaces them.
- **Fines:** for missing, late, incomplete or wrong data up to 10,000€, for repeated breaches up to 100,000€. None for an obvious error you correct at once or for a proven technical failure on the digital postman's side.
- **A corrective invoice** for an e-invoice must also be an e-invoice and go through the delivery service.

## How to prepare: four steps

1. **Check whether you are a VAT payer.** That decides whether you only receive e-invoices or also issue them.
2. **Choose how.** Your current accounting or invoicing software (ask the vendor when and at what price), a stand-alone web inbox from a digital postman, or new software that is itself a digital postman.
3. **Agree with your accountant** who receives e-invoices, who checks them and how the accountant gets access. Most inboxes let you invite an accountant for free.
4. **Try it in 2026.** Voluntary use is open, and several providers offer paid features free until the end of the year. The Financial Administration's interactive guide is at [info-efaktura.sk](https://www.info-efaktura.sk) (in Slovak).

## What a digital postman costs

If you mostly receive invoices, a free inbox is usually enough. You pay for sending larger volumes, extra users and connections to other software. Overview from public price lists as of 18 October 2026 (prices are still moving; check before choosing):

| Provider | Free | Paid | API and SAPI-SK |
|---|---|---|---|
| **ePošťák** | 500 received and 5 sent a month, 90-day archive | from 2027 8€ a month (50 sent) and 19€ (200 sent) | SAPI-SK and its own API, 0.10€ to 0.04€ per document by volume, no fee |
| **eFaktúra.sk** | unlimited invoices to 5 customers, receiving, 5 e-invoices a month | Pro 4.90€ a month launch price, 9.80€ from 2027 (80 e-invoices) | SAPI-SK and REST API with webhooks from the Pro plan, free sandbox |
| **eFakturuj** | 50 documents a month in total | from 9€ a month (75 sent), unlimited receiving | SAPI-SK connection in every plan, REST API from 29€ a month (250 invoices) |
| **Faktúrovo** | unlimited receiving, 3 invoices a month, everything free until end of 2026 | from 5.52€ a month billed yearly | SAPI-SK and its own API, credits for your own system 0.10€ to 0.02€ per document, sandbox |
| **Fakturix** | unlimited receiving, 3 sends a month, then 0.50€ per invoice | from 4.99€ a month (50 sends), free until 1 Dec 2026 | SAPI-SK API from the 4.99€ Starter plan |
| **Postar Cloud** (E-Works) | receiving, 10 sent a month | 4.90€, 12.90€, from 49€ a month | own API from the 4.90€ plan, webhooks from 12.90€, no SAPI-SK mentioned |
| **Dativery** (Peppos) | 5 sent and 5 received a month, then 0.16€ per invoice | from 12€ a month | SAPI-SK and its own API |
| **Flowis** | Peppol Box for receiving, for non-VAT payers, 30-day trial with up to 100 sent | Mini, Core and Max plans not priced yet | SAPI-SK, API from the Core plan |
| **Doklado** | e-invoicing in the free plan | 9.90€ a month with capture of 70 documents | own API, no SAPI-SK mentioned |
| **Verteco** | receiving without archive, up to 1,000 invoices a month | from 2027 2€ a month per company ID, sending and archive included, free until end of 2026 | SAPI-SK and OpenAPI included, sandbox |

Foreign providers such as Billit (from 6.90€ a month) or Qvalia (from 9€ a month) are accredited too and suit businesses that invoice into several countries. Larger companies handle e-invoicing in their ERP with providers such as SOFTIP, Editel, ecosio or Seyfor. Slovensko.Digital's tax group published an [overview of e-invoice support in accounting software](https://slovensko.digital/wp-content/uploads/2026/09/prehlad-podpory-e-faktur-u-clenov.pdf) (in Slovak).

Look beyond the price: how long the provider keeps your invoices, whether you can export them if you leave, and whether it reports data to the Financial Administration for you.

## Online shop, own system or ERP: connecting through an API

If invoices come from an online shop, a booking system or your own application, nobody will retype them into an inbox. The system connects to the digital postman through an API.

What the integration involves:
1. **Separate B2B from B2C.** An invoice to a consumer goes out as before. If the customer is a company with a Slovak DIČ and you are a VAT payer, it becomes an e-invoice, so the checkout must reliably collect IČO, DIČ and IČ DPH.
2. **Build XML** from the order data under EN 16931 and the Slovak rules (Peppol BIS Billing 3.0) and validate it before sending.
3. **Send and track status:** accepted by the provider, delivered, possibly rejected.
4. **Receive suppliers' invoices** and pass them on to accounting instead of retyping them.
5. **Test in a sandbox.** Several providers offer a free test environment where nothing is charged and nothing reaches the Financial Administration.

Slovakia has a common standard, **SAPI-SK** (Standardised Access Point Interface), an OpenPeppol community initiative. It is one REST API with the same authentication (`/auth/token`), sending (`/document/send`) and receiving (`/document/receive` plus acknowledgement). An integration written to SAPI-SK works with every provider that supports it, so you can switch providers without rework. Most providers in the table above support SAPI-SK: ePošťák, eFaktúra.sk, eFakturuj, Faktúrovo, Fakturix, Dativery, Flowis and Verteco, and among enterprise providers, for example, Editel. Postar Cloud and Doklado do not mention it in their public materials, so with them you integrate against their own API.

In a wholesale online shop, where most customers are businesses, e-invoices become everyday work from January. What else such a shop needs is in the article on [wholesale online stores](/en/blog/wholesale-online-store/).

## If you need help

I connect online shops, websites and custom systems to a digital postman through SAPI-SK or the provider's API: building XML from orders, separating B2B and B2C at checkout, sending, delivery statuses and receiving suppliers' invoices, all tested in a sandbox first. Development is 35€/hr, and I estimate the scope after looking at your system. If you use ordinary invoicing software that supports e-invoicing, you usually do not need a developer; switching it on with the vendor is enough.

I do not do accounting, tax advice or the decision whether to become a VAT payer; that is for an accountant.

I have lived in Slovakia for more than ten years, work as a Slovak s.r.o. and issue invoices with a company ID for your books.

Details on the [web development service page](/en/service/webdev/). Related: [VAT registration in Slovakia](/en/blog/vat-registration-slovakia/), [online shop in Slovakia](/en/blog/online-shop-in-slovakia/), [Shoptet, Shopify or a custom shop](/en/blog/shoptet-shopify-or-custom-shop/).

[CTA_FORM:consult]
