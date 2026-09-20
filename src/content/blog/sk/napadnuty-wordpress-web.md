---
title: 'Napadnutý WordPress: ako spoznať, že vás hacklo, a čo robiť hneď'
description: >-
  Web presmerúva na kasíno, Google varuje pred návštevou, v administrácii je
  cudzí správca. Čo urobiť v prvej hodine, v akom poradí web vyčistiť, ako
  zavrieť dieru a kedy sa už neoplatí látať, ale postaviť web nanovo.
date: '2026-09-12'
updated: '2026-09-14'
key: 'hacked-wordpress'
faq:
  - q: 'Ako zistím, že je môj WordPress napadnutý?'
    a: 'Najčastejšie príznaky: návštevníci z mobilu končia na kasíne alebo lekárni, Google pri výsledku upozorňuje, že web môže byť napadnutý, vo vyhľadávaní pri príkaze site:vasadomena.sk vidíte stránky v japončine alebo so spamom, v administrácii pribudol neznámy správca. Majiteľ si to všimne posledný, lebo škodlivý kód sa prihláseným správcom často neukazuje.'
  - q: 'Stačí nainštalovať bezpečnostný plugin, aby web vyčistil?'
    a: 'Nie. Skener nájde známe vzory škodlivého kódu, ale nie dieru, ktorou sa útočník dostal dnu, a často ani zadné dvierka v databáze či v priečinku s obrázkami. Bez zavretia diery je web o pár dní napadnutý znova.'
  - q: 'Musím napadnutie niekomu hlásiť?'
    a: 'Ak sa útočník mohol dostať k osobným údajom, napríklad k správam z formulárov alebo k zákazníkom e-shopu, a pre ľudí z toho vzniká riziko, GDPR ukladá oznámiť porušenie Úradu na ochranu osobných údajov SR do 72 hodín od zistenia. Právne posúdenie nerobím, ale pomôžem zistiť, k čomu sa útočník reálne dostal.'
  - q: 'Koľko stojí vyčistenie napadnutého webu?'
    a: 'Hodinová sadzba 35 eur. Vyčistenie s nájdením a zavretím diery trvá zvyčajne niekoľko hodín, presný odhad poviem po diagnostike, ešte pred prácou. Ak sa rovnaké napadnutie vráti cez tú istú dieru, riešim to bez ďalšej faktúry.'
  - q: 'Oplatí sa napadnutý WordPress čistiť, alebo postaviť nový web?'
    a: 'Jednorazové napadnutie udržiavaného webu sa oplatí vyčistiť. Ak je to druhé napadnutie za rok, web stojí na pirátskej téme alebo na desiatkach pluginov, ktoré nikto neaktualizuje, lacnejšie je postaviť web nanovo na modernom stacku, kde verejná administrácia ani pluginy nie sú.'
---
![Napadnutý WordPress: ako spoznať, že vás hacklo | White Eagles & Co.](/assets/blog/napadnuty-wordpress.webp)

# Napadnutý WordPress: ako spoznať, že vás hacklo, a čo robiť hneď

Zvyčajne to začína telefonátom od zákazníka: „Kliknul som na váš web a skončil som na kasíne." Vy si web otvoríte na počítači a všetko je v poriadku. Nie je. Škodlivý kód na napadnutých WordPress weboch býva nastavený tak, aby sa neukazoval prihlásenému správcovi ani návštevníkovi, ktorý príde priamo, a presmerúval iba ľudí z vyhľadávania a z mobilu.

Nižšie je postup na prvú hodinu, poradie čistenia, ktoré naozaj funguje, a poctivá odpoveď na otázku, kedy už web nemá zmysel látať.

[CTA_FORM:bugfix]

## Príznaky: podľa čoho spoznáte napadnutie

Stačí jeden z nich, aby ste konali hneď:

- **Presmerovanie na cudzí web**, najmä z mobilu alebo po kliknutí vo výsledkoch Googlu. Vyskúšajte to z telefónu cez mobilné dáta, nie z počítača, kde ste prihlásení.
- **Upozornenie od Googlu.** Pri výsledku vyhľadávania sa objaví poznámka, že web môže byť napadnutý, alebo Chrome ukáže červenú výstražnú obrazovku.
- **Stránky, ktoré ste nikdy nevytvorili.** Do vyhľadávania napíšte `site:vasadomena.sk`. Ak uvidíte stovky stránok v japončine, s liekmi alebo kasínom, ide o takzvaný japonský spam, jedno z najrozšírenejších napadnutí.
- **Neznámy správca** v zozname používateľov WordPressu.
- **Hosting pozastavil účet** alebo píše, že z vášho priestoru odchádza spam.
- **Search Console**, sekcia Zabezpečenie a ručné akcie: ak tam je hlásenie o bezpečnostnom probléme, Google už napadnutie potvrdil.

