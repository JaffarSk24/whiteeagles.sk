---
title: 'A DIY SEO audit: 9 checks that find the real problems'
description: >-
  How to check a site yourself in an hour and find what genuinely stops it
  bringing clients in Slovakia: indexing, duplicate addresses, enquiry
  measurement, speed, company details. With specific commands and free tools.
date: '2026-08-04'
key: 'seo-audit'
faq:
  - q: 'How long does a basic DIY SEO audit take?'
    a: 'About an hour if you follow the list and do not go deep. The first four checks — indexing, duplicate addresses, enquiry measurement and speed — take twenty minutes and find most of the serious problems.'
  - q: 'Which tools are needed and what do they cost?'
    a: 'Everything listed is done with free tools: Google Search Console, PageSpeed Insights, an ordinary browser and a private window. Paid services belong to a later stage, once the basic errors are gone.'
  - q: 'What should I check first?'
    a: 'Indexing and duplicate addresses. If Google cannot see your pages, or sees four copies of the site, everything else — texts, links, speed — is working for nothing.'
  - q: 'My site is in Google but there are no enquiries. What does that mean?'
    a: 'Usually one of three things: the pages appear for irrelevant queries, the snippet gives no reason to click, or enquiries are in fact arriving but not being counted because measurement is not configured. All three can be checked in half an hour.'
  - q: 'Is an audit needed if the site is less than a year old?'
    a: 'Especially then. First-year mistakes — wrong redirects, duplicates, missing measurement — accumulate a negative effect, and the later they are found the longer the recovery.'
---
![A DIY SEO audit | White Eagles & Co.](/assets/blog/blog5.webp)

# A DIY SEO audit: 9 checks that find the real problems

Most guides to auditing your own site talk about Title length and keyword density. That is not why sites in Slovakia fail to bring clients.

Below are nine checks in the order worth doing them. All free, all together about an hour. The order is not accidental: if the first one fails, the rest do not matter.

If you would rather not do it yourself, I will go through the site for you — [a free website SEO audit](/en/seo-audit/), result within 3 working days.

[CTA_FORM:audit]

## 1. Can Google see your pages at all?

Open Google and type:

```
site:yourdomain.sk
```

Count the pages it shows and compare with how many you actually have.

**Noticeably fewer** means Google cannot see part of the site. Causes vary: blocked in `robots.txt`, a `noindex` tag, no internal link pointing at the page, or a site built entirely in JavaScript where the page is empty without it.

**Noticeably more** means you have duplicates. That is a separate problem, covered in point 3.

Then Search Console, **Indexing → Pages**. Look not at the total but at the reasons in the "Not indexed" list. The two most common and most damaging diagnoses:

- **"Crawled — currently not indexed"** — Google visited and decided the page did not deserve a place in the index. Usually thin text or a duplicate of another page.
- **"Discovered — currently not indexed"** — Google knows the address but has not been there. A sign that crawl budget is going somewhere else, for instance to system files.

## 2. What happens at your domain address

A thirty-second check that finds the most expensive faults. Open four addresses in turn:

- `http://yourdomain.sk`
- `http://www.yourdomain.sk`
- `https://yourdomain.sk`
- `https://www.yourdomain.sk`

All three of the first should **redirect** to the fourth (or to whichever you consider the main one). Not show a copy of the site — redirect.

If each address opens the site in its own right, Google sees four different sites with identical content. Link equity and behavioural signals are divided by four, and no copy gathers enough to compete.

To check precisely, in a terminal:

```bash
curl -sI http://www.yourdomain.sk | head -3
```

The response should contain `301` and a `location:` line with the correct address.

## 3. Duplicates inside the site

Three common sources, present almost everywhere:

**With and without a trailing slash.** `/service/webdev` and `/service/webdev/` should lead to one address via a 301, not serve the same page twice.

**With parameters.** Addresses like `?utm_source=...` or `?page=1` should not enter the index as separate pages. Checked with the same `site:` query.

**Language versions without markup.** On a multilingual site the versions must be connected by `hreflang`. Without it Google treats them as duplicates and picks one — often the wrong one.

You can see whether the markup exists straight in the browser: right-click → "View page source" → search for `hreflang`.

## 4. Are enquiries counted at all?

