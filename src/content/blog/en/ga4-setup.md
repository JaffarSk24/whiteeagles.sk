---
title: How to correctly set up Google Analytics 4 (GA4)
description: >-
  A complete guide to transitioning and correctly setting up Google Analytics 4
  for conversion tracking in 2026.
date: '2026-05-11'
key: 'ga4-setup'
---
![How to correctly set up Google Analytics 4 (GA4) | White Eagles & Co.](/assets/blog/blog3.webp)

# How to correctly set up Google Analytics 4 (GA4)

The old Universal Analytics (UA) is officially dead, and all companies had to transition to **Google Analytics 4 (GA4)**. Many website owners still struggle with the new interface. In this article, we'll show you how to set up GA4 correctly to get valuable insights.

## Step 1: Creation and Integration

If you haven't already, create a new GA4 Property. 
The best way to integrate GA4 is not by pasting the code directly into your website's header, but by using **Google Tag Manager (GTM)**. GTM allows you to manage all tracking codes from one place.

[CTA_FORM]

## Step 2: Excluding Internal Traffic

A major mistake we see during audits is clients measuring their own visits.
1. In GA4, go to *Admin > Data Streams > Configure tag settings*.
2. Click *Show all* and choose *Define internal traffic*.
3. Add your IP address.
4. Go to *Data Settings > Data Filters* and activate the filter.

## Step 3: Events and Conversions

GA4 is entirely event-based. Important events you should track via GTM:
- **Form submission (generate_lead)**
- **Phone number click (click_phone)**
- **Email click (click_email)**

Mark these events as **Conversions** in the GA4 dashboard.

## Step 4: Data Retention

By default, GA4 retains detailed user data for only 2 months. Change this to **14 months** under *Admin > Data Settings > Data Retention*.

## Professional Analytics

Proper analytics setup is critical for evaluating your marketing campaigns. White Eagles agency can set up comprehensive analytics for you, including Server-Side Tracking.
