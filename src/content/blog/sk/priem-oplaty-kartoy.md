---
title: 'Prijímanie platby kartou na webe: čo si vybrať v roku 2026'
description: >-
  Ako prijímať platby kartou na webe na Slovensku: platobné brány, poplatky, čo
  vyžaduje zákon od 1. mája 2026 a prečo je QR kód niekedy lacnejší než terminál.
date: '2026-08-04'
key: 'card-payments'
faq:
  - q: 'Musím prijímať bezhotovostnú platbu?'
    a: 'Od 1. mája 2026 je predávajúci povinný umožniť kupujúcemu zaplatiť bezhotovostne pri nákupe nad jedno euro. Jedinou výnimkou je nedostupné internetové pripojenie v mieste predaja. Zákon vyžaduje možnosť platby, nie konkrétne terminál — QR kód na prevod tejto požiadavke vyhovie.'
  - q: 'Čo je lacnejšie — terminál alebo platba na webe?'
    a: 'Závisí od obratu. Terminál má prenájom a servis, online platba zvyčajne len percento z transakcie. Pri malom počte platieb sa oplatí online platba alebo QR kód, pri veľkom toku v prevádzke terminál.'
  - q: 'Potrebujem certifikát PCI DSS?'
    a: 'Ak používate platobnú bránu, údaje karty sa zadávajú na jej strane a na váš web sa vôbec nedostanú. Certifikácia je vtedy na bráne, nie na vás. Práve preto sa údaje kariet nemajú preberať priamo na vlastnom webe.'
  - q: 'Ako dlho trvá napojenie platby?'
    a: 'Technická integrácia jeden až tri pracovné dni. Najdlhšie trvá overenie zo strany poskytovateľa — od niekoľkých dní po dva týždne podľa druhu činnosti.'
  - q: 'Dá sa prijímať platba bez e-shopu?'
    a: 'Áno. Stačí platobný odkaz alebo QR kód — klient ich dostane e-mailom či správou a zaplatí bez košíka a katalógu. Pri službách je to často najrozumnejšie riešenie.'
---
![Prijímanie platby kartou na webe na Slovensku | White Eagles & Co.](/assets/blog/webvardpay.webp)

# Prijímanie platby kartou na webe: čo si vybrať v roku 2026

Donedávna bolo prijímanie bezhotovostnej platby otázkou pohodlia. Od **1. mája 2026** je to otázka zákona: predávajúci musí umožniť kupujúcemu zaplatiť bezhotovostne pri každom nákupe nad jedno euro.

Formulácia je dôležitá a stojí za pozorné prečítanie: zákon vyžaduje **umožniť platbu**, nie postaviť terminál. To otvára možnosti, ktoré stoja podstatne menej.

Nižšie je, čo na slovenskom trhu existuje, koľko to stojí a ako si vybrať podľa obratu.

**Aby bolo jasné:** právne poradenstvo ani účtovníctvo nerobím. Robím weby, reklamu a analytiku — a v tomto článku rozoberám tú časť témy, ktorá sa týka webu.

[CTA_FORM:webdev]

## Tri spôsoby, ako prijať peniaze

**Platobný terminál.** Fyzické zariadenie v prevádzke. Prenájom plus percento z obratu. Oplatí sa tam, kde je tok zákazníkov veľký a platia na mieste.

**Platba na webe cez platobnú bránu.** Klient zaplatí kartou bez toho, aby opustil stránku. Zvyčajne len percento z transakcie, bez mesačného prenájmu. Sedí e-shopom a všetkým, kto predáva služby na diaľku.

**QR kód na bankový prevod.** Najlacnejšia možnosť: poplatok žiadny, klient naskenuje kód a potvrdí prevod vo svojej banke. Požiadavke zákona formálne vyhovuje.

| | Terminál | Platba na webe | QR kód |
|---|---|---|---|
| Mesačný poplatok | áno | zvyčajne nie | nie |
| Poplatok z platby | áno | áno | nie |
| Funguje na diaľku | nie | áno | áno |
| Peniaze prídu | rýchlo | rýchlo | ako bežný prevod |
| Vhodné pre | prevádzky | e-shopy a služby | malý obrat |

## Na čo pozerať pri výbere brány

Poskytovateľov je na slovenskom trhu dosť a rozdiel medzi nimi nie je len v percente.

**Poplatok a jeho štruktúra.** Pozerajte nielen na percento, ale aj na pevnú časť z transakcie. Pri priemernom nákupe 10 eur váži pevných 0,25 eura viac než pol percenta navyše.

**Lehota výplaty.** Poskytovatelia posielajú peniaze na účet s rôznym oneskorením — od nasledujúceho dňa po týždeň. Pre prevádzkový kapitál to nie je maličkosť.

