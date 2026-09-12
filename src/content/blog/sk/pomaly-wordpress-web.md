---
title: 'Pomalý WordPress web: prečo sa načítava pomaly a ako ho zrýchliť'
description: >-
  Prečo sa WordPress web načítava pomaly, ako to zmerať správne, v akom poradí
  ho zrýchliť a koľko to stojí. A kedy narazíte na strop, ktorý žiadny plugin
  na zrýchlenie neprerazí.
date: '2026-09-12'
key: 'slow-wordpress'
faq:
  - q: 'Ako zistím, či je môj web naozaj pomalý?'
    a: 'Otvorte PageSpeed Insights, zadajte adresu a pozerajte záložku Mobil. Dôležité sú údaje od skutočných používateľov: LCP do 2,5 sekundy, INP do 200 milisekúnd a CLS do 0,1. Skóre od 0 do 100 je iba laboratórny odhad a samo o sebe nič nerozhoduje.'
  - q: 'Prečo je WordPress web pomalý?'
    a: 'Najčastejšie kombinácia štyroch vecí: lacný hosting bez cache, page builder typu Elementor alebo WPBakery, priveľa pluginov, ktoré načítavajú skripty na každej stránke, a obrázky priamo z fotoaparátu. Samotné jadro WordPressu býva príčinou zriedka.'
  - q: 'Pomôže plugin na zrýchlenie?'
    a: 'Cache plugin skráti čas odpovede servera, často výrazne. Nezmenší však ťažkú tému, page builder ani skripty tretích strán, ktoré prehliadač musí stiahnuť a spustiť. Preto skóre po inštalácii cache pluginu často stúpne málo.'
  - q: 'Koľko stojí zrýchlenie webu?'
    a: 'Hodinová sadzba 35 eur. Najprv zmeriam, kde čas reálne stráca, a poviem, koľko práce je to, ešte pred zásahom. Ak sa ukáže, že strop je v téme alebo v page builderi, poviem to rovno a nebudem účtovať hodiny, ktoré nič neprinesú.'
  - q: 'Oplatí sa pomalý WordPress zrýchľovať, alebo radšej nový web?'
    a: 'Ak brzdia obrázky, cache a pár pluginov, zrýchlenie sa oplatí. Ak web stojí na page builderi s desiatkami pluginov a na mobile má LCP nad štyri sekundy aj po optimalizácii, lacnejší je nový web na modernom stacku, ktorý je rýchly už svojou stavbou.'
---
![Pomalý WordPress web: prečo sa načítava pomaly | White Eagles & Co.](/assets/blog/pomaly-wordpress-web.webp)

# Pomalý WordPress web: prečo sa načítava pomaly a ako ho zrýchliť

Pomalý web nepadne a nehlási chybu. Iba ticho stráca ľudí: návštevník z mobilu čaká tri, štyri sekundy na bielu obrazovku a vráti sa do výsledkov k vedľajšiemu odkazu. Vy to nevidíte, lebo na počítači v kancelárii s rýchlym internetom a s webom v pamäti prehliadača sa všetko načíta hneď.

Nižšie je postup, ako rýchlosť zmerať tak, aby čísla niečo znamenali, čo WordPress web najčastejšie brzdí, v akom poradí to riešiť a kde je strop, ktorý žiadna optimalizácia neprerazí.

[CTA_FORM:bugfix]

## Prečo na rýchlosti záleží peniazmi

Tri dôvody, ktoré sa dajú vyčísliť:

- **Pozície v Googli.** Google hodnotí skúsenosť s načítaním cez metriky Core Web Vitals a meria ich na mobile. Pri dvoch podobne dobrých stránkach vyhráva rýchlejšia.
- **Cena reklamy.** Google Ads započítava do skóre kvality aj skúsenosť na vstupnej stránke. Pomalá stránka platí vyššiu cenu za klik a zároveň menej ľudí z kliknutia napíše. Platíte teda dvakrát. Viac v článku [koľko stojí reklama na Googli](/sk/blog/kolko-stoji-reklama-na-slovensku/).
- **Dopyty.** Každá sekunda navyše na mobile je človek, ktorý formulár nikdy neuvidí.

## Ako zmerať rýchlosť správne

Otvorte **PageSpeed Insights**, zadajte adresu a prepnite na záložku **Mobil**. Počítačová verzia skoro vždy vyzerá dobre a klame.

Pozerajte hornú časť s údajmi od skutočných používateľov, nie iba skóre:

| Metrika | Čo meria | Dobré |
|---|---|---|
| **LCP** | kedy sa zobrazí hlavný obsah | do 2,5 s |
| **INP** | ako rýchlo stránka reaguje na ťuknutie | do 200 ms |
| **CLS** | či obsah počas načítania neposkakuje | do 0,1 |

Ak údaje od používateľov chýbajú, web má málo návštev a zostáva laboratórny test. Merajte tri, štyri typy stránok: úvod, stránku služby, článok, pri e-shope produkt a košík. Úvodná stránka často nie je tá najpomalšia.

Do zoznamu kontrol patrí aj **čas odpovede servera** (TTFB). Ak je nad 0,8 sekundy, problém je na serveri, nie v prehliadači, a obrázky ani skripty to nevyriešia.

## Čo WordPress web brzdí najčastejšie

**1. Hosting bez cache.** Bez cache WordPress pri každej návšteve znova skladá stránku z PHP a databázy. Na lacnom zdieľanom hostingu to znamená sekundu aj viac, kým server vôbec začne odpovedať.

