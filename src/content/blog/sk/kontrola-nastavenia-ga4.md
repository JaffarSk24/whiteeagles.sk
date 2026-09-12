---
title: 'Ako skontrolovať nastavenie GA4: kontroly, ktoré odhalia chyby'
description: >-
  Ako skontrolovať GA4 a Tag Manager, ktoré nastavoval niekto iný: porovnanie
  dopytov v GA4 so schránkou, vlastníctvo účtu, časové pásmo, uchovávanie
  údajov, interná návštevnosť, duplicitné udalosti, Consent Mode v2 a tabuľka
  kontrol s tým, ako vyzerá dobrý stav.
date: '2026-09-12'
key: 'ga4-audit'
faq:
  - q: 'Ako zistím, či GA4 počíta dopyty správne?'
    a: 'Porovnajte počet udalostí dopytu v GA4, zvyčajne generate_lead, s počtom dopytov, ktoré za rovnaké obdobie reálne prišli e-mailom. O niečo menej v GA4 je normálne, lebo časť ľudí cookies odmietne. Viac v GA4 než v schránke znamená duplicitu alebo počítanie kliknutí namiesto odoslaní. Nula alebo zlomok znamená prerušenú reťaz.'
  - q: 'Prečo má byť účet GA4 a Tag Managera na firme, nie na dodávateľovi?'
    a: 'Lebo údaje a nastavenia patria firme. Ak je služba vytvorená v účte agentúry, freelancera alebo bývalého zamestnanca, po skončení spolupráce môžete prísť o históriu údajov aj o kontajner so všetkými značkami. Vlastníkom má byť firemný Google účet a dodávateľ má mať iba pridelený prístup.'
  - q: 'Koľko mesiacov údajov GA4 uchováva?'
    a: 'Predvolene dva mesiace, v bezplatnej verzii sa dá nastaviť 14 mesiacov. Obmedzenie sa týka podrobných údajov v prieskumoch, štandardné prehľady ním obmedzené nie sú. Zmena platí dopredu: údaje, ktoré už boli zmazané, sa nevrátia.'
  - q: 'Ako overím, že Consent Mode v2 funguje?'
    a: 'V Tag Assistante otvorte web v režime náhľadu a pozrite stav súhlasu pri prvých udalostiach. Pred voľbou na lište majú byť úložiská zamietnuté a značky majú na súhlas čakať. Po prijatí musí prísť aktualizácia súhlasu na povolený, po odmietnutí musí stav zostať zamietnutý.'
  - q: 'Koľko stojí kontrola alebo oprava nastavenia GA4?'
    a: 'Bezplatný audit webu overí aj to, či GA4 a Tag Manager zaznamenávajú dopyty, alebo iba zobrazenia stránok, s písomným výsledkom do 3 pracovných dní. Nastavenie alebo oprava GA4 s Tag Managerom začína od 500 eur, práca sa účtuje po 25 eur za hodinu a cena je známa pred začatím.'
---
![Kontrola nastavenia GA4 | White Eagles & Co.](/assets/blog/kontrola-ga4.webp)

# Ako skontrolovať nastavenie GA4: kontroly, ktoré odhalia chyby

GA4 na webe je, Tag Manager tiež a dodávateľ tvrdí, že „všetko je nastavené". Prehľady ukazujú návštevy, zdroje aj nejaké konverzie. Či tie čísla zodpovedajú skutočnosti, sa však z pohľadu na prehľad povedať nedá. Pri kontrole cudzích nastavení nachádzam chyby oveľa častejšie než čisté nastavenie a väčšina z nich je tichá: nič nehlási problém, len sa rozhoduje podľa nesprávnych čísel.

Tento článok nadväzuje na [návod na nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/), kde je päť najčastejších chýb a rýchly test v reálnom čase. Tu ide o hlbší audit hotového nastavenia, ktoré robil niekto iný: čo skontrolovať, kde to nájsť a ako vyzerá stav, ktorým má profesionálne nastavenie GA4 prejsť. Ak nastavovanie Google Analytics máte ešte len pred sebou, začnite návodom.