## Prvá hodina: čo urobiť a čo nerobiť

**Urobte:**

1. **Kópiu aktuálneho stavu** súborov aj databázy, ešte pred akoukoľvek zmenou. Je to dôkaz, podľa ktorého sa hľadá, kadiaľ útočník prišiel. Vymazaním si túto stopu zničíte.
2. **Zmeňte všetky heslá:** hosting, FTP alebo SFTP, databáza, všetci správcovia WordPressu a e-mail, na ktorý chodí obnova hesla.
3. **Odstráňte neznámych správcov** a skontrolujte práva ostatných účtov.
4. **Ak web posiela návštevníkov na podvodné stránky, zatvorte ho** stránkou údržby. Chránite zákazníkov aj meno firmy. Deň bez webu je lacnejší než týždeň, keď ľudí posielate na podvod.
5. **Napíšte hostingu.** Mávajú prístupové logy, z ktorých je vidieť, kedy a odkiaľ sa útok stal.
6. **Ak sú na webe formuláre alebo e-shop,** zistite, či sa útočník mohol dostať k osobným údajom. Pri riziku pre ľudí platí oznamovacia povinnosť do 72 hodín, viac v článku [GDPR pre malú firmu](/sk/blog/gdpr-dlya-maloy-firmy/).

**Nerobte:**

- **Neobnovujte naslepo poslednú zálohu** a nepovažujte vec za vybavenú. Záloha už môže obsahovať zadné dvierka a diera, cez ktorú útočník prišiel, zostáva otvorená.
- **Neinštalujte tri bezpečnostné pluginy naraz.** Pridáte cudzí kód a pocit istoty, dieru nezavriete.
- **Nečakajte, že to prejde.** Google napadnutý web v priebehu dní vyradí z výsledkov a reklamy naň prestane zobrazovať.

## Ako sa útočník dostal dnu

Na WordPresse sú to takmer vždy tie isté cesty:

- **Neaktualizovaný plugin alebo téma** so známou zraniteľnosťou. Autor vydá opravu, zraniteľnosť sa zverejní a automatické skripty ešte v ten týždeň prechádzajú internet a hľadajú weby, ktoré neaktualizovali.
- **Pirátska „nulled" téma alebo plugin.** Platená téma zadarmo zo zdieľacej stránky má zadné dvierka priamo v sebe. Tu nepomôže ani aktualizácia.
- **Opustený plugin**, ktorý autor prestal vyvíjať. Zraniteľnosť v ňom už nikto neopraví.
- **Slabé alebo opakované heslo** bez dvojfaktorového overenia.
- **Iný web na tom istom hostingovom účte**, napríklad zabudnutá testovacia kópia `stary.vasadomena.sk`. Útočník vojde cez ňu a dostane sa ku všetkému vedľa.

Z toho plynie hlavné pravidlo: **samotné vyčistenie bez nájdenia diery nemá zmysel.** Web bude čistý do najbližšieho prechodu robota.

## Čistenie v správnom poradí

Poradie je dôležité, lebo škodlivý kód sa obnovuje z miest, na ktoré sa pri rýchlom čistení zabúda:

1. **Jadro WordPressu** porovnajte s oficiálnou verziou. Príkaz `wp core verify-checksums` cez WP-CLI ukáže každý zmenený súbor. Najistejšie je jadro celé preinštalovať.
2. **Pluginy a témy** nahraďte čistými kópiami z oficiálnych zdrojov. Nepoužívané zmažte, pirátske bez diskusie.
3. **Priečinok `wp-content/uploads`**: nesmie v ňom byť žiadny PHP súbor. Ak tam je, je cudzí.
4. **Súbory `wp-config.php`, `.htaccess` a priečinok `mu-plugins`**: sem sa presmerovania a zadné dvierka ukladajú najradšej.
5. **Databáza**: tabuľka s nastaveniami (adresa webu, zoznam aktívnych pluginov), používatelia, vložené skripty v obsahu článkov a naplánované úlohy.
6. **Nové bezpečnostné kľúče** vo `wp-config.php`. Odhlásia všetkých, aj útočníka s ukradnutou reláciou.
7. **Aktualizácie, dvojfaktorové overenie a obmedzenie pokusov o prihlásenie.**
8. **Search Console**: v sekcii Zabezpečenie a ručné akcie požiadajte o opätovnú kontrolu. Stránky, ktoré vytvoril útočník, musia vracať 404 alebo 410, a pošlite znova sitemap.

