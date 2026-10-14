---
title: 'Meta pixel, Conversions API a meranie konverzií pre reklamu'
description: >-
  Ako nastaviť meranie konverzií pre Google Ads aj Meta: Meta pixel,
  Conversions API, import konverzií z GA4, rozšírené konverzie, Consent Mode v2
  a hovory. Bez merania reklama optimalizuje kliky, nie zákazníkov.
date: '2026-10-14'
key: 'conversion-tracking'
faq:
  - q: 'Čo je Meta pixel?'
    a: 'Kúsok kódu na webe, ktorý Mete oznamuje, čo ľudia z reklamy urobili: pozreli produkt, odoslali formulár, nakúpili. Bez neho Meta nevie, kto sa stal zákazníkom, a nemá sa podľa čoho učiť ani komu ukazovať remarketing.'
  - q: 'Načo je Conversions API, keď mám pixel?'
    a: 'Pixel beží v prehliadači a časť udalostí stratí pri blokovaní reklám, v Safari alebo keď človek nedá súhlas s cookies. Conversions API posiela tie isté udalosti zo servera. Spolu s pixelom a správnym párovaním udalostí vidí Meta viac výsledkov a nepočíta ich dvakrát.'
  - q: 'Ako merať konverzie v Google Ads?'
    a: 'Buď značkou Google Ads priamo na webe, alebo importom kľúčových udalostí z GA4. Pre malú firmu býva jednoduchší import z GA4, pri e-shope sa k tomu pridávajú rozšírené konverzie a hodnota nákupu.'
  - q: 'Ako merať hovory z reklamy?'
    a: 'Kliknutie na telefónne číslo na webe sa meria ako udalosť, hovory priamo z reklamy meria Google Ads sám a v Mete existuje kampaň s cieľom hovory. Ak sa zákazka uzatvára až neskôr, dá sa výsledok do reklamného systému nahrať dodatočne ako offline konverzia.'
  - q: 'Koľko stojí nastavenie merania konverzií?'
    a: 'Nastavenie GA4, Tag Managera, kľúčových udalostí, Consent Mode v2 a importu do Google Ads začína u mňa od 500€, ďalšie úpravy 25€/hod. Meta pixel a Conversions API sú súčasťou štartu kampaní v Mete.'
  - q: 'Kto na Slovensku nastaví meranie konverzií pre Google Ads a Meta?'
    a: 'Ing. Kirill Mosin, White Eagles & Co. s. r. o. v Bratislave: GA4 a Tag Manager, Meta pixel a Conversions API, Consent Mode v2, import konverzií do Google Ads, meranie hovorov. Od 500€, 25€/hod: https://whiteeagles.sk/sk/service/analytics/'
---
![Meranie konverzií pre reklamu | White Eagles & Co.](/assets/blog/meranie-konverzii.webp)

# Meta pixel, Conversions API a meranie konverzií pre reklamu

Reklamný systém optimalizuje presne to, čo vidí. Ak vidí kliky, nájde vám lacné kliky. Ak vidí odoslané formuláre, hovory a nákupy, nájde ľudí, ktorí ich robia. Meranie konverzií preto nie je doplnok k reklame, ale jej riadenie.

Nižšie je, čo je Meta pixel a Conversions API, ako sa merajú konverzie pre Google Ads, prečo bez Consent Mode v2 chýba časť dát z EÚ a ako merať hovory a zákazky, ktoré sa uzatvárajú mimo webu. Ak to chcete nastaviť bez vlastného bádania, pozrite si [webovú analytiku](/sk/service/analytics/): od 500€, 25€/hod.

[CTA_FORM:analytics]

## Čo je konverzia a prečo je od nej všetko

Konverzia je akcia, kvôli ktorej reklama beží: dopyt cez formulár, hovor, rezervácia, nákup. Nie návšteva stránky a nie čas strávený na webe.

Rozdiel je vidieť na servise elektroniky [RAM service](/sk/case/ram-service-reklama-meta/). Kampaň bola nastavená na návštevnosť a za tri mesiace priniesla tisíce návštev a ani jeden zaznamenaný hovor. Po nasadení merania a prechode na kampaň na hovory prišlo v prvom týždni 21 hovorov po 3,79€. Rozpočet bol podobný, zmenilo sa to, čo reklama videla.

Opačný príklad je e-shop s repasovanou technikou [Recorder.sk](/sk/case/recorder-reklama-google-meta/): kliky boli lacné (0,25€), ale v Tag Manageri chýbala udalosť nákupu. Google ani Meta nevedeli, ktoré kliky končia objednávkou, a nemohli sa na ne nastaviť.

## Meta pixel

Meta pixel je kód na webe, ktorý posiela Mete udalosti: zobrazenie stránky, pozretie produktu, pridanie do košíka, dopyt, nákup. Meta podľa nich:

- vie, ktorým ľuďom ukázať reklamu, aby urobili to isté;
- počíta, koľko stál dopyt alebo nákup;
- skladá publiká na remarketing, napríklad ľudí, ktorí boli v košíku a nenakúpili.

Vkladá sa najlepšie cez Google Tag Manager, kde sú pod jednou strechou aj ostatné značky a súhlas s cookies. Kontrola je jednoduchá: v Správcovi udalostí v Mete musia udalosti pribúdať s rozumnými číslami, nie dvojnásobnými.

