---
title: 'Správa a údržba WordPress webu: aktualizácie, zálohy, úpravy a koľko to stojí'
description: >-
  Čo patrí do údržby WordPress webu, ako často aktualizovať, prečo sa
  aktualizácia nesmie robiť naslepo, kde končí údržba a začína vývoj a koľko
  to celé stojí. A prečo je pri webe na modernom stacku údržby rádovo menej.
date: '2026-09-12'
key: 'wordpress-maintenance'
faq:
  - q: 'Čo zahŕňa údržba WordPress webu?'
    a: 'Aktualizácie jadra, pluginov a témy so zálohou pred každou z nich, zálohy uložené mimo servera s vyskúšaným obnovením, aktuálnu verziu PHP, kontrolu dostupnosti a SSL certifikátu, test formulárov, kontrolu používateľov a zmazanie nepoužívaných pluginov. Drobné úpravy obsahu sa zvyčajne riešia popri tom.'
  - q: 'Ako často treba WordPress aktualizovať?'
    a: 'Bezpečnostné opravy hneď, ako vyjdú, ostatné aktualizácie raz mesačne. Väčšie verzie page buildera, e-shopu alebo témy najprv na testovacej kópii. Raz ročne aktualizovať nestačí: hromadné napadnutia idú cez diery, na ktoré oprava existuje týždne či mesiace.'
  - q: 'Koľko stojí údržba WordPress webu?'
    a: 'Práca sa účtuje hodinovo po 35 eur. Pri menšom firemnom webe zaberie mesačná kontrola s aktualizáciami a testom zvyčajne hodinu až dve. K tomu hosting a doména približne 50 až 150 eur ročne a ročné licencie prémiových pluginov, ak ich web používa. Neplánované opravy po zlej aktualizácii sú navyše.'
  - q: 'Čo sa stane, keď web nikto neudržiava?'
    a: 'Najprv nič viditeľné. Potom sa objaví zraniteľnosť v niektorom plugine a web je napadnutý, alebo hosting ukončí podporu starej verzie PHP a web sa pri vynútenej zmene rozpadne, alebo formulár prestane odosielať a dopyty mesiace nikam nechodia.'
  - q: 'Je údržba potrebná aj pri webe na mieru?'
    a: 'Menej. Web na modernom stacku bez pluginov a bez verejnej administrácie nemá čo mesačne aktualizovať, závislosti sa obnovujú občas a plánovane. Ku každému novému webu dávam šesť mesiacov podpory zadarmo: monitoring, zálohy, aktualizácie a oprava chýb.'
---
![Správa a údržba WordPress webu | White Eagles & Co.](/assets/blog/sprava-wordpress-webu.webp)

# Správa a údržba WordPress webu: aktualizácie, zálohy, úpravy a koľko to stojí

Web na WordPresse nie je hotový v deň spustenia. Je to jadro, téma a desať až tridsať pluginov od rôznych autorov, z ktorých každý vydáva aktualizácie vlastným tempom. Keď ich nikto nesleduje, web roky vyzerá rovnako a zvnútra pomaly starne, až sa jedného dňa pokazí naraz.

Nižšie je, čo presne do údržby patrí, ako ju robiť tak, aby aktualizácia web nepoložila, kde končí údržba a začína vývoj, koľko to stojí a kedy sa oplatí prestať platiť za udržiavanie starej technológie.

[CTA_FORM:bugfix]

## Čo presne patrí do údržby

**1. Aktualizácie.** Jadro WordPressu, pluginy, téma, preklady. Bezpečnostné opravy hneď, ostatné raz mesačne. Nikdy bez zálohy tesne predtým.

**2. Zálohy.** Súbory aj databáza, uložené mimo servera, na ktorom web beží. Záloha na tom istom hostingu zmizne spolu s webom, keď hosting zlyhá alebo pozastaví účet. A aspoň raz za čas **vyskúšané obnovenie**: záloha, ktorá sa nedá obnoviť, je iba pocit istoty.

