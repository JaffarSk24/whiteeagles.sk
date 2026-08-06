---
title: 'Nastavenie GA4 v roku 2026: aby sa dopyty naozaj počítali'
description: >-
  Krok za krokom nastavenie Google Analytics 4 cez Tag Manager s Consent Mode v2:
  udalosti, kľúčové udalosti, prepojenie so Search Console a Ads. A päť chýb,
  pre ktoré je v prehľadoch nula konverzií, hoci dopyty chodia.
date: '2026-08-04'
faq:
  - q: 'Prečo je v GA4 nula konverzií, hoci dopyty chodia?'
    a: 'Najčastejšia príčina: udalosť ide do dataLayer, ale v Tag Manageri nie je tag, ktorý ju posiela do GA4. Druhá najčastejšia: udalosť dorazí, ale nie je označená ako kľúčová, takže v prehľade konverzií nie je. Obe sa overia za desať minút.'
  - q: 'Zapojiť GA4 priamo alebo cez Tag Manager?'
    a: 'Cez Tag Manager. Priame zapojenie vyzerá jednoduchšie, ale o mesiac budete potrebovať druhý skript, tretí, súhlas s cookies a udalosti — a všetko by ste museli riešiť v kóde webu. Hlavné pravidlo: nezapájať oboma spôsobmi naraz, inak sa všetky čísla zdvoja.'
  - q: 'Čo je Consent Mode v2 a je povinný?'
    a: 'Je to režim, v ktorom Google dostáva signál o súhlase návštevníka a do súhlasu sa správa obmedzene. Od marca 2024 bez neho Google Ads neprijíma údaje z EÚ na remarketing a modelovanie konverzií. Prakticky to znamená: bez Consent Mode v2 sa časť konverzií nezapočíta vôbec.'
  - q: 'Ako dlho GA4 uchováva údaje?'
    a: 'Predvolene dva mesiace. Mení sa to ručne v nastaveniach uchovávania údajov na 14 mesiacov — maximum bezplatnej verzie. Predvolenú hodnotu netreba nechávať: po dvoch mesiacoch sa už nedá porovnať obdobie s obdobím.'
  - q: 'Potrebuje malá firma serverový Tag Manager?'
    a: 'Zvyčajne nie. Rieši stratu údajov pre blokovače a obmedzenia prehliadačov a má zmysel tam, kde je citeľný reklamný rozpočet. Malá firma by mala najprv dosiahnuť, aby korektne fungovalo bežné meranie.'
---
![Nastavenie Google Analytics 4 v roku 2026 | White Eagles & Co.](/assets/blog/blog3.webp)

# Nastavenie GA4 v roku 2026: aby sa dopyty naozaj počítali

Analytika je takmer na každom webe. Fungujúca analytika zďaleka nie.

Rozdiel je jednoduchý. Prvá ukazuje, koľko ľudí prišlo. Druhá odpovedá na otázku, kvôli ktorej web vôbec vznikol: **koľkí z nich poslali dopyt a odkiaľ prišli.** Medzi týmito dvoma stavmi je pár nastavení, ktoré takmer nikto nedotiahne do konca.

Nižšie je poradie krokov a päť chýb, ktoré nachádzam najčastejšie, keď ma zavolajú zistiť, prečo sú prehľady prázdne.

[CTA_FORM:analytics]

## Poradie, v ktorom sa to robí

Poradie je dôležité: každý ďalší krok stojí na predchádzajúcom.

1. Google Tag Manager na webe.
2. GA4 zapojený **cez** Tag Manager, nie priamo.
3. Cookie lišta s Consent Mode v2.
4. Udalosti zodpovedajúce skutočným akciám na webe.
5. Kľúčové udalosti (konverzie).
6. Prepojenie so Search Console a Google Ads.
7. Uchovávanie údajov a filter vlastnej návštevnosti.

## Krok 1. Tag Manager, nie kód vo webe