Not SEO in the narrow sense, but this is where the point of the whole exercise is most often lost.

Open the site in a private window, fill in the form and send it. Then go to Google Analytics 4 → **Reports → Realtime** and see whether the submission event appeared.

What usually turns up:

- events go into `dataLayer` but there is no tag in Tag Manager passing them to GA4 — no enquiries in the reports at all;
- the event exists but is not marked as a key event, so conversions read zero;
- GA4 is connected twice — directly and through Tag Manager — and every figure is doubled;
- the cookie banner blocks measurement even after consent.

Until this works, any conversation about the site's effectiveness has no subject. Full walk-through in [how to configure GA4 properly](/en/blog/ga4-setup/).

[CTA_FORM:analytics]

## 5. Speed — but look at mobile

Open **PageSpeed Insights** and check the home page and one service page. Important: look at the **Mobile** tab, not Desktop. More than half of visitors arrive by phone, and Google assesses the site by its mobile version.

Three metrics that matter:

| Metric | What it means | Target |
|---|---|---|
| **LCP** | when the main content appears | under 2.5 s |
| **INP** | how fast the site responds to a tap | under 200 ms |
| **CLS** | whether the layout jumps while loading | under 0.1 |

If the numbers are in the red, the most common cause is heavy images. Check: photographs on the site should be WebP and weigh tens of kilobytes, not several megabytes. The second most common cause is a dozen plugins in a template.

## 6. The snippet: what a person sees in the results

Type `site:yourdomain.sk` and look at the result through the eyes of someone who does not know you.

- **Title** — unique on every page, under 60 characters, starting with the substance rather than the company name.
- **Description** — under 160 characters, explaining what the person will get. Without one, Google takes a random fragment of text.
- **The address** — readable.

Check the home page separately. An empty or meaningless snippet on the home page is a classic cause of "plenty of impressions, no clicks".

## 7. Headings and structure

The rule is simple: **one H1 per page**, then H2 and H3 following the logic of the text.

A common template error is an H1 in the header on every page (usually the logo) — so every page on the site declares the same main heading.

Check in the browser console:

```js
document.querySelectorAll('h1').length
```

The answer should be `1`.

## 8. Mandatory company details and the cookie banner

Slovak specifics, and almost every template site misses them.

A Slovak company's website must state the name, registered address, IČO, DIČ and the register entry. That is not only a legal requirement — it is the first thing a Slovak buyer checks before paying. Full list in [the mandatory details on a website](/en/blog/mandatory-website-details/).

A cookie banner is mandatory if the site has analytics or advertising, and it must work with Consent Mode v2. A banner that merely announces "we use cookies" does not meet the requirements — analysis in [the cookie banner in 2026](/en/blog/cookie-banner-2026/).

## 9. Who already occupies your queries

The last step is seeing who you are competing with.

Take three or four queries you ought to be found for and type them into Google in a private window with the location set to Slovakia. Look at the first ten: are these local companies or foreign studios? What is on their page that is missing from yours?

It often turns out the first page is occupied not by competitors but by directories and aggregators. That is good news: outranking a directory with a substantive page is easier than beating a strong direct competitor.

## What to do with the results

The order of fixing does not match the order of checking. First what blocks everything else:

1. **Duplicate addresses and indexing** — without this the rest does not count.
2. **Enquiry measurement** — otherwise you never learn whether anything helped.
3. **Company details and the cookie banner** — also a legal risk.
4. **Speed on mobile.**
5. **Snippets and headings.**
6. **Page content** — the longest part and the most productive.

## If it is easier to have someone else look

I will go through your site myself and send a list of findings sorted by impact — with an explanation of what you can fix yourself and what needs work in the code. **[Free SEO audit](/en/seo-audit/)**, result within 3 working days, no obligation.

I have lived in Slovakia for over ten years and have launched **12+ sites for Slovak companies** — from booking systems to online shops. I work as a Slovak s.r.o. and issue a faktúra with an IČO.

Related: [why a cheap website built abroad does not sell in Slovakia](/en/blog/cheap-offshore-website/), [how much a website costs in Slovakia](/en/blog/website-cost-slovakia/) , [WordPress website repair](/en/blog/wordpress-website-repair/) and the [bugfix and support service page](/en/service/bugfix/).

[CTA_FORM:bugfix]
