---
title: 'A client portal on your website: a WordPress plugin or a custom build'
description: >-
  What a client portal solves, what a WordPress plugin can handle and where it
  hits its limits, why "without a plugin" really means writing an application,
  and what every client portal must have to keep client data safe.
date: '2026-09-12'
updated: '2026-09-20'
key: 'client-portal'
faq:
  - q: 'What is a client portal on a website?'
    a: 'A part of the site behind a login where each client sees only their own data: order or job status, booking history, invoices and documents to download, a membership or pass, or customer-specific prices. The public site is for everyone; the portal is for one particular person.'
  - q: 'Is a WordPress plugin enough for a client portal?'
    a: 'For simple things, such as members-only content or an order list in WooCommerce, for a while, yes. Once you need your own logic, customer-specific prices or a link to accounting software, the plugin starts being bent, and every update becomes a risk. For a new site I do not recommend it.'
  - q: 'Can a client portal be built in WordPress without a plugin?'
    a: 'It can, but then you write the login, roles and data logic yourself, which means you are building an application. WordPress at that point is only a heavy wrapper around it that still needs updating. The cleaner answer is a standalone application on a modern stack.'
  - q: 'What does a custom client portal cost?'
    a: 'As part of a new custom site it is included in the project estimate; a company website starts at 3 500€. Adding a portal to an existing site is billed hourly at 35€. The price is stated before work starts and does not change mid-project; for a larger portal the deadline is stated in advance too.'
  - q: 'What does a client portal need for GDPR?'
    a: 'Technically: access only to one''s own data, checked on the server, an encrypted connection, hashed passwords, access logs, and the ability to hand clients their data or delete it. Legal documents such as a privacy policy or contracts are prepared by a lawyer, not a developer.'
---
![A client portal on your website | White Eagles & Co.](/assets/blog/klientska-zona.webp)

# A client portal on your website: a WordPress plugin or a custom build

One client emails to ask about the status of their order, another wants an invoice sent again, a third calls to move an appointment. The answer to each of those questions already exists somewhere; the client just cannot see it. A client portal is the place on your website where they see it themselves, after logging in, and only their own.

Below: what such a portal solves, what a WordPress plugin can handle and where it hits its limits, why "without a plugin" really means writing an application, a comparison of the two routes, and a checklist of what every client portal must have, whoever builds it.

[CTA_FORM:webdev]

## What a client portal solves

A portal is not a goal in itself; it is a way to cut repeated questions and manual work. The most common situations:

- **Order or job status.** Received, in progress, shipped, done. The client does not have to write, and you do not have to answer.
- **Booking history**, with the option to change or cancel an appointment under rules you set.
- **Documents and invoices to download.** Contracts, reports and invoices from past years in one place.
- **Memberships and passes.** How many visits are left, when it expires, when to renew.
- **B2B customers.** Customer-specific prices for a particular company, order history, and reordering with one click.

They all share one thing: every client must see **only their own data**. Everything else follows from that, from the choice of technology to security.

## The plugin route in WordPress

If a WordPress site is already running, the first thought is a plugin. There are membership and user-registration plugins, and a WooCommerce shop has a "My account" section with orders and addresses.

**What is good about it, honestly:**

- a quick start; a basic portal can be ready in a few days;
- a lower upfront cost;
- for simple cases, such as members-only content or an order list in a shop, it is enough for a while.

**Where it hits its limits:**

- **The logic belongs to the plugin, not to you.** The portal does what the plugin author designed. When you need a different order status, a different cancellation rule or customer-specific prices, the bending begins.
- **Client personal data sits in the same database** as the whole site and all its plugins. A vulnerability in any of them, even the slider on the home page, is a potential route to client data. What that looks like when it happens is in [hacked WordPress site](/en/blog/hacked-wordpress-site/).
- **The public login page** is a target for automated password guessing. Against WordPress sites this runs constantly, because the login address is the same everywhere.
- **Plugin combinations break on updates.** A membership plugin, a payment gateway, a shop and a theme from four authors, and any update can disrupt how they work together. For a portal, that means clients cannot log in or cannot see their orders. More in [WordPress maintenance](/en/blog/wordpress-maintenance-cost/).
- **Logged-in pages are usually slow.** Page caching is typically bypassed for logged-in users, so the server builds every portal view from scratch. The causes are covered in [slow WordPress site](/en/blog/slow-wordpress-site/).

## "Without a plugin" means writing an application

People often search for how to build a client portal in WordPress without a plugin. It is a reasonable question: anyone who has bent someone else's plugin once does not want to do it again. But look at what "without a plugin" means in practice. You write the login, password reset, roles, the rules for who sees what, the data model for orders or bookings, and the integrations yourself.

