---
title: 'Google Nákupy pre e-shop: Merchant Center, feed a koľko to stojí'
description: >-
  Ako dostať produkty e-shopu do Google Nákupov: Merchant Center, produktový
  feed, nákupná kampaň alebo Performance Max, prečo Google zamieta produkty a
  koľko to stojí. S číslami e-shopu, kde nákupná kampaň vracia 14€ za euro.
date: '2026-10-14'
key: 'google-shopping'
faq:
  - q: 'Sú Google Nákupy zadarmo?'
    a: 'Čiastočne. Produkty z Merchant Center sa môžu zobrazovať zadarmo v bezplatných záznamoch, napríklad na karte Nákupy. Miesta nad výsledkami vyhľadávania s fotkou a cenou sú platená reklama v Google Ads a platí sa za preklik.'
  - q: 'Koľko stojí reklama v Google Nákupoch?'
    a: 'Platí sa za preklik a pri úzkych produktoch býva klik veľmi lacný: v e-shope Severské drevo v priemere 0,04€. Nákupná kampaň tam od jari 2025 minula 1 871€ a priniesla objednávky za 26 529€. Nastavenie Merchant Center, feedu a kampane robím v rámci štartu kampaní, ktorý stojí približne 1 000€.'
  - q: 'Prečo Merchant Center zamietol moje produkty?'
    a: 'Najčastejšie preto, že cena alebo dostupnosť vo feede nesedí so stránkou produktu, chýba kód GTIN pri značkovom tovare, na obrázku je text alebo vodoznak, alebo na webe chýbajú obchodné podmienky, reklamačný poriadok a kontakty. Pri chýbajúcich údajoch o firme môže Google pozastaviť celý účet.'
  - q: 'Nákupná kampaň alebo Performance Max?'
    a: 'Štandardná nákupná kampaň dáva kontrolu nad tým, za ktoré dopyty a produkty platíte. Performance Max zobrazuje produkty všade v Google naraz a potrebuje dobre nastavené meranie nákupov s hodnotou. Pri štarte s malým rozpočtom začínam štandardnou nákupnou kampaňou.'
  - q: 'Funguje to so Shoptetom alebo WooCommerce?'
    a: 'Áno. Shoptet má export feedu pre Google priamo v administrácii, WooCommerce ho rieši doplnkom. E-shop na mieru dostane feed generovaný z vlastnej databázy alebo skriptom, ktorý ho zbiera z webu.'
  - q: 'Kto na Slovensku nastaví Google Nákupy pre e-shop?'
    a: 'Ing. Kirill Mosin, White Eagles & Co. s. r. o. v Bratislave: Merchant Center, produktový feed, nákupná kampaň a Performance Max, meranie nákupov s hodnotou v GA4 a Google Ads. Kompletný štart kampaní približne od 1 000€, správa 25€/hod: https://whiteeagles.sk/sk/service/ads/'
---
![Google Nákupy pre e-shop | White Eagles & Co.](/assets/blog/google-nakupy.webp)

# Google Nákupy pre e-shop: Merchant Center, feed a koľko to stojí

Google Nákupy (Google Shopping) sú produkty s fotkou, názvom a cenou priamo vo výsledkoch vyhľadávania. Človek hľadá „terasové dosky smrekovec“ a ešte pred prvým odkazom vidí konkrétne dosky, ich cenu a obchod. Klikne až vtedy, keď ho cena a fotka presvedčia, preto takýto klik predáva lepšie než bežná textová reklama.

Pre e-shopy to býva najvýnosnejšia kampaň celého účtu. V e-shope [Severské drevo](/sk/case/severske-drevo-reklama-google/) priniesla nákupná kampaň 14,18€ objednávok za každé euro reklamy, zatiaľ čo celý účet 7,47€.

Nižšie je, čo treba pripraviť, ako funguje Merchant Center a produktový feed, akú kampaň zvoliť, koľko to stojí a prečo Google produkty zamieta. Ak to chcete odovzdať, pozrite si [správu Google Ads a Meta reklamy](/sk/service/ads/).

