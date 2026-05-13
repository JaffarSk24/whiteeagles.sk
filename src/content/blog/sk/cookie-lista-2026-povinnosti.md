---
title: 'Cookie lišta v roku 2026: Povinnosti a Consent Mode V2'
description: >-
  Zistite, aké sú aktuálne zákonné povinnosti pre Cookie lišty na Slovensku a čo
  znamená zavedenie Google Consent Mode V2 pre váš web.
date: '2026-05-10'
---
![Cookie lišta v roku 2026: Povinnosti a Consent Mode V2 | White Eagles & Co.](/assets/blog/blog4.webp)

# Cookie lišta v roku 2026: Povinnosti a Consent Mode V2

Pojem "Cookie lišta" vyvoláva u mnohých majiteľov webstránok bolesť hlavy. Legislatíva sa neustále sprísňuje a navyše od marca 2024 spoločnosť Google zaviedla povinný **Consent Mode V2**. Ak ho nemáte nasadený správne, prichádzate o cenné dáta a Google vám môže zablokovať remarketing.

## Aké sú zákonné požiadavky na Cookie lištu?

Zákon o elektronických komunikáciách (a smernica GDPR) hovorí jasne. Na vašom webe musí lišta spĺňať tieto kritériá:
- **Žiadne predškrtnuté políčka:** Políčka pre analytické a marketingové cookies musia byť v predvolenom stave nezaškrtnuté (OFF).
- **Rovnocenné tlačidlá:** Tlačidlo "Odmietnuť všetko" musí byť rovnako viditeľné a prístupné ako tlačidlo "Prijať všetko". Nesmiete používateľov nútiť prijať cookies tým, že možnosť odmietnutia schováte pod zložité nastavenia.
- **Blokovanie skriptov pred súhlasom:** Váš web nesmie spustiť Google Analytics ani Google Ads pixely PREDTÝM, než používateľ klikne na "Prijať". Toto je najčastejšia chyba na 90% slovenských webov.

[CTA_FORM]

## Čo je Google Consent Mode V2?

Consent Mode V2 je mechanizmus od Google, ktorý zabezpečuje, že sa rešpektuje voľba návštevníka. Ak používateľ odmietne cookies, GTM a GA4 nedostanú povolenie zapísať cookie do jeho prehliadača, ale odošlú len anonymný "ping" o zobrazení stránky (tzv. cookieless tracking).

Vďaka tomu nestratíte informáciu o tom, koľko ľudí celkovo navštívilo váš web, ale zároveň rešpektujete ich súkromie. Consent Mode V2 zaviedol nové parametre: `ad_user_data` a `ad_personalization`. Ak tieto parametre nie sú nastavené, Google Ads vám neumožní vytvárať publiká na remarketing.

## Ako na implementáciu bez drahých pluginov?

Mnohé firmy platia mesačné poplatky (od 10€ do 50€) za rôzne WordPress moduly na správu cookies (napr. Cookiebot). Naša agentúra White Eagles implementuje pre klientov vlastné, plne legálne a Consent Mode V2 kompatibilné lišty priamo do kódu cez GTM – jednorazovo a bez akýchkoľvek mesačných poplatkov. Ak si nie ste istí, či váš web spĺňa zákony, radi vám vypracujeme technický audit.
