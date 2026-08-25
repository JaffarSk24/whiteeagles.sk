---
title: 'Oprava WordPress stránky: čo si opravíte sami a kedy volať človeka'
description: >-
  Web na WordPresse spadol, spomalil alebo hlási chybu. Postup od najlacnejšej
  kontroly po najdrahšiu, čo robiť pri bielej stránke a napadnutí, a koľko
  oprava stojí na Slovensku.
date: '2026-08-25'
key: 'wordpress-repair'
faq:
  - q: 'Koľko stojí oprava WordPress stránky?'
    a: 'Hodinová sadzba je 25 eur. Drobnosť ako nefunkčný formulár alebo chyba po aktualizácii býva hotová za hodinu až dve. Odstránenie napadnutia je dlhšie, lebo okrem opravy treba nájsť vstupný bod, inak sa to zopakuje.'
  - q: 'Web hlási bielu stránku a nič iné. Čo teraz?'
    a: 'Biela obrazovka je fatálna chyba PHP so skrytým výpisom. Najčastejšie ju spôsobí posledný plugin alebo aktualizácia. Ak máte prístup na FTP, premenujte priečinok posledného pluginu - web sa zvyčajne vráti a viete, kto za to môže.'
  - q: 'Ako spoznám, že web napadli?'
    a: 'Presmerovanie na cudziu stránku, neznáme používatelia s právami správcu, súbory so zvláštnymi názvami v koreni, varovanie v prehliadači alebo správa v Search Console. Samotné spomalenie napadnutie neznamená.'
  - q: 'Oplatí sa opravovať, alebo radšej spraviť nový web?'
    a: 'Ak je problém jednorazový, oprava je násobne lacnejšia. Ak sa poruchy opakujú každý mesiac, šablóna narazila na strop a peniaze idú do udržiavania niečoho, čo aj tak treba prerobiť.'
  - q: 'Ako dlho oprava trvá?'
    a: 'Bežnú poruchu viem diagnostikovať v ten istý deň. Odstránenie napadnutia a vyčistenie zaberie dlhšie, pretože po oprave treba zavrieť dieru a skontrolovať, či nezostali zadné vrátka.'
---
![Oprava WordPress stránky | White Eagles & Co.](/assets/blog/wordpress-bugfix.webp)

# Oprava WordPress stránky: čo si opravíte sami a kedy volať človeka

Web na WordPresse sa nepokazí sám od seba. Pokazí ho aktualizácia, plugin, ktorý sa pohádal s iným pluginom, vypršaný certifikát alebo niekto, kto našiel neaktualizovanú dieru skôr než vy.

Nižšie postup od najlacnejšieho kroku po najdrahší. Prvé tri kontroly stoja nula eur a pokrývajú väčšinu prípadov.

[CTA_FORM:bugfix]

## Najprv zistite, čo presne je pokazené

„Web nefunguje" znamená päť rôznych vecí a každá má iné riešenie. Otvorte stránku a pozrite sa, čo vidíte.

| Čo vidíte | Čo to zvyčajne je |
|---|---|
| Úplne biela stránka | fatálna chyba PHP, najčastejšie plugin alebo téma |
| „Error establishing a database connection" | web sa nedostane k databáze |
| Chyba 500 | chyba na serveri, často `.htaccess` alebo limit pamäte |
| Chyba 403 | práva k súborom alebo bezpečnostný plugin |
| Web sa načíta, ale rozpadnutý | nenačítalo sa CSS - často zmiešané http/https |
| Presmeruje inam | takmer vždy napadnutie |
| Načítava sa pomaly | obrázky, pluginy alebo hosting |

Prvé, čo urobte v každom prípade: **otvorte web v anonymnom okne a na mobilných dátach.** Prekvapivo často je „pokazený web" iba stará verzia v cache prehliadača alebo výpadok vášho poskytovateľa.

## Tri bezplatné kontroly, ktoré urobte pred volaním komukoľvek

**1. Vypršal certifikát?** Ak prehliadač píše „Nezabezpečené", certifikát prestal platiť. Let's Encrypt sa obnovuje sám, ale keď obnova zlyhá, web vyzerá pre návštevníka podozrivo. Klikom na zámok v adresnom riadku uvidíte dátum platnosti.

**2. Beží hosting?** Skúste otvoriť administráciu hostingu. Ak nejde ani tá, problém nie je vo vašom webe.

**3. Zapnite výpis chýb.** Toto je jediný krok, ktorý naozaj povie, čo sa deje. V súbore `wp-config.php` nájdite riadok s `WP_DEBUG` a nastavte:

```php
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);
```

Chyby sa začnú zapisovať do `wp-content/debug.log`. Posledné riadky obvykle menujú vinníka - konkrétny súbor konkrétneho pluginu. **Po oprave to vypnite**, inak log rastie a môže prezradiť cesty na serveri.

## Biela stránka: čo robiť

Najčastejší a najstrašidelnejší prípad. Pravdepodobne za to môže posledná zmena.

**Ak sa dostanete do administrácie**, vypnite pluginy jeden po druhom, začnite od posledného inštalovaného alebo aktualizovaného. Keď sa web vráti, máte vinníka.

**Ak sa do administrácie nedostanete**, potrebujete FTP alebo správcu súborov v hostingu. Premenujte priečinok `wp-content/plugins` napríklad na `plugins-off`. WordPress vypne všetky pluginy naraz a web sa zvyčajne vráti. Potom priečinok premenujte späť a vypínajte jednotlivé pluginy vnútri, kým nenájdete ten pravý.

