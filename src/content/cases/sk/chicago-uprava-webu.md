---
title: 'CHICAGO: úpravy webu strelnice na WordPresse a reklama v Google'
description: 'Web strelnice v Bratislave na WordPresse a WooCommerce: oprava chýb cache a pošty, prihláška do klubu, darčekový poukaz v PDF, povinný dátum a čas rezervácie. Reklama vo vyhľadávaní: 92 objednávok a 62 hovorov.'
date: '2026-10-12'
updated: '2026-10-12'
key: 'chicago'
client: 'CHICAGO'
url: 'https://www.chicago.sk'
image: '/assets/case-chicago.webp'
summary: 'Strelnica v Bratislave: úpravy WordPressu, opravy a reklama.'
service: 'bugfix'
services:
  - 'Úpravy WordPressu'
  - 'WooCommerce'
  - 'Oprava chýb'
  - 'Google Ads'
order: 7
---
![Web strelnice CHICAGO v Bratislave | White Eagles & Co.](/assets/case-chicago.webp)

# CHICAGO: úpravy webu strelnice na WordPresse a reklama v Google

CHICAGO je strelnica v Bratislave. Web beží na WordPresse s WooCommerce: rezervujú sa na ňom balíčky streľby, kupujú darčekové poukazy a podávajú prihlášky do klubu. Web som nerobil ja. Moja práca tu: opravy, úpravy a reklama vo vyhľadávaní Google Ads.

## Opravy

- **Chyba pri prihlásení do administrácie.** Cache plugin W3 Total Cache zobrazoval varovanie: jeho starší kód nepočítal s PHP 8. Opravené v kóde pluginu.
- **Zákazníci nevideli e-maily o objednávkach.** WordPress posielal poštu s odosielateľom, ktorý nesedel s adresou v e-maile, a spamové filtre jej dávali 2,0 bodu pri hranici 2,4. Odosielanie prešlo na overený SMTP v mene klubu, skóre kleslo na 0,4 a denník e-mailov teraz ukazuje, čo odišlo a čo nie.

## Úpravy

- **Oznam na úvodnej stránke.** Okno s dôležitou informáciou si klub zapína a vypína sám v administrácii, dá sa nastaviť doba zobrazenia a cache sa vymaže automaticky, aby sa okno objavilo aj zmizlo hneď.
- **Povinný dátum a čas** pri rezervácii vo WooCommerce: objednávka bez času návštevy už nepríde.
- **Prihláška do klubu na webe.** Uchádzač ju vyplní online a na tlač ide dokument podľa klubového tlačiva.
- **Darčekový poukaz v PDF.** Po platbe prevodom sa vytvorí sám a príde kupujúcemu aj klubu, z administrácie sa dá poslať znova.

## Reklama

Kampaň vo vyhľadávaní Google Ads beží od marca 2025 vo viacerých jazykoch. Za ten čas: 25 961 preklikov s priemernou cenou 0,20€ pri CTR 17,6%, 92 objednávok cez web a 62 hovorov priamo z reklám.

## Ako sa pracovalo

Pred každou zmenou plná záloha. Úpravy sú urobené cez detskú tému a samostatné pluginy, tému som neupravoval, takže ich jej aktualizácie neprepíšu. Celé rozhranie je v slovenčine.

## Ak máte podobnú úlohu

Ak už máte web na WordPresse a niečo v ňom nefunguje alebo chýba funkcia, je to [služba „Oprava chýb a úpravy“](/sk/service/bugfix/). Nové weby robím na vlastnom kóde, WordPress opravujem, zrýchľujem a migrujem. Prípadové štúdie reklamy: [Severské drevo](/sk/case/severske-drevo-reklama-google/), [TOP SKLAD](/sk/case/top-sklad-reklama-google/).