[CTA_FORM:analytics]

## Kontrola, ktorá prezradí najviac: GA4 verzus schránka

Skôr než otvoríte jediné nastavenie, urobte porovnanie, pri ktorom netreba rozumieť GA4:

1. Vyberte ukončené obdobie, napríklad posledný celý mesiac.
2. V GA4 zistite počet udalostí dopytu za toto obdobie, najčastejšie `generate_lead`.
3. V e-mailovej schránke, CRM alebo tabuľke spočítajte dopyty, ktoré z webu reálne prišli za tie isté dni.

Ako čítať výsledok:

| Výsledok | Čo to znamená |
|---|---|
| GA4 o niečo menej než schránka | normálne: časť ľudí odmietne cookies alebo blokuje meranie |
| GA4 viac než schránka | udalosť sa počíta dvakrát alebo sa spúšťa po kliknutí, nie po úspešnom odoslaní |
| GA4 nula alebo zlomok | reťaz je prerušená: značka, spúšťač, súhlas alebo kľúčová udalosť |
| GA4 sedí, Google Ads ukazuje iné číslo | chyba je v prepojení alebo v počítaní konverzie v Ads |

Aký veľký rozdiel je ešte „o niečo menej", závisí od toho, koľko návštevníkov lištu odmietne. Keď však v GA4 chýba väčšina dopytov, nie je to súhlas, ale chyba. Pozor aj na dátumy: ak má služba iné časové pásmo, dopyty z neskorého večera sa presunú do iného dňa a porovnanie po dňoch nesedí.

Toto porovnanie je dôležitejšie než všetky ďalšie kontroly dokopy. Ostatné body už len hľadajú, kde presne sa rozdiel berie.

## Komu patrí účet GA4 a kontajner Tag Manager

Druhá kontrola nie je technická, ale keď sa zanedbá, je najdrahšia.

- V GA4 v časti **Správca** pozrite správu prístupu na úrovni účtu aj služby. Najvyššiu rolu má mať Google účet firmy, nie osobný účet agentúry, freelancera alebo bývalého zamestnanca.
- V Tag Manageri to isté pri účte aj kontajneri: firma má mať plné oprávnenia vrátane publikovania a správy používateľov.
- Dodávateľ má mať **pridelený prístup**, ktorý sa dá kedykoľvek odobrať.

Ak je všetko v účte dodávateľa, pri rozchode s ním môžete prísť o históriu údajov aj o kontajner so všetkými značkami. Riešte to teraz, kým je dodávateľ ochotný spolupracovať. Rovnaké pravidlo platí pre doménu a hosting: pri weboch, ktoré staviam, sú vždy registrované na klienta.

## Nastavenia služby: časové pásmo, mena, uchovávanie údajov

**Časové pásmo a mena.** V podrobnostiach služby má byť krajina Slovensko s pásmom **Europe/Bratislava** a mena **EUR**. Zlé pásmo posúva dni v prehľadoch aj pri porovnaní so schránkou, zlá mena skresľuje hodnoty konverzií a tržby. Zmena pásma platí iba dopredu.

**Uchovávanie údajov.** Predvolené sú dva mesiace, v bezplatnej verzii sa dá nastaviť **14 mesiacov**. Týka sa to podrobných údajov v prieskumoch (Explorations), štandardné prehľady to neobmedzuje. Ak zostali dva mesiace, porovnanie sezóny v prieskumoch neurobíte a staršie podrobné údaje sú už preč.

## Interná návštevnosť a nechcené odkazujúce domény

**Interná návštevnosť** má dve časti a musia byť obe. Prvá je definícia internej návštevnosti v nastaveniach značky dátového toku, zvyčajne podľa IP adresy kancelárie. Druhá je **filter údajov**, ktorý ju vylúči. Filter môže byť v stave testovania, v ktorom ešte nič nevylučuje. Častý nález: pravidlo existuje, filter je roky v testovaní. Opačná chyba: aktívny filter so zlou IP adresou, ktorý vylúči aj zákazníkov. Údaje vylúčené aktívnym filtrom sa späť nedajú obnoviť.

