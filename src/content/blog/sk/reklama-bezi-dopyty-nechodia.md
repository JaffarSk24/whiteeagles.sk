---
title: 'Reklama beží, dopyty nechodia: 7 príčin a ako každú overiť'
description: >-
  Rozpočet sa míňa, kliknutia sú, dopyty nie. Rozbor siedmich príčin po poradí —
  od nerelevantných dopytov a nezapočítaných konverzií po cieľovú stránku a
  formulár, ktorý ticho neposiela e-maily. S kontrolou ku každej.
date: '2026-08-04'
key: 'ads-no-leads'
faq:
  - q: 'Reklama beží mesiac, dopytov nula. Je to normálne?'
    a: 'Nie. Za mesiac by pri rozumnom rozpočte mali prísť aspoň jednotlivé kontakty. Nula takmer vždy znamená jedno z dvoch: prichádzajú nesprávni ľudia, alebo dopyty chodia, ale nedorazia a nepočítajú sa.'
  - q: 'Ako zistiť, či sa dopyty strácajú, alebo neexistujú?'
    a: 'Poslať testovací dopyt z telefónu v anonymnom okne a overiť tri veci: či prišiel e-mail, či sa objavila udalosť v GA4 v reálnom čase, či je záznam v CRM alebo chate. Prerušenie v ktoromkoľvek článku je odpoveď.'
  - q: 'Prečo Google privádza nerelevantné dopyty?'
    a: 'Pre voľnú zhodu bez vylučujúcich slov. Google si dopyt vykladá voľne a na reklamu „tvorba webstránok" prídu tí, čo hľadajú kurzy, prácu alebo šablónu zadarmo. Vidno to v prehľade vyhľadávacích dopytov.'
  - q: 'Môže byť na vine cieľová stránka?'
    a: 'Áno, a je to jedna z najčastejších príčin. Reklama na úvodnú stránku namiesto stránky konkrétnej služby, pomalé načítanie na mobile alebo chýbajúca cena — človek klikol, vy ste zaplatili, on odišiel.'
  - q: 'Mám reklamu počas hľadania príčiny vypnúť?'
    a: 'Ak je príčina v meraní alebo formulári, tak áno — inak platíte za dopyty, ktoré neuvidíte. Ak sú to nerelevantné dopyty, netreba vypínať, stačí zúžiť zhodu a pridať vylučujúce slová.'
---
![Reklama beží, dopyty nechodia | White Eagles & Co.](/assets/blog/0-orders.webp)

# Reklama beží, dopyty nechodia: 7 príčin a ako každú overiť

Známa situácia: rozpočet sa míňa, v prehľade sú kliknutia, v pošte ticho. Skôr než kampaň vypnete alebo zmeníte dodávateľa, oplatí sa zistiť, v ktorom kroku sa reťaz trhá.

A krokov je len pár: **človek videl reklamu → klikol → prišiel na stránku → poslal dopyt → ten dorazil a započítal sa.** Nižšie je sedem príčin v poradí týchto krokov, ku každej kontrola.

[CTA_FORM:ads]

## 1. Prichádzajú nesprávni ľudia

Najčastejšia príčina a najrýchlejšia na overenie.

**Ako overiť.** Google Ads → **Kampane → Štatistiky → Vyhľadávacie dopyty**. Nie sú to vaše kľúčové slová, ale skutočné frázy, na ktoré sa reklamy zobrazovali. Prejdite prvých päťdesiat.

Čo sa zvyčajne nájde: `práca`, `kurz`, `zadarmo`, `ako urobiť sám`, `šablóna` — ľudia, ktorí hľadajú prácu, štúdium alebo spôsob, ako si to spraviť sami. Kliknú, vy zaplatíte, dopyt nepríde nikdy.

**Príčina.** Voľná zhoda bez zoznamu vylučujúcich slov. Google si dopyt vykladá voľne a privádza príbuzné publikum.

**Čo s tým.** Zúžiť typy zhody na frázovú a presnú, pridať vylučujúce slová. Základná sada pre Slovensko a rozbor sú v článku [Google Ads: ako neminúť rozpočet nazmar](/sk/blog/google-ads-small-business/).

## 2. Dopyty chodia, ale nepočítajú sa

Druhá najčastejšia — a najmrzutejšia, lebo obchod beží a vy to nevidíte.

**Ako overiť.** Otvorte web v anonymnom okne, pošlite testovací dopyt z telefónu. Potom GA4 → **Prehľady → V reálnom čase** — udalosť sa má objaviť do minúty.

Čo sa zvyčajne nájde:

- udalosť ide do `dataLayer`, ale v Tag Manageri nie je tag, ktorý ju posiela do GA4;
- udalosť dorazí, ale nie je označená ako **kľúčová**, takže v konverziách je nula;
- konverzie nie sú prepojené s účtom Google Ads.

Posledný bod bolí dvakrát: nevidíte výsledok **a** algoritmus nemá na čom optimalizovať, tak šetrí rozpočet na najlacnejších kliknutiach, ktoré nikam nevedú.

Rozbor krok za krokom — [nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/), samotná služba — [webová analytika](/sk/service/analytics/).

## 3. Formulár sa tvári, že odoslal