**2. Page builder.** Elementor, WPBakery, Divi a podobné nástroje umožňujú poskladať stránku bez programovania, a platí sa za to váhou. Každá sekcia je zabalená do niekoľkých vrstiev kódu a na každú stránku sa načítavajú štýly a skripty pre všetky prvky, ktoré builder pozná.

**3. Priveľa pluginov.** Nie je problém ich počet, ale to, že mnohé ťahajú svoje skripty na každú stránku, aj tam, kde sa nepoužívajú. Formulár z kontaktnej stránky sa načítava aj v článku, slider z úvodnej stránky aj v košíku.

**4. Obrázky.** Fotografia priamo z telefónu má niekoľko megabajtov. Na webe má mať desiatky kilobajtov, formát WebP a rozmer podľa toho, kde sa zobrazuje.

**5. Skripty tretích strán.** Chat, mapa, video vložené z YouTube, niekoľko meracích kódov naraz, písma z externých serverov. Každý pridá vlastné pripojenia a čas.

**6. Stará verzia PHP a zanesená databáza.** Tisíce revízií článkov, dočasné záznamy, ktoré sa nikdy nezmazali, a nastavenia starých pluginov, ktoré sa načítavajú pri každej požiadavke.

**Pri e-shope na WooCommerce** býva navyše vinníkom obnovovanie košíka cez AJAX, ktoré beží na každej stránke, aj keď je košík prázdny.

## Zrýchlenie v správnom poradí

Poradie šetrí čas, lebo každý krok ukáže, či ešte treba ďalší:

1. **Zmerajte a zapíšte si východiskové čísla** pre niekoľko typov stránok.
2. **Cache na úrovni servera alebo cache plugin.** Najväčší rozdiel v čase odpovede za najmenej práce.
3. **Obrázky:** konverzia do WebP, správne rozmery, oneskorené načítanie tých pod prvou obrazovkou. Hlavný obrázok hore naopak načítavať hneď.
4. **Pluginy:** zmazať nepoužívané, nahradiť ťažké ľahšími a obmedziť skripty len na stránky, kde sú potrebné.
5. **PHP aktuálnej verzie** a vyčistenie databázy.
6. **Skripty tretích strán** načítavať až po interakcii alebo s oneskorením. Chat nemusí byť pripravený v prvej sekunde.
7. **Znova zmerať** a porovnať s východiskom.

Ostatné technické kontroly, ktoré s rýchlosťou súvisia, sú v článku [SEO audit webu svojpomocne](/sk/blog/seo-audit-check-website/).

[CTA_FORM:audit]

## Strop, ktorý neprerazíte

Tu je nepríjemná pravda, ktorú predajcovia pluginov na zrýchlenie nepovedia. Cache a obrázky skrátia čakanie na server a zmenšia prenos. Nezmenšia však **množstvo kódu, ktoré musí prehliadač na mobile spracovať**, kým stránku ukáže a začne reagovať na ťuknutie. A toto množstvo určuje téma a page builder.

Ak po všetkých krokoch vyššie zostáva LCP na mobile nad štyri sekundy a INP v červenom, ďalšie hodiny optimalizácie prinesú desatiny sekundy. Web je pomalý svojou stavbou, nie nastavením.

## Rýchly svojou stavbou: moderný stack

Moderný web na mieru postavený napríklad na Next.js funguje opačne než WordPress s page builderom. Stránky sa vygenerujú vopred, server ich iba odovzdá a prehliadač dostane len ten kód, ktorý daná stránka naozaj potrebuje. Nie je čo cachovať, lebo nie je čo pri návšteve skladať.

Konkrétne číslo: tento web odpovedá zo servera za približne **0,09 sekundy**, bez cache pluginu a bez špeciálneho hostingu. Nie vďaka optimalizácii navyše, ale preto, že je tak postavený.

Nový web je, pravdaže, iný rozpočet než pár hodín optimalizácie. Oplatí sa, keď je rýchlosť kritická, platíte reklamu alebo zistíte, že na starom webe narážate na strop. Ceny sú v článku [koľko stojí web na Slovensku](/sk/blog/website-cost-2026/).

## Aby sa web znova nespomalil

Pomalosť sa vracia s každým novým pluginom, sliderom a meracím kódom. Pomáha jednoduché pravidlo: pred pridaním čohokoľvek zmerať, po pridaní zmerať znova. A pravidelná údržba, o ktorej píšem v článku [správa a údržba WordPress webu](/sk/blog/sprava-a-udrzba-wordpress-webu/). Ak sa web spomalí náhle a bez zjavnej príčiny, overte aj to, či nie je napadnutý: skryté skripty tiež berú výkon. Postup je v článku [napadnutý WordPress](/sk/blog/napadnuty-wordpress-web/).

## Ak potrebujete pomoc

Zrýchľujem WordPress weby aj weby na mieru: meranie, cache, obrázky, pluginy, skripty tretích strán, server. **Hodinová sadzba 35 €**, najprv zmeriam a poviem, koľko práce to bude a čo to prinesie, ešte pred zásahom. Ak je strop v téme, poviem to rovno a neúčtujem hodiny, ktoré sa nevrátia. Hosting za vás neprevádzkujem, pomôžem však vybrať taký, ktorý web nebrzdí.

Nové weby staviam na modernom stacku, rýchle svojou stavbou. Na Slovensku žijem viac ako desať rokov, spustil som **12+ webov pre slovenské firmy**, napríklad [Biliardovňa](/sk/case/biliardovna/) s online rezerváciou stolov. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Detaily na [stránke služby „Oprava webstránky a WordPress webu"](/sk/service/bugfix/). Ak neviete, čo presne web brzdí, [bezplatný audit](/sk/seo-audit/) to zmeria, výsledok do 3 pracovných dní.

[CTA_FORM:webdev]
