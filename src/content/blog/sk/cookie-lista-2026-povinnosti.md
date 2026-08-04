---
title: 'Cookie lišta v roku 2026: čo vyžadujú európske pravidlá a Consent Mode v2'
description: >-
  Kedy je cookie lišta povinná, ako má podľa pravidiel EÚ vyzerať, čo je Consent
  Mode v2 a prečo bez neho prichádzate o dáta aj o remarketing.
date: '2026-08-04'
faq:
  - q: 'Potrebujem cookie lištu, ak mám len Google Analytics?'
    a: 'Áno. Analytické cookies vyžadujú súhlas rovnako ako reklamné. Bez súhlasu sa dá zaobísť len s nevyhnutnými technickými cookies — tými, bez ktorých web nefunguje.'
  - q: 'Je to slovenský alebo európsky zákon?'
    a: 'Európsky. Povinnosť vychádza z GDPR a smernice o súkromí v elektronických komunikáciách. Slovensko ich preberá, no vykladajú sa v celej Únii rovnako a požiadavky sa nelíšia od susedných krajín.'
  - q: 'Čo je Consent Mode v2 a je povinný?'
    a: 'Je to mechanizmus Google, ktorým web oznamuje reklamným a analytickým službám, či návštevník dal súhlas. Google ho vyžaduje od marca 2024 pre personalizovanú reklamu a remarketing v EHP. Bez neho sa časť dát stráca a remarketing je obmedzený.'
  - q: 'Stačí tlačidlo „Prijať všetko“?'
    a: 'Nie. Odmietnuť musí byť rovnako ľahké ako súhlasiť — odmietnutie má byť na rovnakej úrovni, nie schované v nastaveniach. Lišta s jediným tlačidlom požiadavkám nevyhovuje.'
  - q: 'Koľko dát sa pri odmietnutí stratí?'
    a: 'Časť návštevníkov odmietne a ich správanie sa nesleduje. Consent Mode v2 však umožňuje modelovanie a Google chýbajúce dáta dopĺňa. Zle nastavená lišta stratí podstatne viac než samotné odmietnutie.'
---
![Cookie lišta v roku 2026: európske pravidlá a Consent Mode v2 | White Eagles & Co.](/assets/blog/cookiesbanner.webp)

# Cookie lišta v roku 2026: čo vyžadujú európske pravidlá a Consent Mode v2

Hneď na úvod uvediem na pravú mieru to, čo sa často chápe nesprávne: **povinnosť pýtať si súhlas s cookies nevychádza zo slovenského zákona, ale z európskych pravidiel** — GDPR a smernice o súkromí v elektronických komunikáciách. Slovensko ich preberá, no vykladajú sa v celej Únii rovnako. Praktický dôsledok: požiadavky na váš web sú rovnaké ako na nemeckú či českú firmu.

Druhá vec: od marca 2024 Google vyžaduje **Consent Mode v2**. To už nie je o zákone, ale o tom, či vám budú fungovať analytika a reklama.

[CTA_FORM:cookies]

## Kedy je lišta povinná

Súhlas je potrebný, ak web používa akékoľvek cookies **okrem nevyhnutných**.

**Nevyhnutné** sú tie, bez ktorých web nefunguje: relácia používateľa, obsah košíka, zapamätanie jazyka, ochrana formulárov. Pre ne sa súhlas nevyžaduje.

**Všetko ostatné súhlas vyžaduje:**

- analytika — Google Analytics, Microsoft Clarity, akékoľvek počítadlá
- reklama a remarketing — Google Ads, Meta Pixel
- vložené videá z YouTube a mapy, ak sa načítajú hneď
- chaty, widgety sociálnych sietí, fonty z cudzích serverov

Teda prakticky každý súčasný web. Ak máte Google Analytics, lištu potrebujete, aj keď reklamu nemáte vôbec.

## Ako má lišta vyzerať

Práve tu sa najčastejšie chybuje, pretože lišta sa nasadzuje „aby bola“.

**Súhlas je dobrovoľný.** Nesmiete blokovať prístup na web do udelenia súhlasu a za súhlas sa nedá považovať posúvanie stránky.

**Odmietnutie je rovnako ľahké ako súhlas.** Ak je „Prijať všetko“ jedno tlačidlo a odmietnutie sa skrýva v nastaveniach cez tri kliky, požiadavka splnená nie je. Obe tlačidlá patria na rovnakú úroveň.

**Súhlas je konkrétny.** Kategórie oddelené: analytika, reklama, funkčné. Jedno tlačidlo „súhlasím so všetkým“ bez voľby nestačí.

**Súhlas je odvolateľný.** Návštevník musí mať možnosť rozhodnutie zmeniť — zvyčajne cez odkaz v pätičke.

**Žiadne predškrtnuté políčka.** Analytické a reklamné kategórie sú v predvolenom stave vypnuté.