GA4 sa dá nasadiť dvoma spôsobmi: vložiť kód priamo do webu alebo ho zapojiť cez Google Tag Manager.

Priame vloženie je rýchlejšie presne raz. Potom sa začne: treba pixel reklamy — zásah do kódu, treba udalosť odoslania formulára — zásah do kódu, treba to všetko vypnúť do udelenia súhlasu s cookies — opäť zásah do kódu. Cez Tag Manager sa to rieši v rozhraní, bez vývojára.

**Dôležité varovanie.** Najdrahšia chyba v tomto kroku je zapojiť GA4 oboma spôsobmi naraz: aj priamo, aj cez kontajner. Potom sa každé zobrazenie počíta dvakrát a všetky čísla v prehľadoch sú presne dvojnásobné.

Overí sa to ľahko. Otvorte web, pravé tlačidlo → „Zobraziť zdrojový kód stránky" a hľadajte `gtag/js?id=G-`. Ak taký riadok existuje a GA4 je zároveň v kontajneri, máte dvojité počítanie.

## Krok 2. Consent Mode v2 — skôr než udalosti

Poradie tu nie je zjavné, ale je zásadné. Consent Mode sa nastavuje **skôr** než udalosti, inak sa to neskôr celé prerába.

Čo to je. Návštevník z EÚ nemá byť do udelenia súhlasu s cookies sledovaný osobne. Consent Mode v2 je mechanizmus, ktorým web oznamuje Googlu stav súhlasu. Do súhlasu Google zbiera anonymné signály, po ňom plné údaje.

Prečo bez neho nie. Od marca 2024 Google Ads neprijíma údaje z EÚ na remarketing a modelovanie konverzií, ak signál súhlasu chýba. V praxi to vyzerá takto: reklama beží, dopyty sú, a v prehľadoch je kampaň stratová.

Druhý častý problém je opačný: lišta blokuje meranie viac, než treba, a údaje sa strácajú aj tam, kde človek súhlas dal. Podrobný rozbor je v článku [cookie lišta v roku 2026: čo vyžadujú európske pravidlá](/sk/blog/cookie-lista-2026-povinnosti/).

## Krok 3. Udalosti, ktoré zodpovedajú skutočnosti

GA4 časť udalostí zbiera sám: zobrazenia, rolovanie, kliknutia na externé odkazy. Automatické udalosti sú užitočné, ale dopyty medzi nimi nie sú.

Dopyty treba posielať sám. Malej firme zvyčajne stačia štyri:

| Udalosť | Kedy sa spustí |
|---|---|
| `generate_lead` | formulár dopytu bol úspešne odoslaný |
| `click_phone` | kliknutie na telefónne číslo |
| `click_email` | kliknutie na e-mailovú adresu |
| `click_whatsapp` | prechod do messengeru |

Kliknutia na telefón a messengery sa zvyknú podceňovať, pritom na mobile sú často hlavným spôsobom kontaktu.

**Kritické:** udalosť sa má spustiť po **úspešnom** odoslaní, nie po kliknutí na tlačidlo. Inak budú v prehľadoch dopyty, ktoré neexistovali: človek klikol, formulár vrátil chybu, e-mail neodišiel — a konverzia sa započítala.

Zvlášť varovanie. Nepoužívajte udalosť `purchase` na odoslanie formulára. Je to udalosť elektronického obchodu, ťahá so sebou tržbu a v prehľadoch sa objavia peniaze, ktoré nikto nezaplatil. Dopyt je `generate_lead`.

## Krok 4. Kľúčové udalosti — inak konverzie nebudú

Miesto, na ktorom sa potkne najviac ľudí.

Udalosť môže do GA4 chodiť bezchybne, ale kým nie je označená ako **kľúčová**, v prehľade konverzií bude nula. A v Google Ads tiež nula — teda kampaň nemá na čom optimalizovať.

Robí sa to v GA4: **Správca → Udalosti** → prepínač „Označiť ako kľúčovú udalosť" pri tej správnej.

