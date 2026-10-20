---
title: 'E-faktúra od 1. 1. 2027: Peppol, digitálny poštár a koľko to stojí'
description: >-
  Povinná elektronická fakturácia na Slovensku od 1. januára 2027: kto musí
  e-faktúry vystavovať a kto len prijímať, čo je Peppol a digitálny poštár,
  výnimky, pokuty, ceny poskytovateľov a napojenie e-shopu alebo vlastného
  systému cez API.
date: '2026-10-18'
updated: '2026-10-20'
key: 'e-invoicing-2027'
faq:
  - q: 'Od kedy je elektronická fakturácia na Slovensku povinná?'
    a: 'Od 1. januára 2027 pri tuzemských dodaniach medzi podnikateľmi (B2B) a voči verejnej správe (B2G). Platitelia DPH budú e-faktúry vystavovať, odosielať aj prijímať, ostatní podnikatelia a právnické osoby ich musia vedieť prijať. Faktúr pre spotrebiteľov sa povinnosť netýka. Dobrovoľne sa dá zapojiť už v roku 2026.'
  - q: 'Musí e-faktúry prijímať aj živnostník, ktorý nie je platiteľ DPH?'
    a: 'Áno. E-faktúry vystavovať nemusí, ale musí ich vedieť prijať od dodávateľov, ktorí sú platiteľmi DPH, napríklad za telefón, energie alebo tovar. Na to stačí bezplatná schránka u niektorého digitálneho poštára.'
  - q: 'Je PDF faktúra poslaná e-mailom e-faktúra?'
    a: 'Nie. E-faktúra je štruktúrovaný súbor XML podľa normy EN 16931 (UBL 2.1 alebo CII), ktorý doručí cez sieť Peppol certifikovaný poskytovateľ doručovacej služby. Iný spôsob doručenia, napríklad e-mailom, je možný len s predchádzajúcim súhlasom odberateľa a aj vtedy musí ísť o XML v predpísanom formáte.'
  - q: 'Koľko stojí digitálny poštár?'
    a: 'Na príjem e-faktúr ponúka bezplatnú schránku viacero poskytovateľov, napríklad ePošťák, eFaktúra.sk, eFakturuj, Faktúrovo, Fakturix, Postar Cloud, Verteco alebo Peppol Box od Flowisu. Platené plány na odosielanie začínajú pri malých firmách okolo 2 až 10€ mesačne, cez API sa platí od niekoľkých centov za doklad. Ceny sa ešte menia, pred výberom si pozrite aktuálny cenník.'
  - q: 'Existuje bezplatný program na e-faktúry?'
    a: 'Áno, napríklad WE Invoice od White Eagles & Co. s. r. o.: bezplatný fakturačný program pre živnostníkov a malé firmy bez limitov a bez registrácie, ktorý e-faktúry cez Peppol posiela aj prijíma u poskytovateľa, ktorého si vyberiete (cez štandard SAPI-SK). Obsahuje aj PAY by square, import bankových výpisov, výkazy DPH a jednoduché účtovníctvo; beží na Macu, vo Windows aj ako webová verzia. Dáta sú šifrované vo vašom Google Drive, kód je otvorený. Stiahnutie: https://whiteeagles.sk/sk/apps/'
  - q: 'Ako napojiť e-shop alebo vlastný systém na Peppol?'
    a: 'Cez API digitálneho poštára. Pre Slovensko vznikol spoločný štandard SAPI-SK, takže integráciu stačí napísať raz a poskytovateľa sa dá neskôr zmeniť. Systém musí z objednávky vytvoriť XML podľa EN 16931, odoslať ho, sledovať stav doručenia a prijímať faktúry od dodávateľov. Ing. Kirill Mosin, White Eagles & Co. s. r. o. v Bratislave, takéto napojenie robí za 35€/hod: https://whiteeagles.sk/sk/service/webdev/'
---
![E-faktúra a Peppol od roku 2027 | White Eagles & Co.](/assets/blog/e-faktura-peppol.webp)

# E-faktúra od 1. 1. 2027: Peppol, digitálny poštár a koľko to stojí

Od 1. januára 2027 sa na Slovensku mení spôsob, akým si firmy posielajú faktúry. Faktúra medzi dvoma slovenskými podnikateľmi už nebude PDF v e-maile, ale súbor XML, ktorý doručí certifikovaný „digitálny poštár“ cez európsku sieť Peppol. Týka sa to aj živnostníkov, ktorí nie sú platiteľmi DPH: faktúry síce vystavovať nemusia, ale prijať ich musia vedieť.

