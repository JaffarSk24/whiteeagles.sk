---
title: 'Server-side GTM: kedy sa oplatí a kedy stačí obyčajné GA4'
description: >-
  Serverové značkovanie bez marketingových rečí: koľko dát sa naozaj stráca,
  čo server-side GTM opraví a čo nie, koľko stojí prevádzka a od akého
  rozpočtu má zmysel. A čo urobiť predtým.
date: '2026-08-25'
key: 'server-side-gtm'
faq:
  - q: 'Čo je server-side GTM jednoducho?'
    a: 'Bežne posiela údaje do Google prehliadač návštevníka. Pri serverovom značkovaní ich najprv prijme váš vlastný server a až on ich posiela ďalej. Blokovače a obmedzenia prehliadačov zasahujú prvú cestu, nie druhú.'
  - q: 'Koľko dát sa stráca bez neho?'
    a: 'Závisí od publika. Pri bežnej slovenskej firme ide o jednotky až nižšie desiatky percent; pri technickom publiku viac, lebo blokovače tam používa väčšina. Presné číslo sa nedá odhadnúť zvonku - dá sa porovnať počet dopytov v schránke s počtom konverzií v GA4.'
  - q: 'Koľko stojí prevádzka?'
    a: 'Samotné nastavenie od 500 eur pri sadzbe 25 eur za hodinu. Navyše je server, ktorý beží nepretržite - to je opakovaný mesačný náklad, na rozdiel od bežného GA4, ktoré nestojí nič.'
  - q: 'Od akého rozpočtu to má zmysel?'
    a: 'Kým je reklamný rozpočet v stovkách eur mesačne, prínos nezaplatí server ani prácu. Zmysel sa objavuje pri stabilnom rozpočte v tisícoch a pri e-shope, kde presnosť merania priamo mení rozhodnutia algoritmu.'
  - q: 'Nahrádza server-side GTM súhlas s cookie?'
    a: 'Nie. Súhlas je právna požiadavka a serverové značkovanie ju neruší - Consent Mode v2 musí fungovať rovnako. Kto to predáva ako spôsob, ako obísť súhlas, predáva vám problém.'
---
![Server-side GTM a nastavenie GA4 | White Eagles & Co.](/assets/blog/GTM-GA4.webp)

# Server-side GTM: kedy sa oplatí a kedy stačí obyčajné GA4

Server-side tagging sa predáva ako liek na stratu dát. Niekedy ním naozaj je. Oveľa častejšie je to drahé riešenie problému, ktorý firma nemá - kým má nevyriešené tie, ktoré má.

Nižšie vecne: čo to je, čo opraví, čo neopraví, koľko stojí prevádzka a od akého rozpočtu sa o tom oplatí uvažovať.

[CTA_FORM:analytics]

## Čo to je, bez marketingu

Pri bežnom nastavení posiela údaje do Google **prehliadač návštevníka**: načíta sa skript, ten zozbiera udalosti a odošle ich priamo Googlu.

Pri serverovom značkovaní ide cesta inak. Prehliadač pošle údaje **na váš vlastný server**, a ten ich až potom posiela ďalej - do GA4, do Google Ads, do Meta. Rozdiel je v tom, kto komunikuje s Googlom: nie cudzí skript v prehliadači, ale vaša infraštruktúra.

Z toho plynie všetko ostatné - aj výhody, aj náklady.

## Čo to naozaj opraví

**Blokovače reklamy.** Blokujú známe adresy skriptov. Požiadavku na vlastnú doménu neblokujú, pretože ju nepoznajú.

**Obmedzenia prehliadačov.** Safari a Firefox skracujú životnosť cookie nastavených skriptom v prehliadači na niekoľko dní. Cookie nastavená serverom takémuto skráteniu nepodlieha, takže vracajúci sa návštevník sa nezobrazí ako nový.

**Rýchlosť stránky.** Časť skriptov sa presunie zo stránky na server. Pri weboch s piatimi meracími nástrojmi naraz je to citeľné - a rýchlosť Google počíta do pozícií.

**Kontrola nad tým, čo odchádza.** Na serveri sa dá z údajov odstrániť to, čo tam nemá čo robiť - e-mail v adrese stránky, parametre s osobnými údajmi.

## Čo neopraví

Tu vzniká väčšina sklamaní.

