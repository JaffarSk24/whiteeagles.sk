---
title: 'Slow WordPress site: why it loads slowly and how to speed it up'
description: >-
  Why a WordPress site loads slowly, how to measure speed properly, the order
  to speed it up in, and what it costs. And when you hit a ceiling no speed
  plugin will break through.
date: '2026-09-12'
key: 'slow-wordpress'
faq:
  - q: 'How do I tell whether my site is really slow?'
    a: 'Open PageSpeed Insights, enter the address and look at the Mobile tab. What matters is the real-user data: LCP under 2.5 seconds, INP under 200 milliseconds and CLS under 0.1. The score from 0 to 100 is only a lab estimate and decides nothing on its own.'
  - q: 'Why is my WordPress site slow?'
    a: 'Usually a combination of four things: cheap hosting without caching, a page builder such as Elementor or WPBakery, too many plugins loading scripts on every page, and images straight from the camera. WordPress core itself is rarely the cause.'
  - q: 'Will a speed plugin help?'
    a: 'A caching plugin shortens the server response time, often noticeably. It does not slim down a heavy theme, a page builder or third-party scripts the browser still has to download and run. That is why the score often rises only a little after installing one.'
  - q: 'What does speeding up a site cost?'
    a: 'The hourly rate is 35 euros. I first measure where the time is actually lost and state the amount of work before touching anything. If the ceiling turns out to be the theme or the page builder, I say so plainly and do not bill hours that achieve nothing.'
  - q: 'Should I speed up a slow WordPress site or get a new one?'
    a: 'If images, missing caching and a few plugins are the brakes, speeding it up pays. If the site sits on a page builder with dozens of plugins and mobile LCP stays above four seconds even after optimisation, a new site on a modern stack, fast by construction, is cheaper.'
---
![Slow WordPress site: why it loads slowly | White Eagles & Co.](/assets/blog/pomaly-wordpress-web.webp)

# Slow WordPress site: why it loads slowly and how to speed it up

A slow site does not crash or show an error. It quietly loses people: a visitor on a phone stares at a white screen for three or four seconds and goes back to the results for the next link. You do not see it, because on the office computer with fast internet and the site cached in the browser, everything opens at once.

Below: how to measure speed so the numbers mean something, what most often slows a WordPress site down, the order to deal with it in, and where the ceiling is that no optimisation breaks through.

[CTA_FORM:bugfix]

## Why speed is money

Three reasons you can put a number on:

- **Rankings in Google.** Google assesses loading through the Core Web Vitals metrics and measures them on mobile. Between two equally good pages, the faster one wins.
- **The cost of advertising.** Google Ads counts landing-page experience into Quality Score. A slow page pays more per click, and fewer people who click go on to enquire. You pay twice. More in [what Google Ads costs in Slovakia](/en/blog/google-ads-cost-slovakia/).
- **Enquiries.** Every extra second on mobile is a person who never sees the form.

## Measuring speed properly

Open **PageSpeed Insights**, enter the address and switch to the **Mobile** tab. The desktop version nearly always looks good and misleads.

Read the top block with real-user data, not only the score:

| Metric | What it measures | Good |
|---|---|---|
| **LCP** | when the main content appears | under 2.5 s |
| **INP** | how fast the page responds to a tap | under 200 ms |
| **CLS** | whether content jumps while loading | under 0.1 |

If there is no real-user data, the site has too few visits and the lab test is what you have. Measure three or four page types: the home page, a service page, an article, and for a shop a product and the cart. The home page is often not the slowest.

The checklist also includes the **server response time** (TTFB). Above 0.8 seconds the problem is on the server, not in the browser, and neither images nor scripts will fix it.

## What slows a WordPress site most often

**1. Hosting without caching.** Without a cache WordPress rebuilds the page from PHP and the database on every visit. On cheap shared hosting that means a second or more before the server even starts to answer.