[CTA_FORM:ads]

## Ako fungujú Google Nákupy

Celá vec stojí na troch dieloch:

1. **Google Merchant Center**: účet, do ktorého e-shop posiela údaje o produktoch, dopravu a vrátenie tovaru.
2. **Produktový feed**: zoznam produktov s cenou, dostupnosťou, fotkou a ďalšími údajmi, ktorý sa sám aktualizuje.
3. **Google Ads**: kampaň, ktorá produkty z Merchant Center ukazuje ako reklamu a platí sa za preklik.

Produkty z Merchant Center sa môžu zobrazovať aj **zadarmo** v bezplatných záznamoch, napríklad na karte Nákupy. Platené pozície nad výsledkami vyhľadávania však idú len cez reklamu.

V EÚ sa nákupné reklamy zobrazujú cez porovnávaciu službu (CSS). Predvolene je to Google Shopping, ktorý si ako CSS účtuje vlastnú maržu. S partnerskou CSS býva cena kliknutia nižšia, oplatí sa to riešiť pri väčších rozpočtoch.

## Čo treba pripraviť

**Na webe e-shopu:**

- obchodné podmienky, reklamačný poriadok, informácie o doprave a vrátení tovaru;
- kontakty a údaje o firme: názov, sídlo, IČO, telefón, e-mail ([čo presne musí byť na webe](/sk/blog/obyazatelnye-rekvizity-sajta/));
- zabezpečený košík a platba;
- ceny s DPH, ktoré na stránke produktu sedia s feedom.

**V Merchant Center:**

- overená a nárokovaná doména webu;
- nastavenie dopravy (ceny a lehoty) a vrátenia tovaru;
- feed s produktmi.

Chýbajúce údaje o firme sú najčastejší dôvod, prečo Google nového obchodu nedôveruje a pozastaví celý účet. Oprava potom trvá týždne, takže sa oplatí mať ich na webe ešte pred prvým odoslaním feedu.

## Produktový feed: odkiaľ ho vziať

Feed je súbor alebo adresa, z ktorej si Google pravidelne berie produkty. Povinné údaje sú identifikátor, názov, popis, odkaz, obrázok, cena a dostupnosť. Pri značkovom tovare aj kód GTIN (čiarový kód) a značka, pri oblečení veľkosť a farba.

Odkiaľ feed vziať:

- **Shoptet** má export feedu pre Google priamo v administrácii;
- **WooCommerce** ho rieši doplnkom;
- **e-shop na mieru** generuje feed z vlastnej databázy. V Severskom dreve feed zbiera skript v Pythone priamo z webu, takže každá zmena ceny sa do Googlu dostane sama.

Najväčšia rezerva býva v **názvoch produktov**. Google podľa nich rozhoduje, pri akom hľadaní produkt ukáže. „Hranol KVH“ prehrá s „Hranol KVH 60 x 120 mm smrek, dĺžka 5 m“, lebo ľudia hľadajú rozmer a materiál. Do názvu patrí to, čo zákazník píše do vyhľadávania.

## Nákupná kampaň alebo Performance Max

| | Štandardná nákupná kampaň | Performance Max |
|---|---|---|
| **Kde sa produkty zobrazia** | Nákupy a výsledky vyhľadávania | všade v Google: vyhľadávanie, Nákupy, YouTube, Gmail, Mapy, weby |
| **Kontrola** | vidíte, pri akých dopytoch sa zobrazujete, a viete vylúčiť slová | Google rozhoduje sám, kontrola je obmedzená |
| **Čo potrebuje** | feed a meranie nákupov | feed, meranie nákupov s hodnotou a dosť objednávok na učenie |
| **Kedy ju použiť** | štart, menší rozpočet, potreba kontroly | keď už je história predajov a cieľ návratnosti |