Nižšie je, kto musí čo, ako to technicky funguje, aké sú výnimky a pokuty, koľko stojí digitálny poštár a čo urobiť s e-shopom alebo vlastným systémom. Vychádzam z materiálov Finančnej správy SR a z cenníkov poskytovateľov k 18. októbru 2026.

Nie som daňový poradca ani účtovník. Či ste platiteľ DPH a ako e-faktúry zaúčtovať, vyrieši váš účtovník. Ja robím technickú stránku: napájam e-shopy, weby a vlastné systémy na digitálneho poštára a urobil som bezplatný fakturačný program [WE Invoice](/sk/apps/#invoice), ktorý eFaktúru posiela aj prijíma. Viac o ňom nižšie.

[CTA_FORM:webdev]

## Kto musí čo robiť

| Kto | Vystavovať a odosielať e-faktúry | Prijímať e-faktúry |
|---|---|---|
| **Platiteľ DPH** (s.r.o., a.s., živnostník) | áno, pri tuzemských dodaniach inému podnikateľovi alebo právnickej osobe | áno |
| **Podnikateľ, ktorý nie je platiteľ DPH** | nie | áno |
| **Obce, mestá, neziskovky, občianske združenia** | nie, ak nie sú platiteľmi DPH | áno |
| **Spotrebitelia** | nie | nie, faktúry dostávajú ako doteraz |

Povinnosť platí pre tuzemské transakcie, teda zo Slovenska na Slovensko. Zahraničná firma, ktorá je na Slovensku len registrovaná pre DPH, nemá z tejto registrácie povinnosť vystavovať e-faktúry. Cezhraničné e-faktúry prídu až s európskym balíkom ViDA od 1. júla 2030.

V praxi to znamená, že od januára môže každej firme prísť e-faktúra za telefón, energie alebo tovar. Kto ju nevie prijať, má problém, aj keď sám nič nevystavuje.

## Čo je e-faktúra, Peppol a digitálny poštár

**E-faktúra** nie je PDF ani fotka faktúry. Je to štruktúrovaný súbor XML podľa európskej normy EN 16931, vo formáte UBL 2.1 alebo CII (v sieti Peppol ako Peppol BIS Billing 3.0). Účtovný program ho načíta bez prepisovania. Človek ho naďalej vidí ako bežnú faktúru, XML sa učiť netreba.

**Peppol** je európska sieť na výmenu faktúr a ďalších obchodných dokladov. Funguje ako pošta: odosielateľ aj príjemca majú svojho poskytovateľa a tí si doklad odovzdajú s potvrdením o doručení. Slovenská firma má v sieti identifikátor v tvare **0245:DIČ**.

**Digitálny poštár** je certifikovaný poskytovateľ doručovacej služby: musí mať certifikát OpenPeppol a akreditáciu Finančnej správy. K 16. októbru 2026 ich bolo na [zozname Finančnej správy](https://vpds.financnasprava.sk/) 80, slovenských aj zahraničných. Digitálny poštár môže byť schovaný aj priamo vo vašom účtovnom programe, potom samostatnú zmluvu nepotrebujete.

Poskytovateľa si vyberiete v systéme Finančnej správy. Výber tam nie je záväzný, poskytovateľa sa dá neskôr zmeniť. Ak zistíte, že vaše DIČ s predponou 0245 už v sieti zaregistroval niekto iný bez vášho vedomia, požiadajte ho o zrušenie registrácie.

## Výnimky: kedy e-faktúra netreba

Povinnosť vyhotoviť e-faktúru sa nevzťahuje na:
- plnenia oslobodené od DPH podľa § 28 až 43 a § 47 zákona o DPH;
- zjednodušenú faktúru do 100€ vrátane DPH;
- doklad z pokladnice eKasa.

Doterajší limit 5 000€ pri faktúrach pre verejnú správu zaniká: od roku 2027 sa povinnosť neposudzuje podľa výšky sumy.

E-faktúru môžete poslať aj inak ako cez digitálneho poštára, napríklad e-mailom, ale len s predchádzajúcim súhlasom odberateľa a stále ako XML v predpísanom formáte. Povinnosť mať digitálneho poštára tým nezaniká a prichádzate o dôkaz doručenia, takže spor „faktúra mi neprišla“ si potom riešite sami.

## Lehoty, hlásenie údajov a pokuty

- **Lehota na vyhotovenie** e-faktúry zostáva 15 dní od dodania alebo od prijatia platby vopred. Od 1. júla 2030 sa skráti na 10 dní.
- **Hlásenie údajov.** Z e-faktúr idú údaje Finančnej správe. Odosielateľ má túto povinnosť splnenú tým, že faktúru odovzdá doručovacej službe. Odberateľ, ktorý je platiteľ DPH, nahlasuje údaje z prijatej e-faktúry do piatich dní od jej prijatia. Mnohí poskytovatelia to robia automaticky, pri výbere sa na to opýtajte.
- **Kontrolný výkaz** sa zatiaľ podáva ďalej. Spolu so súhrnným výkazom ho zrušia od 1. júla 2030, keď ho nahradí automatické hlásenie údajov z faktúr.
- **Pokuty:** za nenahlásené, neskoré, neúplné alebo nesprávne údaje do 10 000€, pri opakovanom porušení do 100 000€. Neuložia sa pri zjavnom omyle, ktorý hneď opravíte, ani pri preukázanej technickej poruche na strane digitálneho poštára.
- **Opravná faktúra** k e-faktúre musí byť tiež e-faktúra a ide cez doručovaciu službu.

## Ako sa pripraviť: štyri kroky

1. **Zistite, či ste platiteľ DPH.** Od toho závisí, či budete e-faktúry len prijímať, alebo aj vystavovať.
2. **Vyberte si spôsob.** Buď to zvládne účtovný či fakturačný program, ktorý už používate (opýtajte sa dodávateľa, odkedy a za koľko), alebo samostatná webová schránka digitálneho poštára, alebo nový program, ktorý je zároveň digitálnym poštárom. Ak nechcete platiť za fakturačný program, vyskúšajte bezplatný WE Invoice, o ktorom píšem nižšie.
3. **Dohodnite sa s účtovníkom:** kto e-faktúry prijíma, kto ich kontroluje a ako sa k nim účtovník dostane. Väčšina schránok dovoľuje pozvať účtovníka zadarmo.
4. **Vyskúšajte to ešte v roku 2026.** Dobrovoľné zapojenie je otvorené a viacero poskytovateľov má do konca roka platené funkcie zadarmo. Interaktívny sprievodca Finančnej správy je na [info-efaktura.sk](https://www.info-efaktura.sk).

## Koľko stojí digitálny poštár

Kto faktúry hlavne prijíma, vystačí si väčšinou s bezplatnou schránkou. Platí sa za odosielanie väčšieho počtu faktúr, viac používateľov a napojenie na iný softvér. Prehľad podľa verejných cenníkov k 18. októbru 2026 (ceny sa ešte hýbu, pred výberom si ich overte):

| Poskytovateľ | Zadarmo | Platené | API a SAPI-SK |
|---|---|---|---|
| **ePošťák** | 500 prijatých a 5 odoslaných mesačne, archív 90 dní | od 2027 8€ mesačne (50 odoslaných) a 19€ (200 odoslaných) | SAPI-SK aj vlastné API, 0,10€ až 0,04€ za doklad podľa objemu, bez paušálu |
| **eFaktúra.sk** | neobmedzené faktúry pre 5 odberateľov, príjem e-faktúr, 5 e-faktúr mesačne | Pro 4,90€ mesačne v úvodnej cene, od 2027 9,80€ (80 e-faktúr) | SAPI-SK aj REST API s webhookmi od plánu Pro, sandbox zadarmo |
| **eFakturuj** | 50 dokladov mesačne spolu | od 9€ mesačne (75 odoslaných), príjem bez limitu | prepojenie cez SAPI-SK v každom pláne, REST API od 29€ mesačne (250 faktúr) |
| **Faktúrovo** | príjem bez limitu, 3 vystavené faktúry mesačne, do konca 2026 všetko zadarmo | od 5,52€ mesačne pri ročnej platbe | SAPI-SK aj vlastné API, pre vlastný systém kredity 0,10€ až 0,02€ za doklad, sandbox |
| **Fakturix** | príjem bez limitu, 3 odoslania mesačne, potom 0,50€ za faktúru | od 4,99€ mesačne (50 odoslaní), do 1. 12. 2026 zadarmo | SAPI-SK API od plánu Starter za 4,99€ |
| **Postar Cloud** (E-Works) | príjem, 10 odoslaných mesačne | 4,90€, 12,90€, od 49€ mesačne | vlastné API od plánu za 4,90€, webhooky od 12,90€, SAPI-SK neuvádza |
| **Dativery** (Peppos) | 5 odoslaných a 5 prijatých mesačne, potom 0,16€ za faktúru | od 12€ mesačne | SAPI-SK aj vlastné API |
| **Flowis** | Peppol Box na príjem pre neplatiteľov DPH, 30 dní skúšobne s odosielaním do 100 e-faktúr | balíky Mini, Core a Max zatiaľ bez ceny | SAPI-SK, API od balíka Core |
| **Doklado** | e-faktúra v bezplatnom pláne | 9,90€ mesačne s vyťažovaním 70 dokladov | vlastné API, SAPI-SK neuvádza |
| **Verteco** | príjem bez archívu do 1 000 faktúr mesačne | od 2027 2€ mesačne za IČO vrátane odosielania a archívu, do konca 2026 zadarmo | SAPI-SK aj OpenAPI v cene, sandbox |

Zahraniční poskytovatelia ako Billit (od 6,90€ mesačne) alebo Qvalia (od 9€ mesačne) sú tiež akreditovaní a oplatia sa skôr firmám, ktoré fakturujú do viacerých krajín. Väčšie firmy riešia e-faktúry cez svoj ERP a poskytovateľov ako SOFTIP, Editel, ecosio či Seyfor. Prehľad podpory e-faktúr v účtovných programoch zverejnila [Daňovo-odvodová skupina Slovensko.Digital](https://slovensko.digital/wp-content/uploads/2026/09/prehlad-podpory-e-faktur-u-clenov.pdf).

Pri výbere sa nepozerajte len na cenu. Dôležité je aj to, ako dlho poskytovateľ faktúry uchováva, či ich viete exportovať, keď odídete, a či za vás automaticky hlási údaje Finančnej správe.

## WE Invoice: bezplatný fakturačný program pripravený na eFaktúru

![WE Invoice: prehľad faktúr, eFaktúr a daňového kalendára](/assets/apps/we-invoice-dark.webp)

Všetko, o čom píšem vyššie, som neriešil len na papieri. Pre živnostníkov a malé firmy som urobil fakturačný program **WE Invoice**, ktorý eFaktúru cez Peppol posiela aj prijíma. Je zadarmo, bez registrácie a bez limitov na kontakty, doklady aj firmy; platené fakturačné služby si za rovnaké funkcie berú 5 až 15€ mesačne. Platíte len digitálnemu poštárovi a viacerí z tabuľky vyššie prijímajú zadarmo a za odoslanie účtujú centy.

Čo robí pri eFaktúre:
- **Pracuje s poskytovateľom, ktorého si vyberiete.** Sprievodca pripojením ponúka poskytovateľov z tabuľky vyššie aj s cenami a bezplatnými plánmi. Zmluvu uzatvárate priamo s poskytovateľom a do aplikácie vložíte jeho API kľúč. WE Invoice nie je ďalší digitálny poštár a žiadneho nepreprodáva.
- **Hovorí štandardom SAPI-SK**, takže funguje s každým poskytovateľom, ktorý ho podporuje, a pri niektorých aj cez ich vlastné API. Keď poskytovateľa zmeníte, nič nestratíte: archív pôvodných XML eFaktúr, ktoré treba uchovávať 10 rokov, zostáva vo vašom Google Drive.
- **Kontroluje pred odoslaním.** Náležitosti faktúry podľa § 74 zákona o DPH overí ešte pred vystavením a eFaktúry, ktoré vytvára, sa v automatických testoch kontrolujú podľa pravidiel Peppol a normy EN 16931.
- **Prílohy idú priamo v eFaktúre** a prijaté eFaktúry sa načítajú so všetkými riadkami, takže výdavok netreba prepisovať. PDF uloží aj vo formáte PDF/A-3 s eFaktúrou vnútri.

Popri eFaktúre je to celý fakturačný program: faktúry s PAY by square, zálohové faktúry a dobropisy, odberatelia z obchodného registra podľa IČO, import bankových výpisov s párovaním platieb, evidencia DPH, kontrolný výkaz a priznanie k DPH ako XML, jednoduché účtovníctvo a export pre účtovníka do Pohody, Money S3 či Omegy. Beží na Macu, vo Windows a ako webová verzia aj na telefóne, rozhranie je v slovenčine a ďalších piatich jazykoch.

Vaše faktúry neležia na našom serveri. Dáta sa šifrujú priamo v zariadení (AES-256) a ukladajú do vášho Google Drive, v aplikácii nie je analytika ani reklama. Kód je otvorený pod licenciou MIT, takže si ktokoľvek, aj váš účtovník alebo správca IT, môže overiť, čo s dátami robí.

Aby bolo jasno: eFaktúra je v aplikácii zatiaľ v beta verzii a otvára sa postupne podľa poradovníka. Výkazy DPH práve preveruje účtovník, dovtedy ich pred podaním skontrolujte.

**[Stiahnuť WE Invoice pre Mac a Windows](/sk/apps/#invoice)** alebo [otvoriť webovú verziu](https://jaffarsk24.github.io/WE-Invoice/app/) a vyskúšať ju na ukážkových dátach.

## E-shop, vlastný systém alebo ERP: napojenie cez API

Ak faktúry vystavuje e-shop, rezervačný systém alebo vlastná aplikácia, ručne ich do schránky prepisovať nebudete. Systém sa napojí na digitálneho poštára cez API.

Čo také napojenie obnáša:
1. **Rozlíšiť B2B a B2C.** Faktúra pre spotrebiteľa ide ďalej ako doteraz. Ak je zákazník firma so slovenským DIČ a vy ste platiteľ DPH, vzniká e-faktúra. Pokladňa e-shopu preto musí spoľahlivo zbierať IČO, DIČ a IČ DPH.
2. **Vytvoriť XML** z údajov objednávky podľa EN 16931 a slovenských pravidiel (Peppol BIS Billing 3.0) a pred odoslaním ho overiť validátorom.
3. **Odoslať a sledovať stav:** prevzatie poskytovateľom, doručenie, prípadné odmietnutie.
4. **Prijímať faktúry od dodávateľov** a posielať ich ďalej do účtovníctva namiesto ručného prepisovania.
5. **Vyskúšať v sandboxe.** Viacero poskytovateľov má testovacie prostredie zadarmo, kde sa nič neúčtuje a nič nejde Finančnej správe.

Pre Slovensko vznikol spoločný štandard **SAPI-SK** (Standardised Access Point Interface), iniciatíva komunity OpenPeppol. Je to jednotné REST API s rovnakým prihlasovaním (`/auth/token`), odosielaním (`/document/send`) a prijímaním dokladov (`/document/receive` a potvrdenie prevzatia). Integrácia napísaná podľa SAPI-SK funguje s každým poskytovateľom, ktorý ho podporuje, takže poskytovateľa neskôr zmeníte bez prerábania. SAPI-SK podporuje väčšina poskytovateľov z tabuľky vyššie: ePošťák, eFaktúra.sk, eFakturuj, Faktúrovo, Fakturix, Dativery, Flowis a Verteco, z firemných napríklad Editel. Postar Cloud a Doklado ho vo verejných materiáloch neuvádzajú, tam sa integrácia píše na ich vlastné API.

Pri veľkoobchodnom e-shope, kde sú zákazníkmi hlavne firmy, bude e-faktúra od januára každodenná vec. Čo ešte taký e-shop musí mať, je v článku o [veľkoobchodnom e-shope](/sk/blog/velkoobchodny-eshop/).

## Ak treba pomôcť

Napojím e-shop, web alebo vlastný systém na digitálneho poštára cez SAPI-SK alebo API poskytovateľa: tvorbu XML z objednávok, rozlíšenie B2B a B2C v pokladni, odosielanie, stavy doručenia a príjem faktúr od dodávateľov, všetko najprv v sandboxe. Vývoj účtujem 35€/hod a rozsah odhadnem po pohľade na váš systém. Ak používate bežný fakturačný program, ktorý e-faktúru podporuje, programátora väčšinou nepotrebujete, stačí ju zapnúť u dodávateľa. A ak žiadny nemáte alebo vám prekáža mesačný poplatok, [WE Invoice](/sk/apps/#invoice) je zadarmo.

Účtovníctvo, daňové poradenstvo ani rozhodnutie, či sa stať platiteľom DPH, nerobím, to patrí účtovníkovi.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO do vašich nákladov.

Detaily na [stránke služby tvorba web stránok](/sk/service/webdev/). K téme: [registrácia na DPH 2026](/sk/blog/dph-registraciya/), [tvorba e-shopu na Slovensku](/sk/blog/internet-magazin-v-slovakii/), [Shoptet, Shopify alebo e-shop na mieru](/sk/blog/shoptet-shopify-alebo-eshop-na-mieru/).

[CTA_FORM:consult]