That is an application. WordPress does nothing essential in it; it merely stays around it as **a heavy wrapper**: its updates, its plugins, its admin panel on the public address, and its database, which will also hold your clients' data. You keep paying to maintain that wrapper even though your logic does not need it at all.

So if you are writing the logic yourself anyway, the cleaner answer is **a standalone application on a modern stack**: a React and Next.js front end with TypeScript, a Python or PHP back end, and a dedicated database holding only what the portal needs. The public site can stay fast and static while the portal lives separately. The two approaches are compared more broadly in [WordPress or custom](/en/blog/wordpress-or-custom/).

## The custom route

A custom portal starts with the question of what exactly the client should see and do, not with what a plugin offers.

- **Your own data model.** Orders, bookings, documents and passes structured the way your business works, not the way a plugin author assumed.
- **Roles.** Client, staff member, administrator, and if needed several people from one company with different permissions.
- **Integrations.** Accounting software that invoices come from, [card payments](/en/blog/accept-card-payments/), and email or Telegram notifications when something changes.
- **Separation from the public site.** The marketing part has no database and no admin panel on the public address; client data lives only where it is needed.

Closely related logic is covered in [online booking system](/en/blog/online-booking-system/). At [Biliardovňa](/en/case/biliardovna/) online table booking replaced phone calls, and at [Krása štúdio OK](/en/case/studio-krasy/) staff confirm a booking with one tap in Telegram and the slot blocks automatically. A client portal is the next step of the same idea: the client sees not just a free slot but their own history.

[CTA_FORM:consult]

## Comparison: plugin versus custom build

| | WordPress plugin | Custom build |
|---|---|---|
| **Start** | quick, a few days | longer, deadline stated in advance |
| **Logic** | as the plugin author designed | as your business works |
| **Client personal data** | in the database of the whole site and every plugin | in a dedicated database for the portal only |
| **Login** | well-known address, a frequent attack target | login attempt limits designed in |
| **Updates** | a plugin combination can break | planned, no plugin conflicts |
| **Speed when logged in** | caching usually bypassed | designed for logged-in users |
| **Integrations** | whatever the plugin supports | accounting, payments, email, Telegram |

A plugin can be enough for a while if you already have a WordPress site, the portal only needs to lock content or show WooCommerce orders, and you need no logic of your own. The moment the first "but we do it differently" appears, it is time to consider a custom build, before bending the plugin has cost more work than building the portal properly would have.

## What every client portal must have

Whether it runs on a plugin or is custom-built, this is the minimum:

1. **Hashed passwords.** Never stored in readable form, only as a hash made with a slow algorithm designed for passwords.
2. **Login attempt limits** against password guessing.
3. **Two-factor authentication** as an option.
4. **Password reset via a link that expires.** Never a password sent by email.
5. **A server-side check that users see only their own data.** Hiding a button in the interface is not enough; the server must verify every request. Changing a number in the address must never reveal someone else's invoice.
6. **HTTPS** across the whole site.
7. **Access logs**, so you can trace who logged in when and what happened.
8. **Data export and deletion** at the client's request, as GDPR requires.
9. **Mobile first.** Clients open the portal on a phone while waiting for an order, not at a desk.

## GDPR and a client portal

A portal means you process your clients' personal data and are responsible for it. The technical part, meaning access only to one's own data, an encrypted connection, logs, and the ability to hand over or delete data, belongs to development. With a plugin-based portal, it is worth checking where exactly the plugin stores the data and whether it can export and delete it. What GDPR means for a small company in general is in [GDPR for small business](/en/blog/gdpr-for-small-business/).

## What it costs and how long it takes

- **A portal as part of a new custom site:** a company website starts at **3 500€**, and the portal's scope is part of the estimate.
- **Adding a portal to an existing site:** billed hourly at **35€**.
- **Timing:** an average site is delivered in 10 working days; a larger portal takes longer, and the deadline is stated in advance.

The price is stated before work starts and does not change mid-project. A wider overview of prices is in [what a website costs in Slovakia](/en/blog/website-cost-slovakia/).

## If you need help

I build custom client portals: login and roles, order and job status, bookings with changes and cancellations, documents and invoices to download, email and Telegram notifications, and integrations with accounting software and payments. I do not write GDPR legal documents or contracts; that is a lawyer's job. My part is the technical solution.

I have lived in Slovakia for over ten years, have launched **12+ sites for Slovak companies**, and give every new site **six months of free support**. I work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details on the [web development service page](/en/service/webdev/), and notifications and bots on the [Telegram bot service page](/en/service/telegram/).

Similar breakdowns for other industries: [a wholesale online store](/en/blog/wholesale-online-store/).

[CTA_FORM:webdev]