**2. A page builder.** Elementor, WPBakery, Divi and similar tools let you assemble a page without programming, and you pay for it in weight. Every section is wrapped in several layers of code, and every page loads styles and scripts for every element the builder knows.

**3. Too many plugins.** The problem is not their number but that many pull their scripts onto every page, including where they are not used. The contact-page form loads inside an article, the home-page slider inside the cart.

**4. Images.** A photo straight from a phone weighs several megabytes. On a website it should weigh tens of kilobytes, be in WebP and be sized for where it is shown.

**5. Third-party scripts.** A chat widget, a map, an embedded YouTube video, several tracking codes at once, fonts from external servers. Each adds its own connections and time.

**6. An old PHP version and a bloated database.** Thousands of post revisions, temporary records never cleared, and settings from old plugins loaded on every request.

**On a WooCommerce shop** another usual culprit is the AJAX cart refresh that runs on every page, even when the cart is empty.

## Speeding up in the right order

The order saves time, because each step shows whether the next is still needed:

1. **Measure and write down the starting numbers** for several page types.
2. **Server-level caching or a caching plugin.** The biggest gain in response time for the least work.
3. **Images:** convert to WebP, correct dimensions, lazy loading for everything below the first screen. The main image at the top, by contrast, loads immediately.
4. **Plugins:** delete unused ones, replace heavy ones with lighter ones, and restrict scripts to the pages that need them.
5. **A current PHP version** and a database clean-up.
6. **Third-party scripts** loaded after interaction or with a delay. The chat does not need to be ready in the first second.
7. **Measure again** and compare with the start.

The other technical checks related to speed are in [the DIY SEO audit](/en/blog/seo-audit-yourself/).

[CTA_FORM:audit]

## The ceiling you cannot break

Here is the uncomfortable truth speed-plugin vendors leave out. Caching and images shorten the wait for the server and reduce what is transferred. They do not reduce **the amount of code a phone's browser must process** before it shows the page and starts responding to taps. That amount is set by the theme and the page builder.

If after every step above mobile LCP stays above four seconds and INP is in the red, further hours of optimisation buy tenths of a second. The site is slow by construction, not by configuration.

## Fast by construction: a modern stack

A modern custom site built on Next.js, for example, works the opposite way to WordPress with a page builder. Pages are generated in advance, the server simply hands them over, and the browser receives only the code that particular page needs. There is nothing to cache because nothing has to be assembled on a visit.

A concrete number: this site answers from the server in about **0.09 seconds**, with no caching plugin and no special hosting. Not thanks to extra optimisation, but because that is how it is built.

A new site is, of course, a different budget from a few hours of optimisation. It pays off when speed is critical, when you pay for advertising, or when you find the old site has hit its ceiling. Prices are in [what a website costs in Slovakia](/en/blog/website-cost-slovakia/).

## Keeping the site from slowing down again

Slowness returns with every new plugin, slider and tracking code. A simple rule helps: measure before adding anything, and measure again afterwards. So does regular maintenance, covered in [WordPress maintenance](/en/blog/wordpress-maintenance-cost/). If the site slows down suddenly for no obvious reason, check that it has not been hacked, as hidden scripts consume resources too. The steps are in [hacked WordPress site](/en/blog/hacked-wordpress-site/).

## If you need help

I speed up WordPress and custom sites: measurement, caching, images, plugins, third-party scripts, the server. **35€/hr**; I measure first and state the work and the expected result before touching anything. If the ceiling is the theme, I say so plainly and do not bill hours that will not pay back. I do not run hosting for you, but I will help choose hosting that does not slow the site down.

I build new sites on a modern stack, fast by construction. I have lived in Slovakia for over ten years and have launched **12+ sites for Slovak companies**, such as [Biliardovňa](/en/case/biliardovna/) with online table booking. I work as a Slovak s.r.o. and issue a faktúra with an IČO.

Details on the [website repair service page](/en/service/bugfix/). If you do not know what exactly slows the site, the [free audit](/en/seo-audit/) will measure it, with results within 3 working days.

[CTA_FORM:webdev]