**Nechcené odkazujúce domény.** Keď zákazník odíde na platobnú bránu alebo externú rezervačnú službu a vráti sa, GA4 môže začať novú reláciu so zdrojom „platobná brána". Nákup alebo dopyt sa potom pripíše bráne, nie reklame, ktorá zákazníka priviedla. Tieto domény patria do zoznamu nechcených odkazov v nastaveniach značky.

Rovnako podozrivé je, keď sa medzi zdrojmi objavuje **vaša vlastná doména**. Zvyčajne to znamená, že na niektorej stránke chýba značka alebo nie je nastavené meranie naprieč doménami.

## Duplicitné zobrazenia a nespoľahlivé formulárové udalosti

Dvojité zapojenie GA4 je opísané v návode na nastavenie. Pri audite nachádzam aj jemnejšie varianty:

- **Kód vložený priamo v šablóne plus značka v Tag Manageri** s rovnakým ID merania. Stačí jeden zabudnutý riadok v hlavičke webu.
- **Zmeny histórie prehliadača.** Vylepšené meranie vie počítať zobrazenie stránky pri zmene adresy bez nového načítania. Ak k tomu Tag Manager posiela vlastné `page_view` pri tej istej zmene, každá podstránka sa zaráta dvakrát.
- **Interakcie s formulármi z vylepšeného merania.** Automatické `form_start` a `form_submit` sa riadia správaním formulára v prehliadači, nie tým, či dopyt skutočne odišiel. Pri niektorých formulároch sa nespustia vôbec, pri iných započítajú aj neúspešné pokusy. Ako kľúčová udalosť sa na ne spoliehať nedá: dopyt má byť vlastná udalosť po úspešnom odoslaní.

Overenie: v náhľade Tag Assistanta prejdite tri stránky a pri každej spočítajte `page_view`. Má byť presne jedno.

## Kľúčové udalosti a prepojenia

- Medzi **kľúčovými udalosťami** majú byť dopyty a prípadne kliknutia na telefón, nie `page_view`, `scroll` ani `form_start`. Kľúčová udalosť na zobrazení stránky vyrobí nafúknuté číslo, ktoré vyzerá ako úspech.
- V **prepojeniach produktov** má byť Google Ads, ak beží reklama, a Search Console. Bez prepojenia s Ads kampane neoptimalizujú na dopyty, bez Search Console v GA4 chýbajú vyhľadávacie dopyty.
- V Google Ads skontrolujte, že konverzia dopytu je **primárna** a počíta sa **jedna na interakciu**, nie každá. Inak jeden človek, ktorý pošle formulár dvakrát, vyzerá ako dva dopyty.

Ďalšie príčiny, prečo reklama beží a dopyty v prehľadoch nie sú, rozoberá článok [reklama beží, dopyty nechodia](/sk/blog/reklama-bezi-dopyty-nechodia/).

[CTA_FORM:audit]

## Consent Mode v2: overiť, nie veriť lište

Cookie lišta na webe ešte neznamená, že Consent Mode v2 funguje. Overuje sa v **Tag Assistante** v režime náhľadu:

1. Otvorte web a na lište nič nekliknite. Pri prvých udalostiach má byť predvolený stav súhlasu **zamietnutý** pre `ad_storage`, `analytics_storage`, `ad_user_data` a `ad_personalization`.
2. Značky GA4 a Google Ads majú na súhlas čakať: nezapisujú analytické ani reklamné cookies.
3. Kliknite na prijatie. Musí nasledovať **aktualizácia** súhlasu na povolený a meranie pokračuje.
4. Zopakujte v novom okne s odmietnutím: stav musí zostať zamietnutý.

