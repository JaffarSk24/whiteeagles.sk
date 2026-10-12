---
title: 'CHICAGO: WordPress fixes for a shooting range and Google search ads'
description: 'A WordPress and WooCommerce website of a shooting range in Bratislava: cache and email fixes, a club membership form, a PDF gift voucher, required booking date and time. Search ads: 92 orders and 62 calls.'
date: '2026-10-12'
updated: '2026-10-12'
key: 'chicago'
client: 'CHICAGO'
url: 'https://www.chicago.sk'
image: '/assets/case-chicago.webp'
summary: 'A shooting range in Bratislava: WordPress work, fixes and ads.'
service: 'bugfix'
services:
  - 'WordPress development'
  - 'WooCommerce'
  - 'Bug fixing'
  - 'Google Ads'
order: 7
---
![CHICAGO shooting range website in Bratislava | White Eagles & Co.](/assets/case-chicago.webp)

# CHICAGO: WordPress fixes for a shooting range and Google search ads

CHICAGO is a shooting range in Bratislava. Its website runs on WordPress with WooCommerce: visitors book shooting packages, buy gift vouchers and apply for club membership there. I did not build the site. My work here is fixes, improvements and Google search ads.

## Fixes

- **An error when logging into the admin.** The W3 Total Cache plugin showed a warning because its older code did not expect PHP 8. Fixed in the plugin code.
- **Customers did not see order emails.** WordPress sent mail with a sender that did not match the address in the email, and spam filters scored it 2.0 against a threshold of 2.4. Sending moved to authenticated SMTP in the club's name, the score dropped to 0.4, and an email log now shows what went out and what did not.

## Improvements

- **A notice on the home page.** The club turns a pop-up with important information on and off in the admin, can set how long it shows, and the cache is cleared automatically so the pop-up appears and disappears at once.
- **Required date and time** when booking in WooCommerce: orders without a visit time no longer arrive.
- **A club membership form on the website.** Applicants fill it in online, and it prints as a document matching the club's own form.
- **A PDF gift voucher.** After a bank transfer payment it is generated automatically and sent to the buyer and to the club, and it can be resent from the admin.

## Ads

A Google search campaign has been running in several languages since March 2025. Over that time: 25,961 clicks at 0.20€ on average with a 17.6% click-through rate, 92 orders through the website and 62 calls straight from the ads.

## How the work was done

A full backup before any change. The improvements live in a child theme and separate plugins, and the theme itself was not edited, so its updates will not overwrite them. The whole interface is in Slovak.

## If you have a similar task

If you already have a WordPress site and something is broken or a feature is missing, that is the [bug fixing and maintenance service](/en/service/bugfix/). I build new websites on custom code, and I repair, speed up and migrate WordPress sites. Advertising case studies: [Severské drevo](/en/case/severske-drevo-google-ads/), [TOP SKLAD](/en/case/top-sklad-google-ads/).
