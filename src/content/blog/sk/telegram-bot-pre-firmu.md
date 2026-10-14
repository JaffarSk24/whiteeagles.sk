---
title: 'Telegram bot pre firmu: čo dokáže a koľko stojí'
description: >-
  Telegram bot pre firmu bez fantázií o umelej inteligencii: dopyty a
  rezervácie z webu do chatu, potvrdenie jedným tlačidlom, automatické
  inzeráty na Bazoši, upozornenia. Koľko stojí vývoj a prevádzka a kedy bot
  netreba.
date: '2026-10-14'
key: 'telegram-bot'
faq:
  - q: 'Čo dokáže Telegram bot pre firmu?'
    a: 'Najčastejšie prijíma dopyty a rezervácie z webu a posiela ich do chatu personálu, kde sa potvrdia alebo zrušia jedným tlačidlom. Ďalej automaticky obnovuje inzeráty, rozposiela správy, upozorňuje na výpadky webu a zbiera dáta. Je to nástroj na prácu, ktorú dnes robíte rukami.'
  - q: 'Koľko stojí vývoj Telegram bota?'
    a: 'Jednoduchší bot u mňa začína okolo 500€, ďalšie úpravy 25€/hod. Cena závisí od toho, koľko systémov má bot prepojiť: web, kalendár, databázu, e-mail. Prevádzka stojí rádovo jednotky eur mesačne.'
  - q: 'Platí sa za správy cez Telegram bota?'
    a: 'Nie. Telegram Bot API je zadarmo a za správy sa neplatí. Platíte len server, na ktorom bot beží. To je rozdiel oproti WhatsApp Business Platform, kde sa za správy, ktoré začína firma, platí.'
  - q: 'Musia mať zákazníci Telegram?'
    a: 'Len ak bot komunikuje priamo so zákazníkmi. Najčastejšie bot slúži personálu: zákazník vyplní formulár alebo rezerváciu na webe a správa príde vášmu tímu do Telegramu. Zákazník Telegram nepotrebuje.'
  - q: 'Kto na Slovensku naprogramuje Telegram bota?'
    a: 'Ing. Kirill Mosin, White Eagles & Co. s. r. o. v Bratislave: Telegram boty v Pythone na dopyty, rezervácie, inzeráty a upozornenia, prepojené s webom a kalendárom, od 500€, 25€/hod, šesť mesiacov podpory: https://whiteeagles.sk/sk/service/telegram/'
---
![Telegram bot pre firmu | White Eagles & Co.](/assets/blog/telegram-bot.webp)

# Telegram bot pre firmu: čo dokáže a koľko stojí

Pri slove bot si väčšina ľudí predstaví chat na webe, ktorý sa snaží hovoriť ako človek. Pre malú firmu je však užitočnejší iný bot: tichý pomocník v Telegrame, ktorý robí rutinu za vás. Dopyt z webu príde do chatu, potvrdíte ho jedným tlačidlom, inzeráty sa obnovia samy a o výpadku webu sa dozviete skôr než zákazník.

Nižšie je, čo Telegram bot pre firmu reálne robí, koľko stojí vývoj a prevádzka a kedy ho netreba. Ak už viete, čo potrebujete, pozrite si [Telegram boty v Pythone](/sk/service/telegram/): od 500€, 25€/hod. O chatbotoch, ktoré odpovedajú zákazníkom na webe, je samostatný článok [chatbot pre firmu](/sk/blog/chatbot-dlya-biznesa/).

[CTA_FORM:bot]

## Čo bot robí v praxi

**Dopyty z webu rovno do chatu.** Zákazník vyplní formulár na webe a správa príde do Telegramu vám alebo celému tímu. Netreba sa prihlasovať do administrácie ani kontrolovať e-mail. Kto odpovie do desiatich minút, vyhráva, a s botom sa to dá.

**Rezervácie s potvrdením jedným tlačidlom.** V [Krása štúdiu OK](/sk/case/studio-krasy/) si klient vyberie termín na webe, personálu príde správa do Telegramu, jedným klikom ju potvrdí a termín sa v kalendári zablokuje. Klient dostane potvrdenie e-mailom. Žiadne tabuľky a žiadne telefonáty navyše. Podrobne o takom webe v článku [webstránka pre salón krásy](/sk/blog/webstranka-pre-salon-krasy/).