Kontrola trvá minútu: **Prehľady → V reálnom čase**, pošlite testovací dopyt z telefónu a overte, že sa udalosť objavila.

[CTA_FORM:audit]

## Krok 5. Prepojenia, ktoré dajú viac než samotná analytika

Tri prepojenia, ktoré sa robia raz a menia kvalitu údajov:

**Search Console.** V GA4 pribudne prehľad vyhľadávacích dopytov — je vidieť, na aké slová ľudia prichádzajú a čo robia ďalej.

**Google Ads.** Konverzie z GA4 sa posielajú do kampaní a algoritmus začne optimalizovať na dopyty, nie na kliknutia. Bez toho reklama míňa rozpočet na najlacnejšie kliky. Viac v článku [Google Ads pre malé firmy](/sk/blog/google-ads-small-business/) a na [stránke služby „Nastavenie reklamy"](/sk/service/ads/).

**Microsoft Clarity.** Bezplatná služba nahrávok relácií a teplotných máp. Odpovedá na otázku „prečo", keď GA4 už ukázal „čo": napríklad že všetci odchádzajú z formulára na treťom poli.

## Krok 6. Nastavenia, na ktoré sa zabúda

**Uchovávanie údajov.** Predvolene GA4 uchováva podrobné údaje dva mesiace. Mení sa to v **Správca → Uchovávanie údajov** na 14 mesiacov — maximum bezplatnej verzie. Inak sa po dvoch mesiacoch nedá porovnať obdobie s obdobím.

**Filter vlastnej návštevnosti.** Vaše vlastné návštevy a návštevy dodávateľa idú do štatistiky a pri malých objemoch ju skresľujú. Nastavuje sa v dátovom toku, v sekcii internej návštevnosti.

**Časové pásmo prehľadov.** Musí zodpovedať skutočnému, inak sa údaje po dňoch posúvajú.

## Päť chýb, ktoré nachádzam najčastejšie

Nie je to teória, ale to, čo sa reálne nájde pri kontrole cudzích nastavení:

1. **Udalosti idú do `dataLayer`, ale v kontajneri nie je tag**, ktorý ich posiela do GA4. Dopyty v prehľadoch nie sú vôbec — pritom je technicky všetko „nastavené".
2. **GA4 je zapojený dvakrát** — priamo aj cez kontajner. Všetky čísla sú dvojnásobné.
3. **Kľúčová udalosť nie je označená.** Dopyty chodia, v konverziách nula.
4. **`purchase` namiesto `generate_lead`.** V prehľadoch svieti neexistujúca tržba.
5. **Cookie lišta blokuje meranie aj po súhlase.** Údaje sa strácajú potichu.

Spoločné pre všetkých päť: web pritom funguje, dopyty chodia a nikto nič netuší — kým nepríde čas vyhodnotiť, či sa reklama vracia.

## Ako overiť, že to funguje

Tri kontroly, pätnásť minút:

1. Otvorte web v anonymnom okne, prijmite cookies, odošlite dopyt.
2. GA4 → **V reálnom čase** → udalosť `generate_lead` sa musí objaviť.
3. O deň neskôr: **Prehľady → Interakcia → Konverzie** → udalosť má byť v zozname.

Ak je v ktoromkoľvek kroku prázdno, reťaz je niekde prerušená a treba ju prejsť odzadu.

## Ak je jednoduchšie, aby to nastavil niekto iný

Nastavím GA4, Tag Manager a Consent Mode tak, aby čísla zodpovedali skutočnosti, a ukážem, odkiaľ dopyty naozaj prichádzajú. Detaily na [stránke služby „Webová analytika"](/sk/service/analytics/).

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

K téme: [SEO audit webu svojpomocne](/sk/blog/seo-audit-check-website/) a [prečo je cookie lišta povinná](/sk/blog/cookie-lista-2026-povinnosti/).

[CTA_FORM:cookies]
