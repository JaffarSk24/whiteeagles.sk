---
title: 'Klientská zóna na webe: plugin do WordPressu alebo vlastné riešenie'
description: >-
  Čo rieši klientská zóna na webe, čo zvládne plugin do WordPressu a kde
  narazí, prečo „bez pluginu" v skutočnosti znamená písať aplikáciu a čo musí
  mať každá klientská zóna, aby boli údaje klientov v bezpečí.
date: '2026-09-12'
key: 'client-portal'
faq:
  - q: 'Čo je klientská zóna na webe?'
    a: 'Časť webu za prihlásením, kde klient vidí iba svoje údaje: stav objednávky alebo zákazky, históriu rezervácií, faktúry a dokumenty na stiahnutie, permanentku alebo individuálne ceny. Verejná časť webu je pre všetkých, zóna pre konkrétneho človeka.'
  - q: 'Stačí na klientsku zónu plugin do WordPressu?'
    a: 'Na jednoduché veci, napríklad zamknutý obsah pre členov alebo prehľad objednávok vo WooCommerce, na nejaký čas áno. Keď potrebujete vlastnú logiku, individuálne ceny alebo napojenie na účtovný systém, plugin sa začne ohýbať a každá jeho aktualizácia je riziko. Pre nový web ho neodporúčam.'
  - q: 'Dá sa klientská zóna vo WordPresse urobiť bez pluginu?'
    a: 'Dá, ale potom prihlasovanie, roly a logiku údajov píšete sami, teda staviate aplikáciu. WordPress je v tej chvíli iba ťažký obal okolo nej, ktorý treba ďalej aktualizovať. Čistejšie je postaviť zónu ako samostatnú aplikáciu na modernom stacku.'
  - q: 'Koľko stojí klientská zóna na mieru?'
    a: 'Ako súčasť nového webu na mieru je zahrnutá v odhade projektu, firemný web začína od 3 500€. Doplnenie zóny k existujúcemu webu sa účtuje hodinovo po 35€. Cena sa povie pred začatím a počas projektu sa nemení, pri väčšom portáli sa vopred povie aj termín.'
  - q: 'Čo musí klientská zóna spĺňať kvôli GDPR?'
    a: 'Technicky prístup iba k vlastným údajom overený na serveri, šifrované spojenie, hashované heslá, záznamy o prístupoch a možnosť údaje klientovi vydať alebo zmazať. Právne dokumenty, ako zásady ochrany osobných údajov alebo zmluvy, pripravuje právnik, nie vývojár.'
---
![Klientská zóna na webe | White Eagles & Co.](/assets/blog/klientska-zona.webp)

# Klientská zóna na webe: plugin do WordPressu alebo vlastné riešenie

Jeden klient píše, v akom stave je jeho objednávka, druhý chce znova poslať faktúru, tretí volá, aby preložil termín. Na každú z tých otázok odpoveď už niekde existuje, iba ju klient nevidí. Klientská zóna je miesto na webe, kde ju vidí sám, po prihlásení a iba svoju.

Nižšie je, čo takáto zóna rieši, čo zvládne plugin do WordPressu a kde narazí, prečo „bez pluginu" v skutočnosti znamená písať aplikáciu, porovnanie oboch ciest a kontrolný zoznam toho, čo musí mať každá klientská zóna bez ohľadu na to, kto ju stavia.

[CTA_FORM:webdev]

## Čo klientská zóna rieši

Zóna nie je cieľ, je to spôsob, ako ubrať opakované otázky a ručnú prácu. Najčastejšie situácie:

- **Stav objednávky alebo zákazky.** Prijaté, vo výrobe, odoslané, hotové. Klient nemusí písať a vy nemusíte odpovedať.
- **História rezervácií** s možnosťou termín zmeniť alebo zrušiť podľa pravidiel, ktoré si nastavíte.
- **Dokumenty a faktúry na stiahnutie.** Zmluvy, protokoly a faktúry za posledné roky na jednom mieste.
- **Členstvá a permanentky.** Koľko vstupov zostáva, do kedy platia, kedy predĺžiť.
- **B2B zákazníci.** Individuálne ceny pre konkrétnu firmu, história objednávok a zopakovanie objednávky jedným klikom.

Spoločné majú jedno: každý klient musí vidieť **iba svoje údaje**. Z toho vyplýva všetko ostatné, od voľby technológie po bezpečnosť.

## Cesta cez plugin do WordPressu

Ak web na WordPresse už beží, prvá myšlienka je plugin. Existujú pluginy na členstvá a na registráciu používateľov a e-shop na WooCommerce má sekciu „Môj účet" s objednávkami a adresami.

