---
title: Ako správne nastaviť Google Analytics 4 (GA4)
description: >-
  Kompletný návod na prechod a správne nastavenie Google Analytics 4 pre meranie
  konverzií a návštevnosti v roku 2026.
date: '2026-05-11'
---
![Ako správne nastaviť Google Analytics 4 (GA4) | White Eagles & Co.](/assets/blog/blog3.webp)

# Ako správne nastaviť Google Analytics 4 (GA4)

Starý Universal Analytics (UA) definitívne skončil a všetky firmy museli prejsť na **Google Analytics 4 (GA4)**. Mnohí majitelia webov sa s novým rozhraním stále trápia a nevedia, kde nájdu svoje dáta. V tomto článku vám ukážeme, ako GA4 správne nastaviť, aby vám prinášal hodnotné informácie.

## Krok 1: Vytvorenie a prepojenie účtu

Ak ste to ešte neurobili, musíte si v Google Analytics vytvoriť nové vlastníctvo (Property) typu GA4. 
Najlepším spôsobom, ako GA4 prepojiť s vaším webom, nie je priame vloženie kódu do hlavičky webu, ale použitie **Google Tag Manager (GTM)**. GTM vám umožní spravovať všetky meracie kódy z jedného miesta bez nutnosti zasahovať do kódu webu zakaždým, keď chcete niečo zmerať.

[CTA_FORM]

## Krok 2: Odstránenie internej návštevnosti

Jedna z najväčších chýb, ktorú vidíme u klientov pri auditoch, je tá, že ich analytika meria aj ich vlastné návštevy.
1. V GA4 prejdite do *Admin > Data Streams > Configure tag settings*.
2. Kliknite na *Show all* a zvoľte *Define internal traffic*.
3. Pridajte svoju IP adresu (a IP adresy vašich zamestnancov).
4. Následne prejdite do *Data Settings > Data Filters* a aktivujte filter pre internú návštevnosť.

## Krok 3: Nastavenie udalostí (Events) a konverzií

GA4 je založený výlučne na udalostiach (Events). Kým starý UA meral "relácie" a "zobrazenia stránok", GA4 meria všetko ako udalosť.
Dôležité udalosti, ktoré by ste mali merať cez GTM:
- **Odoslanie formulára (generate_lead)**
- **Kliknutie na telefónne číslo (click_phone)**
- **Kliknutie na e-mail (click_email)**
- **Pridanie do košíka (add_to_cart)** - ak máte e-shop

Tieto udalosti potom v GA4 jednoducho označte prepínačom ako **Konverzie (Conversions)**.

## Krok 4: Predĺženie uchovávania údajov (Data Retention)

V predvolenom nastavení GA4 uchováva podrobné dáta o používateľoch len 2 mesiace. Pre medziročné porovnávania je to málo. 
Prejdite do *Admin > Data Settings > Data Retention* a zmeňte hodnotu z 2 mesiacov na **14 mesiacov**.

## Profesionálna analytika

Nastavenie analytiky je kritické pre vyhodnocovanie vašich marketingových kampaní. Ak do reklamy sypete peniaze bez správneho merania, strieľate naslepo. Agentúra White Eagles vám rada nastaví komplexnú analytiku vrátane Server-Side Trackingu pre obchádzanie ad-blockerov.