Typické nálezy: predvolený stav chýba úplne a značky sa spúšťajú pred voľbou, lišta nastaví súhlas až po spustení značiek, alebo sa po prijatí nič neaktualizuje a údaje sa strácajú. Čo presne vyžadujú pravidlá, je v článku [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

## DebugView a prehľad vstupných stránok

**DebugView** v časti Správca ukazuje udalosti z testovacieho zariadenia v poradí, ako prišli, aj s parametrami. Pri testovacom dopyte overíte, že `generate_lead` príde raz, v správnej chvíli a s parametrami, ktoré ste čakali. Keď beží náhľad Tag Assistanta, vaše zariadenie sa v DebugView zobrazí.

**„(not set)" medzi vstupnými stránkami.** V prehľade vstupných stránok za posledný mesiac pozrite, koľko relácií má namiesto stránky „(not set)". Vzniká, keď relácia nezačína zobrazením stránky, napríklad pri zlom poradí značiek a súhlasu. Malý podiel sa objaví takmer všade, výrazný podiel znamená, že značka stránky nechodí spoľahlivo.

Ak web posiela údaje aj cez vlastný server, kontroly sú rovnaké a pribúda k nim serverový kontajner. Viac v článku [server-side GTM: kedy sa oplatí](/sk/blog/server-side-gtm-nastavenie/).

## Tabuľka kontrol

| Kontrola | Kde | Dobrý stav |
|---|---|---|
| Dopyty v GA4 verzus schránka | prehľady GA4, e-mail | GA4 o niečo menej, nikdy viac |
| Vlastníctvo | správa prístupu GA4 a GTM | vlastníkom je firemný účet, dodávateľ má prístup |
| Časové pásmo a mena | podrobnosti služby | Europe/Bratislava, EUR |
| Uchovávanie údajov | nastavenia údajov | 14 mesiacov |
| Interná návštevnosť | dátový tok, filtre údajov | definícia existuje, filter je aktívny |
| Nechcené odkazy | nastavenia značky | platobná brána a externé služby v zozname |
| `page_view` na stránku | Tag Assistant | presne jedno |
| Udalosť dopytu | Tag Manager | vlastná udalosť po úspešnom odoslaní |
| Kľúčové udalosti | Správca | iba skutočné dopyty a kontakty |
| Prepojenia | prepojenia produktov | Google Ads a Search Console |
| Consent Mode v2 | Tag Assistant | predvolene zamietnuté, po prijatí aktualizácia |
| „(not set)" a vlastná doména | vstupné stránky, zdroje | malý podiel, vlastná doména nie je zdroj |

Ak je v tabuľke viac ako dva riadky mimo dobrého stavu, čísla z GA4 by som na rozhodovanie o rozpočte zatiaľ nepoužíval.

## Ak potrebujete pomoc

Nastavujem a kontrolujem GA4 a Tag Manager: udalosti dopytov, kľúčové udalosti, Consent Mode v2, prepojenie s Google Ads a Search Console a opravu chýb, ktoré audit nájde. Profesionálne nastavenie GA4 začína od **500 €**, práca sa účtuje po **25 €** za hodinu a cenu poviem pred začatím. Nespúšťam reklamu naslepo, bez fungujúceho merania, a nepredávam licencie GA4 ani „SEO balíčky".

Na Slovensku žijem viac ako desať rokov a spustil som **12+ webov pre slovenské firmy**. Každý nový web dostáva GA4 a Tag Manager s meraním dopytov a cookie lištu s Consent Mode v2. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Detaily na [stránke služby „Profesionálne nastavenie GA4"](/sk/service/analytics/). Ak chcete najprv vedieť, či vaše GA4 zaznamenáva dopyty, alebo iba zobrazenia stránok, [bezplatný audit](/sk/seo-audit/) dá písomný výsledok do 3 pracovných dní. Prístup do Analytics a Search Console nie je povinný, ale výsledok spresní.

[CTA_FORM:ads]
