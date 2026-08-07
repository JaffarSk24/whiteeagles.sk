---
title: 'SEO audit webu svojpomocne: 9 kontrol, ktoré nájdu skutočné problémy'
description: >-
  Ako si za hodinu skontrolovať web sám a nájsť to, čo mu naozaj bráni privádzať
  klientov na Slovensku: indexácia, duplicitné adresy, meranie dopytov, rýchlosť,
  povinné údaje. S konkrétnymi príkazmi a bezplatnými nástrojmi.
date: '2026-08-04'
key: 'seo-audit'
faq:
  - q: 'Ako dlho trvá základný SEO audit svojpomocne?'
    a: 'Asi hodinu, ak idete po zozname a nezabŕdate do detailov. Prvé štyri kontroly — indexácia, duplicitné adresy, meranie dopytov a rýchlosť — zaberú dvadsať minút a nájdu väčšinu vážnych problémov.'
  - q: 'Aké nástroje treba a koľko stoja?'
    a: 'Všetko uvedené sa dá spraviť bezplatnými nástrojmi: Google Search Console, PageSpeed Insights, bežný prehliadač a anonymné okno. Platené služby prídu na rad neskôr, keď sú základné chyby odstránené.'
  - q: 'Čo kontrolovať ako prvé?'
    a: 'Indexáciu a duplicitné adresy. Ak Google stránky nevidí alebo vidí štyri kópie webu, všetko ostatné — texty, odkazy, rýchlosť — pracuje naprázdno.'
  - q: 'Web v Googli mám, ale dopyty nechodia. Čo to znamená?'
    a: 'Najčastejšie jedno z troch: stránky sa zobrazujú na nerelevantné dopyty, útržok vo výsledkoch nedáva dôvod kliknúť, alebo dopyty naozaj chodia, len sa nemerajú. Všetky tri sa overia za pol hodiny.'
  - q: 'Má zmysel audit, keď má web menej ako rok?'
    a: 'Práve vtedy áno. Chyby prvého roka — zlé presmerovania, duplicity, chýbajúce meranie — sa nabaľujú a čím neskôr sa nájdu, tým dlhšie trvá dostať sa z nich von.'
---
![SEO audit webu svojpomocne | White Eagles & Co.](/assets/blog/blog5.webp)

# SEO audit webu svojpomocne: 9 kontrol, ktoré nájdu skutočné problémy

Väčšina návodov na vlastný audit hovorí o dĺžke Title a hustote kľúčových slov. Nie to je dôvod, prečo weby na Slovensku neprivádzajú klientov.

Nižšie je deväť kontrol v poradí, v akom ich má zmysel robiť. Všetky sú bezplatné a spolu zaberú asi hodinu. Poradie nie je náhodné: ak zlyhá prvá, ostatné nemajú význam.

[CTA_FORM:audit]

## 1. Vidí Google vaše stránky vôbec?

Otvorte Google a zadajte:

```
site:vasadomena.sk
```

Spočítajte, koľko stránok ukázal, a porovnajte s tým, koľko ich naozaj máte.

**Ak je ich citeľne menej** — časť webu Google nevidí. Dôvody bývajú rôzne: zakázané v `robots.txt`, nastavené `noindex`, na stránku nevedie ani jeden interný odkaz, alebo je web celý postavený na JavaScripte a bez neho je stránka prázdna.

**Ak je ich citeľne viac** — máte duplicity. To je samostatný problém, vrátime sa k nemu v bode 3.

Ďalej Search Console, sekcia **Indexovanie → Stránky**. Nepozerajte na celkové číslo, ale na dôvody v zozname „Neindexované". Dve najčastejšie a najškodlivejšie diagnózy:

- **„Prehľadané, ale zatiaľ neindexované"** — Google prišiel a rozhodol, že stránka nestojí za miesto v indexe. Zvyčajne je za tým tenký text alebo duplicita inej stránky.
- **„Nájdené, zatiaľ neprehľadané"** — Google adresu pozná, ale nedostal sa k nej. Znak, že sa rozpočet na prehľadávanie míňa inde, napríklad na servisné súbory.

