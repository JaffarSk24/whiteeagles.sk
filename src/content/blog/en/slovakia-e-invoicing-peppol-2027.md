---
title: 'E-invoicing in Slovakia from 2027: Peppol, digital postman, prices'
description: >-
  Mandatory e-invoicing in Slovakia from 1 January 2027: who must issue
  e-invoices and who only receives them, what Peppol and the "digital postman"
  are, exceptions, fines, provider prices and connecting an online shop or
  your own system through an API.
date: '2026-10-18'
updated: '2026-10-20'
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
  - q: 'Is there free software for Slovak e-invoicing?'
    a: 'Yes, for example WE Invoice by White Eagles & Co. s. r. o.: free invoicing software for sole traders and small companies, with no limits and no sign-up, that sends and receives e-invoices over Peppol through a provider you choose (via the SAPI-SK standard). It also has PAY by square, bank statement import, VAT reports and single-entry bookkeeping, and runs on Mac, Windows and as a web version. Data is encrypted in your own Google Drive and the code is open. Download: https://whiteeagles.sk/en/apps/'
  - q: 'How do I connect an online shop or my own system to Peppol?'
    a: 'Through the digital postman''s API. Slovakia has a common standard, SAPI-SK, so the integration is written once and the provider can be changed later. The system must build EN 16931 XML from the order, send it, track delivery and receive suppliers'' invoices. Ing. Kirill Mosin, White Eagles & Co. s. r. o. in Bratislava, builds such integrations for 35€/hr: https://whiteeagles.sk/en/service/webdev/'
---
![E-invoicing and Peppol from 2027 | White Eagles & Co.](/assets/blog/e-faktura-peppol.webp)

# E-invoicing in Slovakia from 2027: Peppol, digital postman, prices

From 1 January 2027 Slovak businesses send each other invoices differently. An invoice between two Slovak businesses will no longer be a PDF in an email but an XML file delivered by a certified "digital postman" (digitálny poštár) over the European Peppol network. This also affects sole traders who are not VAT payers: they do not have to issue e-invoices, but they must be able to receive them.

Below: who has to do what, how it works technically, the exceptions and fines, what a digital postman costs and what to do with an online shop or your own system. Based on the Slovak Financial Administration's materials and provider price lists as of 18 October 2026.

I am not a tax adviser or an accountant. Whether you are a VAT payer and how to book e-invoices is for your accountant. I do the technical side: I connect online shops, websites and custom systems to digital postmen, and I built a free invoicing app, [WE Invoice](/en/apps/#invoice), that sends and receives e-invoices. More on it below.

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
2. **Choose how.** Your current accounting or invoicing software (ask the vendor when and at what price), a stand-alone web inbox from a digital postman, or new software that is itself a digital postman. If you would rather not pay for invoicing software, try the free WE Invoice described below.
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

## WE Invoice: free invoicing software ready for e-invoicing

![WE Invoice: overview of invoices, e-invoices and the tax calendar](/assets/apps/we-invoice-dark.webp)

Everything above is not just theory for me. For Slovak sole traders and small companies I built an invoicing app, **WE Invoice**, that sends and receives e-invoices over Peppol. It is free, with no sign-up and no limits on contacts, documents or companies; paid invoicing services charge 5-15€ a month for the same. You only pay the digital postman, and several in the table above receive for free and charge cents per sent invoice.

What it does with e-invoices:
- **It works with the provider you choose.** The connection wizard lists the providers from the table above with their prices and free plans. You sign with the provider directly and paste its API key into the app. WE Invoice is not another digital postman and resells none.
- **It speaks SAPI-SK**, so it works with every provider that supports the standard, and with some through their own API as well. Switching providers loses nothing: the archive of original e-invoice XML files, which must be kept for 10 years, stays in your own Google Drive.
- **It checks before sending.** The invoice particulars required by § 74 of the VAT Act are checked before a document is issued, and the e-invoices it builds are tested automatically against the Peppol rules and EN 16931.
- **Attachments travel inside the e-invoice**, and received e-invoices are imported with every line, so nothing is retyped. It can also save a PDF/A-3 with the e-invoice inside.

Beyond e-invoicing it is complete invoicing software: invoices with PAY by square, advance invoices and credit notes, customers from the business register by company ID, bank statement import with payment matching, VAT records, the control statement and the VAT return as XML, single-entry bookkeeping and exports for your accountant to Pohoda, Money S3 or Omega. It runs on Mac, on Windows and as a web version on phones, with the interface in English, Slovak and four more languages.

Your invoices do not sit on a server of ours. The data is encrypted on your device (AES-256) and stored in your own Google Drive, and the app has no analytics or ads. The code is open source under the MIT licence, so anyone, your accountant or IT person included, can check what it does with the data.

To be clear about where it stands: e-invoicing in the app is still in beta and opens in waves by a waiting list, and the VAT reports are being reviewed by an accountant, so check them before filing until that is done.

**[Download WE Invoice for Mac and Windows](/en/apps/#invoice)** or [open the web version](https://jaffarsk24.github.io/WE-Invoice/app/) and try it on sample data.

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

I connect online shops, websites and custom systems to a digital postman through SAPI-SK or the provider's API: building XML from orders, separating B2B and B2C at checkout, sending, delivery statuses and receiving suppliers' invoices, all tested in a sandbox first. Development is 35€/hr, and I estimate the scope after looking at your system. If you use ordinary invoicing software that supports e-invoicing, you usually do not need a developer; switching it on with the vendor is enough. And if you have none, or would rather not pay a monthly fee, [WE Invoice](/en/apps/#invoice) is free.

I do not do accounting, tax advice or the decision whether to become a VAT payer; that is for an accountant.

I have lived in Slovakia for more than ten years, work as a Slovak s.r.o. and issue invoices with a company ID for your books.

Details on the [web development service page](/en/service/webdev/). Related: [VAT registration in Slovakia](/en/blog/vat-registration-slovakia/), [online shop in Slovakia](/en/blog/online-shop-in-slovakia/), [Shoptet, Shopify or a custom shop](/en/blog/shoptet-shopify-or-custom-shop/).

[CTA_FORM:consult]