**Pred súhlasom sa nenačíta nič.** Toto je kľúčové a porušuje sa to najčastejšie: lišta sa zobrazí, no skripty analytiky už bežali. Z pohľadu pravidiel je to to isté, ako keby lišta nebola.

## Consent Mode v2 je iná téma

Nie je to požiadavka zákona, ale požiadavka Google, a nemá zmysel ich zamieňať.

Consent Mode je mechanizmus, ktorým web oznamuje službám Google, či návštevník dal súhlas a na čo presne. Vo verzii v2 pribudli dva parametre týkajúce sa reklamy: `ad_user_data` a `ad_personalization`.

**Čo sa stane bez neho:**

- personalizovaná reklama a remarketing v Európskom hospodárskom priestore nefungujú
- časť konverzií sa nezapočíta a kampane vyzerajú stratovejšie, než sú
- v prehľadoch sa strácajú dáta, ktoré by Google vedel doplniť modelovaním

Pri odmietnutí odosielajú systémy len anonymný signál bez cookie — dáta teda nezmiznú úplne, ale doplnia sa modelovaním. To všetko však funguje len vtedy, keď je Consent Mode nastavený.

Jeho absencia teda nebolí právne, ale priamo v peniazoch za reklamu.

[CTA_FORM:consult]

## Prečo sú hotové pluginy často horšie

Pokušenie je pochopiteľné: nasadím modul a mám pokoj. V praxi vzniká niekoľko problémov.

**Predplatné navždy.** Väčšina hotových riešení ako Cookiebot si účtuje mesačný poplatok. Za dva-tri roky to vyjde drahšie než vlastná lišta.

**Blokujú viac, než treba.** Mnohé pluginy zastavia skripty aj tam, kde súhlas je, kvôli hrubým pravidlám. Prichádzate o dáta zbytočne.

**Spomaľujú web.** Externý modul znamená ďalšie požiadavky pred vykreslením stránky. Rýchlosť Google zohľadňuje v pozíciách.

**Chýba kontrola nad poradím.** A práve poradie rozhoduje, či Consent Mode funguje: signál súhlasu musí odísť skôr, než sa načítajú tagy.

**Dizajn sa nedá zladiť.** Cudzia lišta vyzerá ako cudzia lišta.

Vlastná lišta je jednorazová práca. Robí sa na mieru webu, odosiela správne signály v správnom poradí a nevyžaduje predplatné.

## Ako si lištu overiť za päť minút

1. Otvorte web v anonymnom okne.
2. Otvorte vývojárske nástroje, záložku sieť.
3. **Bez toho, aby ste čokoľvek klikli,** pozrite, či odišli požiadavky na `google-analytics.com`, `googletagmanager.com`, `facebook.net`.
4. Ak odišli pred súhlasom, lišta nefunguje tak, ako má.
5. Overte, či je tlačidlo odmietnutia na rovnakej úrovni ako súhlas.
6. Nájdite v pätičke odkaz na zmenu rozhodnutia.

Ak aspoň jeden bod nesedí, lišta je tam len naoko.

## Časté chyby

**Lišta je, ale skripty bežia pred súhlasom.** Najrozšírenejšia chyba. Formálne súhlas udelený nebol.

**Len tlačidlo „Prijať“.** Odmietnutie musí byť rovnako dostupné.

**Chýba Consent Mode v2.** Právne možno nič, ale reklama a analytika fungujú horšie.

**Chýba stránka so zásadami cookies.** Lišta má odkazovať na vysvetlenie, aké cookies a načo sa používajú.

**Súhlas sa neuloží.** Lišta vyskočí pri každom prechode a návštevníci odchádzajú.

## Čo urobiť

1. Overte si podľa zoznamu vyššie, či vaša lišta naozaj funguje.
2. Uistite sa, že odmietnutie je rovnako ľahké ako súhlas.
3. Skontrolujte, či je nastavený Consent Mode v2 — závisí od toho reklama.
4. Overte, že sa pred súhlasom nenačíta nič navyše.
5. Doplňte stránku so zásadami cookies a odkaz na zmenu rozhodnutia.

## Ak to chcete spraviť poriadne

Robím vlastnú lištu na mieru vášho webu: vo vašom štýle, so správnym poradím signálov, s rozdelením kategórií, s uložením voľby a možnosťou ju zmeniť. Consent Mode v2 prepájam s Google Analytics, Tag Managerom aj reklamnými účtami. Testujem na viac než pätnástich scenároch.

**Jednorazovo, bez mesačného predplatného.** Podrobnosti a cena sú na [stránke služby „Cookie Consent Mode V2“](/sk/service/cookies/).

Na Slovensku žijem viac ako desať rokov a spustil som **12+ webov pre slovenské firmy**. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Súvisiace: [GDPR pre malú firmu](/sk/blog/gdpr-dlya-maloy-firmy/), [povinné údaje na webe](/sk/blog/obyazatelnye-rekvizity-sajta/) a [nastavenie Google Analytics 4](/sk/blog/nastavenie-google-analytics-4/).

[CTA_FORM:analytics]