**Čo je na tom dobré, poctivo:**

- rýchly štart, základná zóna môže byť hotová za pár dní;
- nižší prvotný náklad;
- na jednoduché prípady, napríklad zamknutý obsah pre členov alebo prehľad objednávok v e-shope, to na nejaký čas stačí.

**Kde to narazí:**

- **Logika patrí pluginu, nie vám.** Zóna robí to, čo vymyslel autor pluginu. Keď potrebujete iný stav objednávky, iné pravidlo zrušenia alebo individuálne ceny, začína sa ohýbanie.
- **Osobné údaje klientov sú v tej istej databáze** ako celý web a všetky jeho pluginy. Zraniteľnosť v ktoromkoľvek z nich, aj v slideri na úvodnej stránke, je potenciálne cesta k údajom klientov. Ako to vyzerá, keď sa to stane, je v článku [napadnutý WordPress web](/sk/blog/napadnuty-wordpress-web/).
- **Verejná prihlasovacia stránka** je cieľ automatizovaného hádania hesiel. Na WordPress weby to beží neustále, lebo prihlasovacia adresa je všade rovnaká.
- **Kombinácie pluginov sa rozbíjajú pri aktualizáciách.** Plugin na členstvá, platobná brána, e-shop a téma od štyroch autorov, a každá aktualizácia môže narušiť ich spoluprácu. Pri zóne to znamená, že sa klienti neprihlásia alebo nevidia svoje objednávky. Viac v článku [správa a údržba WordPress webu](/sk/blog/sprava-a-udrzba-wordpress-webu/).
- **Stránky po prihlásení sú zvyčajne pomalé.** Cache stránok sa pri prihlásených používateľoch obvykle obchádza, takže každé zobrazenie zóny server skladá nanovo. O príčinách v článku [pomalý WordPress web](/sk/blog/pomaly-wordpress-web/).

## „Bez pluginu" znamená písať aplikáciu

Často sa hľadá, ako urobiť klientsku zónu vo WordPresse bez pluginu. Otázka je rozumná: kto raz ohýbal cudzí plugin, nechce to znova. Pozrime sa však, čo „bez pluginu" v praxi znamená. Prihlasovanie, obnovu hesla, roly, pravidlá, kto čo vidí, dátový model objednávok či rezervácií a napojenia napíšete sami.

To je aplikácia. WordPress v nej nerobí nič podstatné, iba okolo nej zostáva ako **ťažký obal**: jeho aktualizácie, jeho pluginy, jeho administrácia na verejnej adrese a jeho databáza, v ktorej budú aj údaje vašich klientov. Za údržbu toho obalu platíte ďalej, hoci vašu logiku vôbec nepotrebuje.

Ak teda logiku aj tak píšete sami, čistejšia odpoveď je **samostatná aplikácia na modernom stacku**: front end na Reacte a Next.js s TypeScriptom, back end na Pythone alebo PHP a vlastná databáza iba pre to, čo zóna potrebuje. Verejný web môže zostať rýchly a statický a zóna žije oddelene. Širšie porovnanie oboch prístupov je v článku [WordPress alebo web na mieru](/sk/blog/wordpress-vs-custom-website/).

## Cesta vlastného riešenia

Pri zóne na mieru sa začína otázkou, čo presne má klient vidieť a robiť, nie tým, čo ponúka plugin.

- **Vlastný dátový model.** Objednávky, rezervácie, dokumenty a permanentky v štruktúre, akú má váš biznis, nie akú predpokladal autor pluginu.
- **Roly.** Klient, zamestnanec, administrátor, prípadne viac osôb z jednej firmy s rôznymi právami.
- **Napojenia.** Účtovný systém, z ktorého sa berú faktúry, [platba kartou](/sk/blog/priem-oplaty-kartoy/), e-mailové notifikácie alebo upozornenia do Telegramu, keď sa niečo zmení.
- **Oddelenie od verejného webu.** Prezentačná časť nemá databázu ani administráciu na verejnej adrese, údaje klientov sú iba tam, kde sú potrebné.

Blízka logika je [online rezervácia na webe](/sk/blog/online-rezervacia-na-webe/). V [Biliardovni](/sk/case/biliardovna/) online rezervácia stolov nahradila telefonáty a v [Krása štúdio OK](/sk/case/studio-krasy/) personál potvrdí rezerváciu jedným ťuknutím v Telegrame a termín sa automaticky zablokuje. Klientská zóna je ďalší krok toho istého: klient nevidí iba voľný termín, ale aj svoju históriu.