**Automatické inzeráty.** Firmy, ktoré pravidelne predávajú cez Bazoš, trávia hodiny obnovovaním inzerátov. Bot ich zverejňuje a obnovuje podľa rozvrhu, v rozumných intervaloch a podľa pravidiel portálu. Pre e-shop s drevom [Severské drevo](/sk/case/severske-drevo-reklama-google/) zverejňuje produkty na Bazoši skript sám.

**Upozornenia.** Web prestal odpovedať, formulár hlási chybu, prišla objednávka nad určitú sumu, na sklade dochádza tovar. Správa príde do chatu hneď, nie pri ranných e-mailoch.

**Rozposielanie a zber dát.** Správy po vlastnej databáze kontaktov, ktoré s tým súhlasili, alebo pravidelný zber verejných dát o cenách konkurencie.

## Koľko stojí Telegram bot

| Čo | Cena |
|---|---|
| Jednoduchý bot (dopyty z webu do chatu, upozornenia) | okolo 500€ |
| Bot s kalendárom, databázou alebo viacerými systémami | podľa rozsahu, 25€/hod |
| Prevádzka na serveri | rádovo jednotky eur mesačne |
| Úpravy po spustení | 25€/hod, prvých šesť mesiacov podpory v cene |

**Za správy sa neplatí.** Telegram Bot API je zadarmo, platíte len server, na ktorom bot beží. To je praktický rozdiel oproti WhatsApp Business Platform, kde si Meta účtuje poplatky za správy, ktoré začína firma.

## Telegram, keď ho vaši zákazníci nepoužívajú

Na Slovensku používa Telegram menej ľudí než WhatsApp alebo Messenger, viac ho majú rusky a ukrajinsky hovoriaci zákazníci. Pre väčšinu firemných botov na tom nezáleží: bot slúži **vám a vášmu tímu**. Zákazník vyplní formulár alebo rezerváciu na webe ako vždy, Telegram nepotrebuje a o botovi ani nevie.

Ak má bot komunikovať priamo so zákazníkmi, treba si najprv overiť, či ich v Telegrame naozaj zastihnete. Pri rusky a ukrajinsky hovoriacej klientele zvyčajne áno.

## Kedy bota netreba

- **Dopytov je pár týždenne** a e-mail stačí. Bot zrýchli reakciu, ale pri malom objeme sa nevráti.
- **Proces nie je ustálený.** Bot automatizuje to, čo už funguje. Ak sa každý týždeň mení, čo sa s dopytom deje, najprv treba ujasniť postup.
- **Hľadáte náhradu za človeka v rozhovore so zákazníkom.** Na to je chatbot na webe, a aj ten má svoje limity, ktoré rozoberám v článku [chatbot pre firmu](/sk/blog/chatbot-dlya-biznesa/).

## Ako vývoj prebieha

1. **Krátky rozhovor**: čo dnes robíte rukami, koľko času to zaberie a kde sa údaje berú.
2. **Návrh a cena** vopred, bez prekvapení v priebehu.
3. **Vývoj v Pythone** a prepojenie s webom, kalendárom alebo databázou. Funguje aj s webom, ktorý som nerobil, ak je k nemu prístup.
4. **Spustenie a monitoring**: keď bot spadne, dozviem sa to skôr než vy.
5. **Šesť mesiacov podpory** v cene, potom úpravy po hodinách.

Bot beží na vašom serveri alebo na mojom, ako vám to vyhovuje.

## Ak treba pomôcť

Naprogramujem Telegram bota v Pythone na dopyty, rezervácie, inzeráty alebo upozornenia a prepojím ho s webom, ktorý už máte. Jednoduchší bot od 500€, úpravy 25€/hod. Robím aj weby, reklamu a analytiku. Registráciu firmy, účtovníctvo ani správu sociálnych sietí nerobím.

Na Slovensku žijem viac ako desať rokov, pracujem ako slovenské s.r.o. a vystavujem faktúru s IČO do vašich nákladov.

Detaily na [stránke služby „Telegram boty v Pythone“](/sk/service/telegram/). K téme: [chatbot pre firmu](/sk/blog/chatbot-dlya-biznesa/), [online rezervácia na webe](/sk/blog/online-rezervacia-na-webe/).

[CTA_FORM:audit]