## 2. Čo sa deje na adrese vašej domény

Kontrola na tridsať sekúnd, ktorá nájde tie najdrahšie poruchy. Otvorte postupne štyri adresy:

- `http://vasadomena.sk`
- `http://www.vasadomena.sk`
- `https://vasadomena.sk`
- `https://www.vasadomena.sk`

Všetky tri prvé musia **presmerovať** na štvrtú (alebo na tú, ktorú považujete za hlavnú). Nie ukázať kópiu webu, ale presmerovať.

Ak každá adresa otvára web samostatne, sú to pre Google štyri rôzne weby s rovnakým obsahom. Váha odkazov a signály správania sa delia na štyri a žiadna kópia nenazbiera dosť, aby konkurovala.

Presne sa to overí v termináli:

```bash
curl -sI http://www.vasadomena.sk | head -3
```

V odpovedi má byť `301` a riadok `location:` so správnou adresou.

## 3. Duplicity vnútri webu

Tri časté zdroje, ktoré má takmer každý:

**S lomkou a bez.** `/service/webdev` a `/service/webdev/` musia viesť na jednu adresu cez 301, nie vracať rovnakú stránku dvakrát.

**S parametrami.** Adresy typu `?utm_source=...` alebo `?page=1` sa nemajú dostať do indexu ako samostatné stránky. Overí sa tým istým `site:`.

**Jazykové verzie bez značkovania.** Ak je web vo viacerých jazykoch, verzie musia byť prepojené značkovaním `hreflang`. Bez neho ich Google považuje za duplicity a vyberie jednu — často nie tú správnu.

Či značkovanie je, sa dá pozrieť priamo v prehliadači: pravé tlačidlo → „Zobraziť zdrojový kód stránky" → hľadať slovo `hreflang`.

## 4. Merajú sa dopyty vôbec?

Nie je to SEO v úzkom zmysle, ale práve tu sa najčastejšie stráca zmysel celej práce.

Otvorte web v anonymnom okne, vyplňte formulár a odošlite ho. Potom choďte do Google Analytics 4 → **Prehľady → V reálnom čase** a pozrite, či sa objavila udalosť odoslania.

Čo sa zvyčajne nájde:

- udalosti idú do `dataLayer`, ale v Tag Manageri nie je tag, ktorý ich posiela do GA4 — dopyty v prehľadoch nie sú vôbec;
- udalosť existuje, ale nie je označená ako kľúčová, takže v konverziách je nula;
- GA4 je zapojený dvakrát — priamo aj cez Tag Manager — a všetky čísla sú zdvojené;
- cookie lišta blokuje meranie aj po udelení súhlasu.

Kým toto nefunguje, akýkoľvek rozhovor o výkonnosti webu je bezpredmetný. Podrobný rozbor je v článku [ako správne nastaviť GA4](/sk/blog/nastavenie-google-analytics-4/).

[CTA_FORM:analytics]

## 5. Rýchlosť — ale pozerať treba mobilnú

Otvorte **PageSpeed Insights** a skontrolujte úvodnú stránku a jednu stránku služby. Dôležité: pozerajte kartu **„Mobil"**, nie „Počítač". Viac než polovica návštevníkov príde z telefónu a Google web hodnotí podľa mobilnej verzie.

Tri ukazovatele, na ktorých záleží:

| Ukazovateľ | Čo znamená | Norma |
|---|---|---|
| **LCP** | kedy sa objaví hlavný obsah | do 2,5 s |
| **INP** | ako rýchlo web reaguje na ťuknutie | do 200 ms |
| **CLS** | či pri načítaní neposkakuje rozloženie | do 0,1 |

Ak sú ukazovatele v červenom, najčastejšou príčinou sú ťažké obrázky. Overte si to: fotky na webe majú byť vo formáte WebP a vážiť desiatky kilobajtov, nie jednotky megabajtov. Druhou najčastejšou príčinou je desiatka pluginov v šablóne.