**3. Verzia PHP.** Každá verzia PHP má obmedzenú dobu podpory. PHP 8.1 prestalo dostávať bezpečnostné opravy na konci roka 2025, PHP 8.2 ich prestane dostávať na konci roka 2026. Hosting potom verziu vypne a staré pluginy, ktoré s novou nefungujú, položia web.

**4. Dostupnosť a SSL certifikát.** Monitoring, ktorý ohlási výpadok skôr, než zavolá zákazník, a kontrola, že sa certifikát obnovuje.

**5. Test formulárov.** Raz mesačne skutočné odoslanie z mobilu v anonymnom okne. Formulár, ktorý sa tvári, že odoslal, je najdrahšia tichá porucha: dopyty mesiace nechodia a nikto to nevie.

**6. Bezpečnosť.** Zoznam správcov, dvojfaktorové overenie, zmazanie nepoužívaných pluginov a tém. Každý nepoužívaný plugin je cudzí kód, ktorý nič neprináša a môže mať zraniteľnosť.

**7. Licencie.** Prémiové pluginy a témy sa platia ročne. Keď licencia vyprší, prestanú chodiť aj bezpečnostné aktualizácie.

## Prečo sa aktualizácia nesmie robiť naslepo

Aktualizácia je najčastejší dôvod, prečo WordPress web spadne. Nie preto, že by bola chybná, ale preto, že dva pluginy od rôznych autorov po zmene prestanú spolu fungovať, alebo úpravy vložené priamo do témy prepíše nová verzia.

Poradie, ktoré šetrí nervy:

1. **Záloha** tesne pred aktualizáciou.
2. **Testovacia kópia** pri väčších verziách page buildera, e-shopu alebo témy.
3. **Aktualizácia** po jednom väčšom plugine, nie všetko jedným klikom.
4. **Kontrola** úvodnej stránky, formulára, košíka a administrácie.
5. **Nikdy v piatok večer** a nikdy pred kampaňou.

Ak sa po aktualizácii objaví biela obrazovka alebo chyba, postup je v článku [oprava WordPress stránky](/sk/blog/oprava-wordpress-stranky/).

## Úpravy: kde končí údržba a začína vývoj

Výmena textu, ceny, fotky alebo pridanie stránky podľa existujúcej šablóny je bežná súčasť správy webu. Nová funkcia, napríklad rezervácia, klientská zóna alebo napojenie na účtovný systém, je už vývoj a má mať vlastný odhad.

Dve pravidlá, ktoré ušetria veľa peňazí:

- **Úpravy kódu nikdy priamo do témy.** Pri najbližšej aktualizácii zmiznú. Patria do podradenej témy (child theme) alebo do vlastného pluginu.
- **„Plugin skoro vyhovuje" je varovanie.** Ohýbanie cudzieho pluginu na vlastnú logiku je úprava, ktorú treba opakovať pri každej jeho aktualizácii. Keď je takých úprav viac, platíte za údržbu niečoho, čo aj tak nesedí.

[CTA_FORM:consult]

## Koľko stojí údržba WordPress webu

Poctivo, po položkách:

| Položka | Náklad |
|---|---|
| **Doména a hosting** | približne 50 až 150 € ročne |
| **Licencie prémiových pluginov a témy** | ak ich web používa, každá sa platí ročne |
| **Mesačná údržba** (aktualizácie, kontrola záloh, test formulárov) | pri menšom firemnom webe zvyčajne 1 až 2 hodiny, u mňa po 35 € |
| **Neplánované opravy** | po zlej aktualizácii, pri napadnutí, pri vynútenej zmene PHP |

Najdrahšia je posledná položka, lebo sa nedá naplánovať. Pravidelná údržba ju nevymaže, ale výrazne zmenšuje.

## Čo sa stane bez údržby