**Spôsoby platby.** Karty sú minimum. Slovenský zákazník však často čaká aj Apple Pay, Google Pay a platbu cez svoju bankovú aplikáciu. Čím menej krokov, tým menej opustených košíkov.

**Overenie pri napojení.** Poskytovateľ preveruje predmet podnikania a môže odmietnuť alebo si vyžiadať ďalšie doklady. Pri niektorých odboroch trvá overenie týždne — to je dobré zistiť skôr, než klientom sľúbite platbu online.

**Vrátenie platby.** Ako sa refundácia rieši, koľko stojí a ako dlho trvá. Myslí sa na to naposledy a potom sa rieši v zhone.

## Čo nerobiť

**Nepreberajte údaje kariet priamo na svojom webe.** Len čo číslo karty pristane na vašom serveri, ocitáte sa v pôsobnosti štandardu PCI DSS so všetkým, čo k tomu patrí. Správne je, aby sa údaje zadávali na strane brány a váš web dostal len výsledok.

**Neukazujte cenu bez konečnej sumy.** Ak sa v poslednom kroku pripočíta doprava alebo poplatok, časť kupujúcich odchádza práve tam. Konečná suma má byť viditeľná skôr.

**Nenechávajte jediný spôsob platby.** Časť slovenských zákazníkov platí kartou, časť uprednostní prevod, časť dobierku. Jediná možnosť odreže zvyšok.

[CTA_FORM:consult]

## Čo treba na strane webu

Napojenie brány nie je len vloženie kľúča do nastavení.

**Platobná stránka musí fungovať na telefóne.** Viac než polovica platieb ide z mobilu a akákoľvek nepohodlnosť na malom displeji sa mení na opustený košík.

**Treba návrat na zrozumiteľnú stránku.** Po zaplatení má klient pristáť na potvrdení objednávky, nie na prázdnej stránke „ďakujeme“ bez detailov.

**Chyby platby treba ošetriť.** Karta zamietnutá, nedostatok prostriedkov, expirácia — na každý prípad treba zrozumiteľný text a možnosť skúsiť znova. Inak klient jednoducho odíde.

**Meranie lievika je nutnosť.** Koľko ľudí sa dostalo na platobnú stránku, koľko stlačilo tlačidlo, koľko zaplatilo. Bez toho sa o probléme dozviete o mesiac podľa obratu. Ako sa to nastavuje, je v článku [„Ako nastaviť Google Analytics 4“](/sk/blog/nastavenie-google-analytics-4/).

**A prepojenie s pokladnicou.** Ak máte povinnosť evidovať tržby cez eKasu, je rozumné, aby sa doklad vystavil automaticky po zaplatení, nie ručne ku každej objednávke. Podrobnosti sú v [článku o eKase](/sk/blog/ekasa-online-kassa-slovakia/).

## Koľko to stojí

Poplatky závisia od poskytovateľa a obratu, preto konkrétne percentá uvádzať nebudem — menia sa a pri väčšom obrate má zmysel o nich vyjednávať.

Pri prepočte sa oplatí pozerať na toto:

1. Zistite si **priemernú výšku nákupu**. Od nej závisí, čo váži viac — percento alebo pevná časť.
2. Spočítajte **počet transakcií za mesiac**. Pri malom počte platieb sa prenájom terminálu nevráti.
3. Pripočítajte **cenu integrácie** — jednorazovú.
4. Porovnajte s variantom „QR kód“, kde poplatok nie je vôbec.

Často sa ukáže, že pre menšie podnikanie pokryje kombinácia „QR kód plus platba na webe“ požiadavku zákona aj potreby klientov lacnejšie než terminál.

## Čo urobiť do 1. mája

1. Rozhodnite sa, akým spôsobom umožníte bezhotovostnú platbu. Je to povinnosť, nie odporúčanie.
2. Ak predávate online, napojte bránu bez odkladu: overenie u poskytovateľa trvá.
3. Skontrolujte platobnú stránku na telefóne.
4. Nastavte meranie platobného lievika.
5. Prepojte platbu s pokladnicou, ak ju máte povinnú.

## Ak potrebujete technickú časť

Zmluvu s platobným poskytovateľom uzatvárate sami — sú to vaše peniaze a vaše podmienky. Všetko okolo webu — integrácia brány, platobná stránka, ošetrenie chýb, QR kódy, meranie lievika, prepojenie s pokladnicou — robím ja.

Na Slovensku žijem viac ako desať rokov a spustil som **12+ webov pre slovenské firmy**, medzi nimi e-shopy a rezervačné systémy s online platbou: Bodabo, Top Sklad, Krása štúdio, Biliardovňa. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Súvisiace: [eKasa a online pokladnica](/sk/blog/ekasa-online-kassa-slovakia/), [registrácia na DPH](/sk/blog/dph-registraciya/) a [stránka služby „Tvorba webstránok“](/sk/service/webdev/).

[CTA_FORM:analytics]