[CTA_FORM:consult]

## Porovnanie: plugin verzus vlastné riešenie

| | Plugin do WordPressu | Vlastné riešenie |
|---|---|---|
| **Štart** | rýchly, pár dní | dlhší, termín sa povie vopred |
| **Logika** | podľa autora pluginu | podľa vášho biznisu |
| **Osobné údaje klientov** | v databáze celého webu a všetkých pluginov | vo vlastnej databáze iba pre zónu |
| **Prihlasovanie** | známa adresa, častý cieľ útokov | navrhnuté s obmedzením pokusov |
| **Aktualizácie** | kombinácia pluginov sa môže rozbiť | plánované, bez konfliktov pluginov |
| **Rýchlosť po prihlásení** | cache sa zvyčajne obchádza | navrhnutá pre prihlásených |
| **Napojenia** | podľa toho, čo plugin podporuje | účtovníctvo, platby, e-mail, Telegram |

Plugin môže na nejaký čas stačiť, ak web na WordPresse už máte, zóna má iba zamknúť obsah alebo ukázať objednávky z WooCommerce a žiadnu vlastnú logiku nepotrebujete. Keď pribudne prvé „ale u nás to funguje inak", je čas zvážiť vlastné riešenie, skôr než sa na ohýbaní pluginu nazbiera viac práce, než by stálo postaviť zónu správne.

## Čo musí mať každá klientská zóna

Bez ohľadu na to, či stojí na plugine alebo je na mieru, toto je minimum:

1. **Hashované heslá.** Nikdy uložené v čitateľnej podobe, iba ako hash pomalým algoritmom určeným na heslá.
2. **Obmedzenie pokusov o prihlásenie** proti hádaniu hesiel.
3. **Dvojfaktorové overenie** ako voliteľná možnosť.
4. **Obnova hesla cez odkaz s obmedzenou platnosťou.** Nikdy heslo poslané e-mailom.
5. **Kontrola na serveri, že používateľ vidí iba svoje údaje.** Nestačí skryté tlačidlo v rozhraní, server musí overiť každú požiadavku. Zmena čísla v adrese nesmie ukázať cudziu faktúru.
6. **HTTPS** na celom webe.
7. **Záznamy o prístupoch**, aby sa dalo dohľadať, kto sa kedy prihlásil a čo sa dialo.
8. **Export a zmazanie údajov** na žiadosť klienta, ako to vyžaduje GDPR.
9. **Najprv mobil.** Klient zónu otvorí z telefónu, keď čaká na objednávku, nie pri počítači.

## GDPR a klientská zóna

Zóna znamená, že spracúvate osobné údaje klientov a zodpovedáte za ne. Technická časť, teda prístup iba k vlastným údajom, šifrované spojenie, záznamy a možnosť údaje vydať alebo zmazať, patrí do vývoja. Pri zóne na plugine sa oplatí overiť, kde presne plugin údaje ukladá a či ich vie vydať a zmazať. Čo z GDPR platí pre malú firmu vo všeobecnosti, je v článku [GDPR pre malú firmu](/sk/blog/gdpr-dlya-maloy-firmy/).

## Koľko to stojí a ako dlho to trvá

- **Zóna ako súčasť nového webu na mieru:** firemný web začína od **3 500 €**, rozsah zóny je súčasťou odhadu.
- **Doplnenie zóny k existujúcemu webu:** hodinovo po **35 €**.
- **Termín:** priemerný web je hotový za 10 pracovných dní, väčší portál trvá dlhšie a termín sa povie vopred.

Cena sa povie pred začatím práce a počas projektu sa nemení. Širší prehľad cien je v článku [koľko stojí web na Slovensku](/sk/blog/website-cost-2026/).

## Ak potrebujete pomoc

Staviam klientske zóny na mieru: prihlasovanie a roly, stav objednávok a zákaziek, rezervácie so zmenou a zrušením, dokumenty a faktúry na stiahnutie, notifikácie e-mailom a do Telegramu a napojenia na účtovné systémy a platby. Právne dokumenty k GDPR ani zmluvy nepíšem, to je práca právnika. Moja časť je technické riešenie.

Na Slovensku žijem viac ako desať rokov a spustil som **12+ webov pre slovenské firmy**. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO. Ku každému novému webu dávam **šesť mesiacov podpory zadarmo**.

Detaily na [stránke služby „Tvorba webstránok"](/sk/service/webdev/), notifikácie a boty na [stránke služby Telegram bot](/sk/service/telegram/).

[CTA_FORM:webdev]