Rovnaká logika platí pre tému: premenujte jej priečinok a WordPress prepne na predvolenú.

## Keď web presmeruje inam alebo Google varuje

Toto už nie je porucha, toto je napadnutie, a platí tu jedno pravidlo: **samotné vyčistenie nestačí.**

Ak vyčistíte súbory a nezavriete dieru, ktorou sa dnu dostali, o týždeň ste na začiatku. Mechanika býva vždy rovnaká - v populárnom plugine sa nájde zraniteľnosť, autor vydá aktualizáciu, a boti obchádzajú internet a hľadajú tých, ktorí neaktualizovali.

Čo si overte hneď:

- **Používatelia v administrácii.** Neznámy účet s právami správcu je jednoznačný signál.
- **Súbory v koreni webu.** Náhodné názvy typu `wp-c0nfig.php` alebo `radio.php` tam nepatria.
- **Naplánované úlohy** v cron - škodlivý kód sa cez ne obnovuje.
- **Search Console**, sekcia Bezpečnostné problémy.

Prvý krok pri podozrení: **zmeňte heslá** - administrácia, FTP, databáza, hosting. Až potom čistenie.

[CTA_FORM:audit]

## Pomalý web nie je porucha, ale stojí peniaze

Rýchlosť Google započítava do pozícií a hodnotí podľa mobilnej verzie. Ak zároveň platíte reklamu, pomalá stránka sa platí dvakrát - raz nižšou konverziou, raz vyššou cenou kliknutia cez skóre kvality.

Otvorte **PageSpeed Insights**, záložku **Mobil**, nie Počítač. Dve najčastejšie príčiny sú vždy rovnaké:

**Ťažké obrázky.** Fotografia priamo z telefónu má niekoľko megabajtov. Na webe má vážiť desiatky kilobajtov a byť vo formáte WebP.

**Priveľa pluginov.** Každý ťahá vlastné skripty a štýly na každú stránku, aj tam, kde sa nepoužíva. Pätnásť pluginov namiesto troch je najbežnejšia príčina pomalého WordPressu - a nie je to vina samotného WordPressu, ako rozoberám v článku [WordPress alebo web na mieru](/sk/blog/wordpress-vs-custom-website/).

Zvyšok kontrol je v [SEO audite svojpomocne](/sk/blog/seo-audit-check-website/).

## Formulár, ktorý sa tvári, že odoslal

Osobitný prípad, ktorý nikdy nenájdete v žiadnom logu, lebo technicky nič nespadlo.

Formulár ukáže „ďakujeme", ale e-mail nikam nepríde. Po migrácii sa rozbil odosielací skript, zmenilo sa heslo k schránke, alebo správy padajú do spamu, pretože doména nemá nastavené SPF, DKIM a DMARC.

**Otestujte to raz za mesiac skutočným odoslaním** z mobilu v anonymnom okne. Majiteľ sa o takejto poruche dozvedá posledný - a medzitým prichádza o dopyty, ktoré si ani nevšimne. Podrobne v článku [reklama beží, dopyty nechodia](/sk/blog/reklama-bezi-dopyty-nechodia/).

## Čo robiť, aby sa to neopakovalo

Pravidelná údržba nie je voliteľná služba, ale súčasť nákladov na vlastníctvo webu na WordPresse.

1. **Zálohy, ktoré sa naozaj robia.** A aspoň raz vyskúšané obnovenie - záloha, ktorá sa nedá obnoviť, je len pocit istoty.
2. **Aktualizácie raz mesačne**, nie raz ročne. Hromadné napadnutia idú takmer vždy cez diery, na ktoré aktualizácia už dávno existuje.
3. **Menej pluginov.** Každý je cudzí kód s vlastnou históriou zraniteľností.
4. **Testovacia kópia** pri väčšej zmene.
5. **Doména a hosting vedené na vás**, nie na dodávateľa - inak pri poruche nemáte kam siahnuť. Prečo na tom záleží: [doména .sk](/sk/blog/domen-sk-kak-kupit/).

## Kedy sa oprava neoplatí

Poviem to na rovinu, lebo to šetrí peniaze. Ak sa poruchy opakujú každý mesiac, plugin skoro vyhovuje ale nie celkom, úprava témy zmizne pri každej aktualizácii a nikto sa neodváži nič aktualizovať - opravujete niečo, čo aj tak treba prerobiť.

Vtedy je lacnejšie postaviť nanovo než ďalej platiť za udržiavanie. Reálne ceny sú v článku [koľko stojí web](/sk/blog/website-cost-2026/).

## Ak potrebujete pomoc

Opravujem weby na WordPresse aj na vlastnom kóde: chyby po aktualizácii, biela stránka, odstránenie škodlivého kódu, zrýchlenie, nefunkčné formuláre. **Hodinová sadzba 25 €**, bežnú poruchu viem diagnostikovať v ten istý deň.

Na Slovensku žijem viac ako desať rokov, spustil som **12+ webov pre slovenské firmy**. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO, ktorú si dáte do nákladov.

Detaily na [stránke služby „Oprava chýb a úpravy"](/sk/service/bugfix/). Ak neviete, čo presne je s webom - [bezplatný audit](/sk/seo-audit/), výsledok do 3 pracovných dní.

[CTA_FORM:consult]