## 6. Útržok vo výsledkoch: čo vidí človek

Zadajte `site:vasadomena.sk` a pozrite sa na výsledok očami človeka, ktorý vás nepozná.

- **Title** — jedinečný pri každej stránke, do 60 znakov, začína podstatou, nie názvom firmy.
- **Description** — do 160 znakov, vysvetľuje, čo človek dostane. Ak chýba, Google si vezme náhodný kus textu.
- **Adresa** — čitateľná.

Osobitne skontrolujte úvodnú stránku. Prázdny alebo nezmyselný útržok pri úvodnej stránke je typická príčina situácie „zobrazení veľa, kliknutí žiadne".

## 7. Nadpisy a štruktúra

Pravidlo je jednoduché: **jeden H1 na stránku**, ďalej H2 a H3 podľa logiky textu.

Častá chyba v šablónach je H1 v hlavičke na každej stránke (zvyčajne logo) — a potom všetky stránky webu hlásia rovnaký hlavný nadpis.

Overí sa v konzole prehliadača:

```js
document.querySelectorAll('h1').length
```

Odpoveď má byť `1`.

## 8. Povinné údaje a cookie lišta

Toto je slovenské špecifikum a šablónové weby ho takmer vždy vynechajú.

Na webe slovenskej firmy musí byť názov, sídlo, IČO, DIČ a údaj o zápise v registri. Nie je to len požiadavka zákona — je to prvé, čo slovenský kupujúci pred platbou overuje. Úplný zoznam je v článku [povinné údaje na webe](/sk/blog/obyazatelnye-rekvizity-sajta/).

Cookie lišta je povinná, ak je na webe analytika alebo reklama, a musí fungovať s Consent Mode v2. Lišta, ktorá len oznamuje „používame cookies", požiadavkám nevyhovuje — rozbor je v článku [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

## 9. Kto už obsadzuje vaše dopyty

Posledný krok je pozrieť sa, s kým súťažíte.

Vezmite tri-štyri dopyty, na ktorých vás majú nájsť, a zadajte ich do Googlu v anonymnom okne s lokalitou „Slovensko". Pozrite si prvú desiatku: sú to miestne firmy alebo zahraničné štúdiá? Čo majú na stránke, čo vy nemáte?

Často sa ukáže, že prvú stranu obsadzujú nie konkurenti, ale katalógy a agregátory. To je dobrá správa: obísť katalóg obsažnou stránkou je jednoduchšie než silného priameho konkurenta.

## Čo s výsledkami

Poradie opráv sa nezhoduje s poradím kontrol. Najprv to, čo blokuje všetko ostatné:

1. **Duplicitné adresy a indexácia** — bez toho sa ostatné nepočíta.
2. **Meranie dopytov** — inak sa nedozviete, či niečo pomohlo.
3. **Povinné údaje a cookie lišta** — je to aj právne riziko.
4. **Rýchlosť na mobile**.
5. **Útržky a nadpisy**.
6. **Obsah stránok** — najdlhšia časť a zároveň tá, ktorá prináša najviac.

## Ak je jednoduchšie, aby sa pozrel niekto iný

Prejdem váš web sám a pošlem zoznam nálezov zoradený podľa vplyvu — s vysvetlením, čo sa dá opraviť svojpomocne a čo si vyžaduje zásah do kódu. **[Bezplatný SEO audit](/sk/seo-audit/)**, výsledok do 3 pracovných dní, bez záväzkov.

Na Slovensku žijem viac ako desať rokov, spustil som **12+ webov pre slovenské firmy** — od rezervačných systémov po e-shopy. Pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO.

K téme: [prečo lacný web zo zahraničia na Slovensku nepredáva](/sk/blog/sajt-iz-minska-ne-prodaet/), [koľko stojí web na Slovensku](/sk/blog/website-cost-2026/) a [stránka služby „Oprava webstránok"](/sk/service/bugfix/).

[CTA_FORM:bugfix]