Severské drevo má obe: štandardnú nákupnú kampaň a Performance Max pre materiály s cieľovou návratnosťou výdavkov na reklamu. Pri novom e-shope začínam štandardnou kampaňou. Performance Max bez histórie predajov sa učí na vašich peniazoch dlhšie, než je nutné.

## Koľko stoja Google Nákupy

Platí sa za preklik a pri úzkych produktoch je klik lacný. V Severskom dreve stál v nákupnej kampani v priemere **0,04€**. Kampaň od jari 2025 minula 1 871€ a priniesla objednávky za 26 529€.

Neplatí to všade. V elektronike alebo móde, kde súperia veľkí hráči, je klik niekoľkonásobne drahší. Presný odhad pre vaše produkty ukáže Plánovač kľúčových slov v Google Ads ešte pred spustením a zadarmo. Viac o cene kliknutia v článku [cena reklamy na Google](/sk/blog/kolko-stoji-reklama-na-slovensku/).

Práca je zvlášť: Merchant Center, feed a kampaň nastavujem v rámci štartu kampaní za približne 1 000€, správa potom stojí 25€/hod. Ak e-shop staviam ja, Merchant Center je súčasťou ceny e-shopu.

## Prečo Google zamieta produkty

Najčastejšie príčiny, s ktorými sa stretávam:

- **cena alebo dostupnosť nesedí** medzi feedom a stránkou produktu, napríklad po zľave, ktorá sa do feedu nedostala;
- **chýba GTIN** pri značkovom tovare;
- **obrázok s textom, vodoznakom alebo rámikom**, Google chce čistú fotku produktu;
- **chýbajú obchodné podmienky, reklamačný poriadok alebo kontakty**, vtedy hrozí pozastavenie celého účtu;
- **zakázaný alebo obmedzený tovar**, napríklad niektoré doplnky výživy alebo zbrane.

Merchant Center pri každom produkte napíše, čo mu chýba. Treba to čítať pravidelne, nie len pri štarte: feed sa mení s každou zmenou na webe.

## Meranie: bez neho Google optimalizuje kliky

Nákupná kampaň má zmysel len vtedy, keď Google vidí **nákup aj s hodnotou objednávky**. Inak nevie rozlíšiť produkt, ktorý predáva, od produktu, na ktorý ľudia len klikajú. V praxi to znamená GA4 s udalosťou nákupu, import konverzií do Google Ads a Consent Mode v2, bez ktorého z EÚ časť dát chýba. Podrobne v článku [nastavenie GA4](/sk/blog/nastavenie-google-analytics-4/) a [cookie lišta v roku 2026](/sk/blog/cookie-lista-2026-povinnosti/).

## Kedy Google Nákupy nedávajú zmysel

- máte desať produktov a ceny vysoko nad trhom: pri porovnaní vedľa seba prehráte;
- predávate služby, nie tovar: Nákupy sú len pre fyzické produkty;
- web nespĺňa základné požiadavky a feed nemá kto udržiavať.

Ak e-shop ešte len vzniká, čo všetko je pri ňom povinné a koľko stojí, rozoberám v článku [tvorba e-shopu na Slovensku](/sk/blog/internet-magazin-v-slovakii/).

## Ak treba pomôcť

Nastavím Merchant Center, feed, nákupnú kampaň aj Performance Max a meranie nákupov s hodnotou, aby kampaň optimalizovala predaj, nie kliky. Účty sa vedú na vašu firmu. Účtovníctvo, registráciu firmy ani správu sociálnych sietí nerobím.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO do vašich nákladov.

Detaily na [stránke služby „Správa Google Ads a Meta reklamy“](/sk/service/ads/). Prípadová štúdia: [Severské drevo, 324 nákupov za 134 684€](/sk/case/severske-drevo-reklama-google/). K téme: [PPC reklama](/sk/blog/ppc-reklama/), [veľkoobchodný e-shop](/sk/blog/velkoobchodny-eshop/).

[CTA_FORM:audit]