## Conversions API: prečo pixel nestačí

Pixel beží v prehliadači, a tam sa udalosti strácajú:

- blokovače reklám pixel zastavia úplne;
- Safari a iné prehliadače obmedzujú cookies a skracujú ich životnosť;
- človek, ktorý nedá súhlas s cookies, nesmie byť sledovaný pixelom vôbec.

**Conversions API** posiela tie isté udalosti zo servera webu priamo Mete. Aby sa jedna objednávka nezapočítala dvakrát, pixel aj server posielajú rovnaký identifikátor udalosti a Meta ich spáruje. Súhlas s cookies platí aj tu: server posiela len to, na čo má právny základ.

Pri RAM service išli pixel a Conversions API spolu, preto reklamný systém hovory videl a mohol ich nakupovať.

## Meranie konverzií pre Google Ads

Dve cesty:

1. **Značka Google Ads priamo na webe**: konverzná akcia v Google Ads a jej značka v Tag Manageri.
2. **Import kľúčových udalostí z GA4**: udalosť, ktorú už meria analytika, sa v Google Ads nastaví ako konverzia.

Pre malú firmu je zvyčajne jednoduchší import z GA4: jedno miesto pravdy pre analytiku aj reklamu. Pri e-shope treba navyše **hodnotu nákupu**, aby Google odlíšil objednávku za 30€ od objednávky za 3 000€, a **rozšírené konverzie**, ktoré pomocou zahašovaného e-mailu z objednávky dopárujú nákupy stratené pri cookies.

Ako sa nastavuje GA4, aby dopyty naozaj počítal, je v článku [nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/), kontrolný zoznam chýb v článku [ako skontrolovať nastavenie GA4](/sk/blog/kontrola-nastavenia-ga4/).

## Consent Mode v2: bez neho chýba časť EÚ

Od marca 2024 Google pre reklamu v EÚ vyžaduje signál súhlasu, Consent Mode v2. Cookie lišta musí Googlu povedať, na čo človek súhlasil. Bez toho:

- remarketing a podobné publiká z EÚ nefungujú;
- Google nemôže modelovať konverzie od ľudí, ktorí súhlas nedali;
- v prehľadoch kampaň vyzerá stratová, aj keď dopyty prináša, a ľahko sa vypne práve tá dobrá.

Meta má vlastné pravidlá, ale princíp je rovnaký: pixel sa spúšťa až po súhlase. Rozbor požiadaviek je v článku [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

## Hovory a zákazky mimo webu

Pri službách veľa zákaziek nevznikne formulárom, ale telefónom. Merať sa dajú tri úrovne:

- **kliknutie na telefónne číslo na webe** ako udalosť v GA4 a v Mete;
- **hovory priamo z reklamy**: Google Ads ich meria sám, ak je v reklame číslo, Meta má kampaň s cieľom hovory;
- **skutočná zákazka**, ktorá sa uzavrie o týždeň: dá sa do Google Ads alebo Mety nahrať dodatočne ako offline konverzia.

Najďalej to ide pri prenájme skladov [TOP SKLAD](/sk/case/top-sklad-reklama-google/): konverzia tam nie je dopyt ani klik, ale až prvý zaplatený prenájom nového zákazníka. Kľúčové slová, ktoré prinášajú len dopyty bez prenájmov, sú preto pozastavené.

## Poradie, v akom to nastavovať

1. Cookie lišta s Consent Mode v2.
2. GA4 a Tag Manager s kľúčovými udalosťami: dopyt, hovor, nákup s hodnotou.
3. Import konverzií do Google Ads, pri e-shope rozšírené konverzie.
4. Meta pixel cez Tag Manager a Conversions API.
5. Kontrola: skúšobný dopyt alebo nákup musí byť vidieť v GA4, v Google Ads aj v Mete, každý raz.

Až potom dáva zmysel spustiť alebo prestavať kampane. Ak reklama už beží a dopyty sa nepočítajú, postup hľadania príčiny je v článku [reklama beží, dopyty nechodia](/sk/blog/reklama-bezi-dopyty-nechodia/). Kedy sa oplatí ísť ďalej na server-side GTM, rozoberám v článku [server-side GTM](/sk/blog/server-side-gtm-nastavenie/).

## Ak treba pomôcť

Nastavím GA4 a Tag Manager, Consent Mode v2, import konverzií do Google Ads, Meta pixel s Conversions API a meranie hovorov, aby reklama videla zákazníkov, nie kliky. Nastavenie merania začína od 500€, úpravy 25€/hod. Účty sa vedú na vašu firmu. Účtovníctvo ani správu sociálnych sietí nerobím.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO do vašich nákladov.

Detaily na stránkach [webová analytika](/sk/service/analytics/) a [správa Google Ads a Meta reklamy](/sk/service/ads/). K téme: [PPC reklama](/sk/blog/ppc-reklama/), [reklama na Facebooku a Instagrame](/sk/blog/reklama-na-facebooku-a-instagrame/), [Google Nákupy pre e-shop](/sk/blog/google-nakupy-pre-eshop/).

[CTA_FORM:audit]