Ako rozpoznať ostatné poruchy, ktoré s napadnutím nesúvisia, píšem v článku [oprava WordPress stránky](/sk/blog/oprava-wordpress-stranky/).

[CTA_FORM:audit]

## Koľko stojí, keď sa nerobí nič

Napadnutie nie je technická drobnosť, ktorá môže počkať do budúceho mesiaca:

- **Návštevnosť z Googlu padá**, kým upozornenie pri výsledku visí. A zmizne až po opätovnej kontrole.
- **Reklama sa zastaví.** Google Ads nezobrazuje reklamy, ktoré vedú na napadnuté weby, a platíte za kampaň, ktorá nebeží.
- **E-maily končia v spame.** Ak sa zo servera rozposielal spam, doména sa ocitne na čiernych listinách a s ňou aj vaše faktúry a ponuky.
- **Dôvera.** Zákazník, ktorého ste poslali na podvodnú stránku, sa už nevráti.

## Kedy už nečistiť, ale postaviť web nanovo

Poviem to na rovinu: WordPress s pluginmi od dvadsiatich rôznych autorov je technológia, ktorej údržba je trvalý náklad, a napadnutie je len účet za vynechanú údržbu. Jednorazové napadnutie udržiavaného webu sa oplatí vyčistiť. Látanie prestáva dávať zmysel, keď:

- je to **druhé napadnutie za rok**;
- web stojí na **pirátskej téme** alebo na **page builderi s tridsiatimi pluginmi**, z ktorých polovicu už nikto nevyvíja;
- pluginy vyžadujú **starú verziu PHP** a pri aktualizácii sa web rozpadne;
- **nikto nebude web mesačne aktualizovať**, a teda o rok ste tu znova.

Vtedy je lacnejšie postaviť web nanovo na modernom stacku. Napríklad web generovaný vopred cez Next.js nemá na verejnej adrese prihlasovaciu stránku, nemá databázu, do ktorej by sa dalo zapísať, a nemá pluginy od cudzích autorov. Žiadny web nie je nenapadnuteľný, ale útočná plocha je zlomok toho, čo má bežný WordPress. Takto beží aj tento web: bez databázy a administrácie na verejnej adrese, s odpoveďou servera za približne 0,09 sekundy.

Porovnanie oboch prístupov je v článku [WordPress alebo web na mieru](/sk/blog/wordpress-vs-custom-website/), reálne ceny nového webu v článku [koľko stojí web na Slovensku](/sk/blog/website-cost-2026/).

## Ako sa napadnutiu vyhnúť, kým web ešte beží

Ak web zatiaľ nahradiť nechcete, minimum je jasné: aktualizácie raz mesačne, zálohy mimo servera s vyskúšaným obnovením, dvojfaktorové overenie pre všetkých správcov a zmazanie všetkého nepoužívaného. Čo presne patrí do údržby a koľko to stojí, rozoberám v článku [správa a údržba WordPress webu](/sk/blog/sprava-a-udrzba-wordpress-webu/).

## Ak potrebujete pomoc

Čistím napadnuté weby vrátane nájdenia a zavretia diery, cez ktorú útočník prišiel, a vybavím opätovnú kontrolu v Search Console. **Hodinová sadzba 35€**, diagnostiku robím zvyčajne v deň nahlásenia a odhad poviem ešte pred prácou. Hosting za vás neprevádzkujem a právne poradenstvo ku GDPR neposkytujem. Moja časť je web, jeho vyčistenie a zabezpečenie.

Nové weby staviam na modernom stacku, bez pluginov a bez verejnej administrácie. Na Slovensku žijem viac ako desať rokov, spustil som **12+ webov pre slovenské firmy** a pracujem ako slovenské s.r.o. s faktúrou, ktorú si dáte do nákladov.

Detaily na [stránke služby „Oprava webstránky a WordPress webu"](/sk/service/bugfix/). Ak chcete najprv vedieť, čo s webom je, [bezplatný audit](/sk/seo-audit/) s výsledkom do 3 pracovných dní.

[CTA_FORM:webdev]