Scenáre, s ktorými ma volajú najčastejšie:

- **Napadnutie** cez neaktualizovaný plugin. Web presmerúva na kasíno a Google varuje návštevníkov. Postup je v článku [napadnutý WordPress](/sk/blog/napadnuty-wordpress-web/).
- **Spomalenie**, ktoré prichádza postupne s každým pridaným pluginom, až sa web na mobile načítava štyri sekundy. Viac v článku [pomalý WordPress web](/sk/blog/pomaly-wordpress-web/).
- **Vynútená zmena PHP** zo strany hostingu a web, ktorý sa po nej rozpadne, lebo polovica pluginov je roky neaktualizovaná.
- **Ticho nefunkčný formulár.** Web vyzerá v poriadku, dopyty nechodia a nikto nevie prečo.

## Údržba verzus nový web na modernom stacku

Tu je jadro veci. Na WordPresse je údržba **trvalý náklad, ktorý vyplýva zo samotnej stavby**: web zložený z pluginov od dvadsiatich autorov treba sledovať každý mesiac, lebo každý z nich je samostatné riziko. Tomu sa nedá vyhnúť ani najlepšou údržbou, dá sa to iba platiť.

Web na mieru na modernom stacku, napríklad na Next.js, je postavený inak. Nemá pluginy, nemá administráciu na verejnej adrese a stránky sa generujú vopred. Nie je čo mesačne aktualizovať, závislosti sa obnovujú občas a plánovane, a pri úprave obsahu sa nemôže stať, že jeden plugin položí druhý.

Kedy sa oplatí prestať platiť za udržiavanie a postaviť web nanovo:

- web sa **po aktualizácii pokazí** viac než raz za rok;
- na jeho **starej verzii PHP** visí polovica pluginov;
- úprav „aby plugin skoro vyhovoval" je toľko, že **nikto sa neodváži aktualizovať**;
- za údržbu a opravy ste za posledné dva roky zaplatili sumu, za ktorú by bol nový web.

Reálne ceny nového webu sú v článku [koľko stojí web na Slovensku](/sk/blog/website-cost-2026/), porovnanie oboch prístupov v článku [WordPress alebo web na mieru](/sk/blog/wordpress-vs-custom-website/).

## Mesačný kontrolný zoznam

Ak sa o web staráte sami, toto je minimum raz mesačne:

1. Záloha súborov aj databázy mimo servera.
2. Aktualizácie jadra, pluginov a témy, väčšie verzie najprv na kópii.
3. Kontrola úvodnej stránky, formulára, košíka a administrácie po aktualizácii.
4. Testovacie odoslanie formulára z mobilu.
5. Zoznam správcov: nikto neznámy, všetci s dvojfaktorovým overením.
6. Zmazanie nepoužívaných pluginov a tém.
7. Raz za štvrťrok skúšobné obnovenie zálohy.

## Ak potrebujete pomoc

Udržiavam existujúce WordPress weby: aktualizácie so zálohou a testom, zálohy mimo servera, zmena verzie PHP, drobné úpravy a opravy po zlých aktualizáciách. Účtujem hodinovo po **35 €**, bez paušálu za čas, keď sa nič nerobí. Hosting ani licencie pluginov nepredávam, moja časť je práca na webe.

Nové weby staviam na modernom stacku, s údržbou rádovo menšou, a ku každému dávam **šesť mesiacov podpory zadarmo**. Na Slovensku žijem viac ako desať rokov, spustil som **12+ webov pre slovenské firmy**, napríklad [Krása štúdio OK](/sk/case/studio-krasy/) s objednávaním cez Telegram. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Detaily na [stránke služby „Oprava webstránky a WordPress webu"](/sk/service/bugfix/). Ak chcete vedieť, v akom stave je váš web dnes, [bezplatný audit](/sk/seo-audit/) s výsledkom do 3 pracovných dní.

[CTA_FORM:webdev]