**Nenahrádza súhlas s cookie.** Consent Mode v2 musí fungovať presne tak isto. Serverové značkovanie nie je spôsob, ako obísť GDPR, a kto vám to tak predáva, predáva vám problém. Rozbor požiadaviek: [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

**Nespraví z chybného merania správne.** Ak sa udalosť odosielala pri kliknutí na tlačidlo namiesto po úspešnom odoslaní formulára, cez server pôjde rovnako nesprávna udalosť.

**Neprivedie dopyty.** Meria presnejšie. Predávať začne stránka, nie meranie.

**Nie je zadarmo do budúcna.** Server beží nepretržite a účtuje sa mesačne, aj keď sa nič nedeje.

## Koľko dát sa vlastne stráca

Číslo, ktoré sa v ponukách nadsadzuje najviac. Poctivá odpoveď je, že závisí od publika: pri bežnej slovenskej firme ide o jednotky až nižšie desiatky percent, pri technickom publiku výrazne viac.

**Odhadnúť sa to zvonku nedá, ale zmerať áno.** Vezmite mesiac a porovnajte dve čísla:

1. koľko dopytov naozaj prišlo - do schránky, do Telegramu, telefonátov;
2. koľko konverzií ukazuje GA4 za to isté obdobie.

Rozdiel je vaša strata. A tu prichádza nepríjemná časť: **vo veľkej väčšine prípadov, ktoré vidím, nie je vinníkom blokovač.** Vinníkom je meranie, ktoré nikdy nefungovalo - udalosť sa neposiela do GA4, nie je označená ako kľúčová, GA4 je pripojené dvakrát, alebo cookie lišta blokuje meranie aj po udelení súhlasu.

Server-side GTM na tom nezmení nič. Postup, ako to overiť, je v článku [nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/).

[CTA_FORM:audit]

## Čo urobiť predtým

Poradie je dôležité, lebo šetrí peniaze. Kým nefunguje toto, serverové značkovanie nemá čo vylepšovať:

1. **GA4 cez Tag Manager**, nie priamo v kóde - a rozhodne nie oboma spôsobmi naraz, inak sú všetky čísla dvojnásobné.
2. **Consent Mode v2** nastavený skôr než udalosti.
3. **Udalosti, ktoré zodpovedajú skutočnosti**: `generate_lead` po úspešnom odoslaní, kliknutia na telefón a messenger.
4. **Kľúčové udalosti označené** - inak je v konverziách nula, aj keď dopyty chodia.
5. **Prepojenie s Google Ads a Search Console.**

Až keď týchto päť bodov funguje a rozdiel medzi schránkou a GA4 stále zostáva veľký, má zmysel hovoriť o serveri.

## Koľko to stojí

Dve položky, a druhá sa pri rozhodovaní často zabúda.

**Nastavenie** - od **500 €**, hodinová sadzba **25 €/hod**. Zahŕňa server, vlastnú subdoménu, prenos kontajnera, prepojenie s GA4 a reklamnými účtami a testovanie.

**Prevádzka servera** - opakovaný mesačný náklad. Presná suma závisí od návštevnosti; podstatné je, že na rozdiel od bežného GA4, ktoré nestojí nič, tu platíte každý mesiac aj vtedy, keď je pokoj.

## Od akého rozpočtu to dáva zmysel

Bez okolkov, pretože odpoveď je pre väčšinu malých firiem „ešte nie":

**Zatiaľ nie**, ak je reklamný rozpočet v stovkách eur mesačne. Presnejšie meranie ušetrí menej, než stojí server a práca.

**Áno**, ak platí aspoň jedno:

- stabilný reklamný rozpočet v tisícoch eur mesačne, kde presnosť konverzií priamo mení rozhodnutia automatických stratégií;
- e-shop, kde sa meria nákup a hodnota objednávky, nie len dopyt;
- dlhý rozhodovací cyklus, kde sa návštevník vracia týždne a skrátená cookie ho rozdelí na niekoľko rôznych ľudí;
- technické publikum, kde blokovače používa väčšina.

Ak nič z toho neplatí, tie isté peniaze urobia viac v obsahu alebo v reklame - koľko stojí a čo prináša, je v článku [koľko stojí reklama v Google Ads](/sk/blog/kolko-stoji-reklama-na-slovensku/).

## Ako to prebieha

1. **Kontrola súčasného merania.** Často sa tu aj skončí, pretože sa nájde príčina, ktorá so serverom nesúvisí.
2. **Server a subdoména** na vašej doméne.
3. **Prenos kontajnera** a prepojenie s GA4, Google Ads, Meta.
4. **Consent Mode v2** na serverovej strane.
5. **Porovnanie oboch ciest** niekoľko týždňov súbežne - inak sa nedá povedať, či sa niečo zlepšilo.
6. **Vypnutie starej cesty** až po potvrdení.

Piaty bod vynecháva väčšina návodov, a práve on odpovedá na otázku, či ste dobre investovali.

## Ak potrebujete pomoc

Najprv sa pozriem, či strácate dáta kvôli blokovačom alebo kvôli meraniu, ktoré nikdy nebežalo správne - a poviem to na rovinu aj vtedy, keď z toho nevyjde väčšia zákazka. Nastavenie merania od **500 €**, sadzba **25 €/hod**.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Detaily na [stránke služby „Webová analytika"](/sk/service/analytics/). Súvisiace: [nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/), [cookie lišta a Consent Mode v2](/sk/blog/cookie-lista-2026-povinnosti/) a [reklama beží, dopyty nechodia](/sk/blog/reklama-bezi-dopyty-nechodia/).

[CTA_FORM:consult]