Samostatný prípad, ktorý sa v reklamnom rozhraní nedá nájsť vôbec.

**Ako overiť.** Ten istý testovací dopyt — ale teraz sledujte poštu. Prišiel e-mail? Nie je v spame?

Čo sa zvyčajne nájde: formulár ukáže „ďakujeme", ale e-mail neodíde — po presune sa pokazil poštový skript, zmenilo sa heslo k schránke, správy padajú príjemcovi do spamu.

Skontrolujte aj schránku, kam to všetko chodí: ak je adresa na bezplatnej doméne a bez nastavených záznamov, časť správ sa do doručenej pošty nedostane. To je aj jeden z dôvodov, prečo sa oplatí mať [poštu na vlastnej doméne](/sk/blog/domen-sk-kak-kupit/).

## 4. Nie je nastavený Consent Mode

Príčina, pre ktorú sa vypína reklama, ktorá v skutočnosti fungovala.

Od marca 2024 Google neprijíma údaje z EHP na remarketing a modelovanie konverzií, ak web neoznamuje stav súhlasu s cookies. Časť konverzií sa jednoducho nezapočíta.

**Ako overiť.** Otvorte web, prijmite cookies, pošlite dopyt. Ak je v GA4 udalosť vidieť, ale v Google Ads sa konverzia do dňa neobjaví, takmer isto je to tu.

Rozbor — [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

[CTA_FORM:cookies]

## 5. Reklama vedie inam

Človek hľadal `oprava wordpress webstránky` a pristál na úvodnej stránke so všetkými šiestimi službami. Musí hľadať ešte raz — teraz vnútri vášho webu. Časť odíde.

**Ako overiť.** Prejdite cestu sami: kliknite na vlastnú reklamu a pozrite, či stránka odpovedá na otázku, ktorá bola v dopyte. Nie „či sa to tam niekde spomína", ale konkrétne **prvá obrazovka**.

**Čo s tým.** Každá kampaň vedie na stránku svojej služby. Ak taká stránka neexistuje, treba ju spraviť: je to lacnejšie než platiť za odchádzajúcich.

## 6. Stránka je pomalá alebo nepohodlná na telefóne

Viac než polovica kliknutí príde z mobilu. Ak sa stránka načítava 5 sekúnd, zaplatili ste kliknutie človeka, ktorý ju neuvidel.

**Ako overiť.** PageSpeed Insights, karta **„Mobil"** — nie „Počítač". LCP do 2,5 sekundy.

Osobitne sa pozrite na formulár očami človeka s telefónom v ruke: koľko polí, treba rolovať, neprekrýva ho cookie lišta?

Tu je aj druhá, menej zjavná stránka veci: **rýchlosť stránky ovplyvňuje cenu kliknutia** cez skóre kvality. Pomalý web platíte dvakrát.

Ako overiť zvyšok — [SEO audit svojpomocne](/sk/blog/seo-audit-check-website/).

## 7. Chýba dôvod vybrať si vás

Technicky všetko funguje, ľudia sú relevantní, stránka rýchla — a dopyty nie sú. Potom ide o ponuku.

Pozrite sa na svoju stránku očami toho, kto predtým otvoril tri stránky konkurencie. Je tam:

- **cena alebo aspoň rozpätie** — jej absencia odradí viac ľudí než vysoké číslo;
- **termíny** — konkrétne, nie „v čo najkratšom čase";
- **dôkaz** — reálne projekty s menami, nie „viac než 100 spokojných klientov";
- **povinné údaje** — IČO a sídlo, ktoré slovenský kupujúci pred platbou overuje ([čo treba](/sk/blog/obyazatelnye-rekvizity-sajta/));
- **jednoduchý ďalší krok** — formulár na tri polia, nie dotazník.

Na čo sa slovenský zákazník pozerá, je rozobrané samostatne: [ako si Slováci vyberajú dodávateľa](/sk/blog/kak-slovaki-vybirayut-podryadchika/).

## Poradie kontroly

Nie podľa dôležitosti, ale podľa rýchlosti — najprv to, čo sa zistí za minúty:

| # | Kontrola | Čas |
|---|---|---|
| 1 | Testovací dopyt: e-mail + udalosť v GA4 | 5 min |
| 2 | Prehľad vyhľadávacích dopytov | 15 min |
| 3 | Je označená kľúčová udalosť, je Ads prepojený s GA4 | 10 min |
| 4 | Rýchlosť stránky na mobile | 5 min |
| 5 | Kam vedú reklamy | 10 min |
| 6 | Je tam cena, termíny, dôkazy | — |

Prvé štyri body pokryjú väčšinu prípadov a zaberú menej než hodinu.

## Ak je jednoduchšie, aby sa pozrel niekto iný

Prejdem kampane aj web, nájdem, kde sa reťaz trhá, a poviem, čo opraviť ako prvé. Často sa ukáže, že reklama bola v poriadku a nepočítali sa dopyty — a vypínať ju bola chyba.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

Detaily — [nastavenie reklamy](/sk/service/ads/) a [webová analytika](/sk/service/analytics/). Ak web máte, ale neviete, čo s ním — [bezplatný audit](/sk/seo-audit/), výsledok do 3 pracovných dní.

[CTA_FORM:audit]
