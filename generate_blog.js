const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'src', 'content', 'blog');

const locales = ['sk', 'en', 'ru'];

// Create directories
locales.forEach(locale => {
  const dir = path.join(contentDir, locale);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const articles = [
  {
    slug: 'website-cost-2026',
    date: '2026-05-13',
    sk: {
      title: 'Koľko stojí tvorba webstránky v roku 2026?',
      description: 'Kompletný prehľad cien za tvorbu webstránok. Zistite, koľko stojí jednoduchý web, firemná stránka a e-shop na Slovensku.',
      content: `
# Koľko stojí tvorba webstránky v roku 2026?

Jednou z najčastejších otázok, s ktorými sa klienti obracajú na našu agentúru, je: **"Koľko ma bude stáť nový web?"** Odpoveď nie je jednoduchá, pretože závisí od mnohých faktorov. V tomto článku vám poskytneme transparentný prehľad cien za tvorbu webstránok na Slovensku v roku 2026.

## Prečo sa ceny tak líšia?

Cena webstránky sa skladá z viacerých položiek. Nie je to len "napísanie kódu". Kvalitný web vyžaduje:
- Analýzu konkurencie a návrh štruktúry (UX/UI)
- Vytvorenie unikátneho dizajnu
- Samotné programovanie (Front-end a Back-end)
- Základnú SEO optimalizáciu
- Testovanie a nasadenie na server

Keď vám niekto ponúkne web za 100€, s najväčšou pravdepodobnosťou použije hotovú šablónu na WordPresse, ktorú len mierne upraví. Ak hľadáte skutočné výsledky, oplatí sa investovať do riešenia na mieru.

[CTA_FORM]

## Typy webstránok a ich orientačné ceny

### 1. Jednoduchá prezentačná stránka (Landing Page)
Cena: **od 500€ do 1 000€**
Ideálne pre začínajúcich podnikateľov, remeselníkov alebo propagáciu konkrétnej služby. Zvyčajne ide o jednu dlhú stránku s kontaktným formulárom.

### 2. Firemný viacstránkový web
Cena: **od 1 200€ do 3 500€**
Vhodné pre zabehnuté firmy. Obsahuje stránky ako "O nás", "Služby", "Cenník", "Blog" a "Kontakt". Tieto weby majú vlastný dizajn, optimalizáciu pre mobily a pokročilé SEO nastavenia.

### 3. E-shop (Internetový obchod)
Cena: **od 2 500€ do 10 000€+**
Najkomplexnejšie riešenie. Cena závisí od počtu produktov, platobných brán, napojenia na skladové systémy a ERP softvér.

## Skryté poplatky: Na čo si dať pozor?

Pri výbere dodávateľa si vždy skontrolujte, čo všetko cena obsahuje. Často sa zabúda na:
- **Doména a webhosting:** ~50€ až 150€ ročne.
- **Správa a údržba:** Pravidelné aktualizácie systému a zabezpečenia (cca 50€ - 200€ mesačne).
- **Tvorba obsahu (Copywriting):** Kto napíše texty? Profesionálny textár stojí od 20€ do 50€ za normostranu.

## Zhrnutie

Webstránka je vaša pobočka na internete, ktorá pracuje 24/7. Kvalitný web vám prinesie nových klientov a vráti investíciu v priebehu niekoľkých mesiacov. V agentúre White Eagles ku každému projektu pristupujeme individuálne a ponúkame aj 6-mesačnú technickú podporu zdarma.`
    },
    en: {
      title: 'How much does a website cost in 2026?',
      description: 'A complete overview of website development costs. Find out how much a simple landing page, corporate site, and e-commerce platform cost.',
      content: `
# How much does a website cost in 2026?

One of the most common questions clients ask our agency is: **"How much will my new website cost?"** The answer isn't simple because it depends on many factors. In this article, we'll provide a transparent overview of website development prices.

## Why do prices vary so much?

The cost of a website is made up of several components. It's not just "writing code". A high-quality website requires:
- Competitor analysis and structure design (UX/UI)
- Creation of a unique design
- The actual programming (Front-end and Back-end)
- Basic SEO optimization
- Testing and server deployment

When someone offers you a website for €100, they are most likely using a pre-made WordPress template that they will only slightly modify. If you're looking for real results, it's worth investing in a custom solution.

[CTA_FORM]

## Types of websites and their approximate prices

### 1. Simple Landing Page
Price: **from €500 to €1,000**
Ideal for starting entrepreneurs, freelancers, or promoting a specific service. It is usually one long page with a contact form.

### 2. Corporate Multi-page Website
Price: **from €1,200 to €3,500**
Suitable for established companies. It includes pages like "About Us", "Services", "Pricing", "Blog", and "Contact". These sites have custom designs, mobile optimization, and advanced SEO settings.

### 3. E-shop (E-commerce Platform)
Price: **from €2,500 to €10,000+**
The most complex solution. The price depends on the number of products, payment gateways, connection to warehouse systems, and ERP software.

## Hidden fees: What to watch out for?

When choosing a supplier, always check what the price includes. Often forgotten are:
- **Domain and web hosting:** ~€50 to €150 annually.
- **Management and maintenance:** Regular system and security updates (approx. €50 - €200 monthly).
- **Content creation (Copywriting):** Who will write the texts? A professional copywriter costs money.

## Summary

A website is your internet branch that works 24/7. A quality website will bring you new clients and return the investment within a few months. At White Eagles, we approach each project individually and also offer 6 months of free technical support.`
    },
    ru: {
      title: 'Сколько стоит создание сайта в 2026 году?',
      description: 'Полный обзор цен на разработку сайтов. Узнайте стоимость лендинга, корпоративного сайта и интернет-магазина.',
      content: `
# Сколько стоит создание сайта в 2026 году?

Один из самых частых вопросов, с которым клиенты обращаются в наше агентство: **"Сколько будет стоить мой новый сайт?"** Ответ не прост, так как зависит от множества факторов. В этой статье мы дадим прозрачный обзор цен на разработку сайтов.

## Почему цены так сильно отличаются?

Стоимость сайта складывается из множества элементов. Это не просто "написание кода". Качественный сайт требует:
- Анализа конкурентов и проектирования структуры (UX/UI)
- Создания уникального дизайна
- Самого программирования (Front-end и Back-end)
- Базовой SEO оптимизации
- Тестирования и запуска на сервере

Когда кто-то предлагает вам сайт за 100€, скорее всего, он использует готовый шаблон на WordPress с минимальными правками. Если вы ищете реальные результаты, стоит инвестировать в индивидуальное решение.

[CTA_FORM]

## Типы сайтов и их примерная стоимость

### 1. Простой Landing Page (Одностраничник)
Цена: **от 500€ до 1 000€**
Идеально подходит для начинающих предпринимателей, фрилансеров или продвижения конкретной услуги. Обычно это одна длинная страница с контактной формой.

### 2. Корпоративный многостраничный сайт
Цена: **от 1 200€ до 3 500€**
Подходит для устоявшихся компаний. Включает страницы "О нас", "Услуги", "Цены", "Блог" и "Контакты". Такие сайты имеют индивидуальный дизайн, мобильную адаптацию и продвинутые SEO настройки.

### 3. Интернет-магазин (E-commerce)
Цена: **от 2 500€ до 10 000€+**
Самое сложное решение. Цена зависит от количества товаров, платежных систем, интеграции со складскими программами и ERP.

## Скрытые расходы: на что обратить внимание?

При выборе подрядчика всегда проверяйте, что именно включено в стоимость. Часто забывают о:
- **Домен и хостинг:** ~50€ - 150€ в год.
- **Поддержка и обслуживание:** Регулярные обновления безопасности (около 50€ - 200€ в месяц).
- **Создание контента (Копирайтинг):** Кто напишет тексты? Профессиональный копирайтер стоит денег.

## Итог

Сайт — это ваш филиал в интернете, работающий 24/7. Качественный ресурс принесет новых клиентов и окупит вложения за пару месяцев. В агентстве White Eagles мы подходим к каждому проекту индивидуально и дарим 6 месяцев бесплатной технической поддержки.`
    }
  },
  {
    slug: 'wordpress-vs-custom-website',
    date: '2026-05-12',
    sk: {
      title: 'WordPress vs Vlastný web (Custom): Čo je lepšie?',
      description: 'Porovnanie WordPressu a riešení na mieru. Zistite, ktorá technológia je vhodnejšia pre váš biznis z hľadiska rýchlosti, SEO a bezpečnosti.',
      content: `
# WordPress vs Vlastný web: Čo je lepšie?

Pri plánovaní nového webu sa pravdepodobne stretnete s otázkou: "Máme použiť WordPress, alebo si nechať naprogramovať web na mieru (Custom)?" Obe riešenia majú svoje pre a proti. V tomto článku si ich podrobne porovnáme.

## WordPress: Výhody a nevýhody

WordPress poháňa viac ako 40% všetkých webov na svete. Je to obrovský CMS (Content Management System) systém.

**Výhody:**
- **Nižšia počiatočná cena:** Vďaka hotovým témam a pluginom je vývoj rýchlejší.
- **Jednoduchá správa obsahu:** Klient si vie sám upravovať texty a pridávať články bez znalosti kódu.
- **Obrovská komunita:** Na každý problém pravdepodobne existuje plugin.

**Nevýhody:**
- **Pomalšie načítavanie:** Prebytok kódu a pluginov spomaľuje web, čo škodí SEO.
- **Bezpečnostné riziká:** Keďže je tak populárny, je častým terčom hackerov. Vyžaduje neustále aktualizácie.
- **Skryté náklady:** Veľa dobrých pluginov funguje na báze mesačného predplatného.

[CTA_FORM]

## Web na mieru (React, Next.js, vlastné riešenia)

Programovanie od nuly pomocou moderných frameworkov ako React alebo Next.js.

**Výhody:**
- **Extrémna rýchlosť:** Web obsahuje len ten kód, ktorý naozaj potrebuje. Načítava sa bleskovo.
- **Maximálna bezpečnosť:** Žiadne deravé pluginy tretích strán. Útoky sú oveľa ťažšie.
- **Dokonalé SEO:** Plná kontrola nad technickým SEO a Core Web Vitals.
- **Unikátny dizajn a funkcie:** Nie ste obmedzený šablónou. Možnosť vytvoriť akúkoľvek funkcionalitu.

**Nevýhody:**
- **Vyššia cena:** Vývoj trvá dlhšie a vyžaduje senior programátorov.
- **Závislosť na programátorovi:** Veľké zmeny musí robiť developer (aj keď moderné headless CMS to čiastočne riešia).

## Čo si vybrať?

Ak ste malá firma s napätým rozpočtom a potrebujete obyčajný blog, **WordPress** je skvelá voľba.

Ak ale budujete stredne veľkú až veľkú firmu, e-shop, portál alebo webovú aplikáciu, kde záleží na každej stotine sekundy, bezpečnosti a unikátnosti, jednoznačne zvoľte **web na mieru**. V agentúre White Eagles sa špecializujeme práve na moderné bezpečné riešenia v Next.js.`
    },
    en: {
      title: 'WordPress vs Custom Website: Which is better?',
      description: 'A comparison between WordPress and custom-coded websites. Find out which technology is better for your business.',
      content: `
# WordPress vs Custom Website: Which is better?

When planning a new website, you'll likely face the question: "Should we use WordPress, or get a custom-coded website?" Both solutions have their pros and cons. In this article, we'll compare them in detail.

## WordPress: Pros and Cons

WordPress powers over 40% of all websites globally. It's a massive CMS (Content Management System).

**Pros:**
- **Lower initial cost:** Thanks to pre-made themes and plugins, development is faster.
- **Easy content management:** Clients can edit texts and add articles without coding knowledge.
- **Huge community:** There's likely a plugin for every problem.

**Cons:**
- **Slower loading times:** Bloated code and too many plugins slow down the site, hurting SEO.
- **Security risks:** Because it's so popular, it's a frequent target for hackers. It requires constant updates.
- **Hidden costs:** Many good plugins require monthly subscriptions.

[CTA_FORM]

## Custom Website (React, Next.js, Custom Solutions)

Programming from scratch using modern frameworks like React or Next.js.

**Pros:**
- **Extreme speed:** The website only contains the code it actually needs. It loads lightning fast.
- **Maximum security:** No vulnerable third-party plugins. Attacks are much harder.
- **Perfect SEO:** Full control over technical SEO and Core Web Vitals.
- **Unique design and features:** You are not limited by a template.

**Cons:**
- **Higher price:** Development takes longer and requires senior programmers.
- **Dependence on a developer:** Major changes must be done by a developer (though modern headless CMS solves this partially).

## What to choose?

If you are a small business with a tight budget and just need a simple blog, **WordPress** is a great choice.

However, if you are building a medium-to-large company, e-shop, portal, or web application where every millisecond, security, and uniqueness matters, definitely choose a **custom website**. At White Eagles, we specialize precisely in modern, secure solutions using Next.js.`
    },
    ru: {
      title: 'WordPress или Самописный сайт: Что выбрать?',
      description: 'Сравнение WordPress и сайтов на заказ. Узнайте, какая технология лучше подходит для вашего бизнеса.',
      content: `
# WordPress или Самописный сайт: Что выбрать?

При планировании нового сайта вы наверняка зададитесь вопросом: "Использовать WordPress или заказать самописный сайт?" У обоих решений есть свои плюсы и минусы. Давайте разберем их подробно.

## WordPress: Плюсы и минусы

WordPress обслуживает более 40% всех сайтов в мире. Это огромная CMS.

**Плюсы:**
- **Более низкая начальная цена:** Благодаря готовым темам и плагинам разработка идет быстрее.
- **Простое управление контентом:** Клиент может сам редактировать тексты и добавлять статьи.
- **Огромное комьюнити:** Практически для любой задачи есть плагин.

**Минусы:**
- **Медленная загрузка:** Избыток кода и плагинов замедляет сайт, что вредит SEO.
- **Уязвимости безопасности:** Из-за популярности это частая цель хакеров. Требуются постоянные обновления.
- **Скрытые расходы:** Многие хорошие плагины работают по подписке.

[CTA_FORM]

## Самописный сайт (React, Next.js)

Программирование с нуля с использованием современных фреймворков.

**Плюсы:**
- **Экстремальная скорость:** Сайт содержит только нужный код и загружается мгновенно.
- **Максимальная безопасность:** Нет дырявых сторонних плагинов. Взломать такой сайт крайне сложно.
- **Идеальное SEO:** Полный контроль над техническим SEO и Core Web Vitals.
- **Уникальный дизайн и функции:** Вы не ограничены шаблоном.

**Минусы:**
- **Более высокая цена:** Разработка занимает больше времени и требует сеньор-программистов.
- **Зависимость от разработчика:** Крупные изменения должен делать программист.

## Что выбрать?

Если вы малый бизнес со скромным бюджетом и вам нужен простой сайт-визитка, **WordPress** — отличный выбор.

Но если вы строите средний или крупный бизнес, портал или веб-приложение, где важна каждая доля секунды, безопасность и уникальность — однозначно выбирайте **самописный сайт**. В агентстве White Eagles мы специализируемся именно на современных быстрых решениях на Next.js.`
    }
  },
  {
    slug: 'nastavenie-google-analytics-4',
    date: '2026-05-11',
    sk: {
      title: 'Ako správne nastaviť Google Analytics 4 (GA4)',
      description: 'Kompletný návod na prechod a správne nastavenie Google Analytics 4 pre meranie konverzií a návštevnosti v roku 2026.',
      content: `
# Ako správne nastaviť Google Analytics 4 (GA4)

Starý Universal Analytics (UA) definitívne skončil a všetky firmy museli prejsť na **Google Analytics 4 (GA4)**. Mnohí majitelia webov sa s novým rozhraním stále trápia a nevedia, kde nájdu svoje dáta. V tomto článku vám ukážeme, ako GA4 správne nastaviť, aby vám prinášal hodnotné informácie.

## Krok 1: Vytvorenie a prepojenie účtu

Ak ste to ešte neurobili, musíte si v Google Analytics vytvoriť nové vlastníctvo (Property) typu GA4. 
Najlepším spôsobom, ako GA4 prepojiť s vaším webom, nie je priame vloženie kódu do hlavičky webu, ale použitie **Google Tag Manager (GTM)**. GTM vám umožní spravovať všetky meracie kódy z jedného miesta bez nutnosti zasahovať do kódu webu zakaždým, keď chcete niečo zmerať.

[CTA_FORM]

## Krok 2: Odstránenie internej návštevnosti

Jedna z najväčších chýb, ktorú vidíme u klientov pri auditoch, je tá, že ich analytika meria aj ich vlastné návštevy.
1. V GA4 prejdite do *Admin > Data Streams > Configure tag settings*.
2. Kliknite na *Show all* a zvoľte *Define internal traffic*.
3. Pridajte svoju IP adresu (a IP adresy vašich zamestnancov).
4. Následne prejdite do *Data Settings > Data Filters* a aktivujte filter pre internú návštevnosť.

## Krok 3: Nastavenie udalostí (Events) a konverzií

GA4 je založený výlučne na udalostiach (Events). Kým starý UA meral "relácie" a "zobrazenia stránok", GA4 meria všetko ako udalosť.
Dôležité udalosti, ktoré by ste mali merať cez GTM:
- **Odoslanie formulára (generate_lead)**
- **Kliknutie na telefónne číslo (click_phone)**
- **Kliknutie na e-mail (click_email)**
- **Pridanie do košíka (add_to_cart)** - ak máte e-shop

Tieto udalosti potom v GA4 jednoducho označte prepínačom ako **Konverzie (Conversions)**.

## Krok 4: Predĺženie uchovávania údajov (Data Retention)

V predvolenom nastavení GA4 uchováva podrobné dáta o používateľoch len 2 mesiace. Pre medziročné porovnávania je to málo. 
Prejdite do *Admin > Data Settings > Data Retention* a zmeňte hodnotu z 2 mesiacov na **14 mesiacov**.

## Profesionálna analytika

Nastavenie analytiky je kritické pre vyhodnocovanie vašich marketingových kampaní. Ak do reklamy sypete peniaze bez správneho merania, strieľate naslepo. Agentúra White Eagles vám rada nastaví komplexnú analytiku vrátane Server-Side Trackingu pre obchádzanie ad-blockerov.`
    },
    en: {
      title: 'How to correctly set up Google Analytics 4 (GA4)',
      description: 'A complete guide to transitioning and correctly setting up Google Analytics 4 for conversion tracking in 2026.',
      content: `
# How to correctly set up Google Analytics 4 (GA4)

The old Universal Analytics (UA) is officially dead, and all companies had to transition to **Google Analytics 4 (GA4)**. Many website owners still struggle with the new interface. In this article, we'll show you how to set up GA4 correctly to get valuable insights.

## Step 1: Creation and Integration

If you haven't already, create a new GA4 Property. 
The best way to integrate GA4 is not by pasting the code directly into your website's header, but by using **Google Tag Manager (GTM)**. GTM allows you to manage all tracking codes from one place.

[CTA_FORM]

## Step 2: Excluding Internal Traffic

A major mistake we see during audits is clients measuring their own visits.
1. In GA4, go to *Admin > Data Streams > Configure tag settings*.
2. Click *Show all* and choose *Define internal traffic*.
3. Add your IP address.
4. Go to *Data Settings > Data Filters* and activate the filter.

## Step 3: Events and Conversions

GA4 is entirely event-based. Important events you should track via GTM:
- **Form submission (generate_lead)**
- **Phone number click (click_phone)**
- **Email click (click_email)**

Mark these events as **Conversions** in the GA4 dashboard.

## Step 4: Data Retention

By default, GA4 retains detailed user data for only 2 months. Change this to **14 months** under *Admin > Data Settings > Data Retention*.

## Professional Analytics

Proper analytics setup is critical for evaluating your marketing campaigns. White Eagles agency can set up comprehensive analytics for you, including Server-Side Tracking.`
    },
    ru: {
      title: 'Как правильно настроить Google Analytics 4 (GA4)',
      description: 'Подробное руководство по переходу и правильной настройке Google Analytics 4 для отслеживания конверсий в 2026 году.',
      content: `
# Как правильно настроить Google Analytics 4 (GA4)

Старый Universal Analytics окончательно отключен, и все компании перешли на **Google Analytics 4 (GA4)**. Многие до сих пор путаются в новом интерфейсе. В этой статье мы покажем, как правильно настроить GA4.

## Шаг 1: Создание и интеграция

Лучший способ интеграции GA4 — это использование **Google Tag Manager (GTM)**, а не прямое встраивание кода на сайт. GTM позволяет управлять всеми скриптами в одном месте.

[CTA_FORM]

## Шаг 2: Исключение внутреннего трафика

Одна из частых ошибок — когда вы собираете данные о собственных посещениях.
1. В GA4 перейдите в *Admin > Data Streams > Configure tag settings*.
2. Нажмите *Show all* и выберите *Define internal traffic*.
3. Добавьте свой IP-адрес.
4. В разделе *Data Settings > Data Filters* активируйте этот фильтр.

## Шаг 3: Настройка событий и конверсий

GA4 работает исключительно на событиях (Events). Важные события, которые нужно настроить:
- **Отправка формы (generate_lead)**
- **Клик по телефону (click_phone)**
- **Добавление в корзину (add_to_cart)**

После этого в интерфейсе GA4 просто отметьте нужные события ползунком как **Конверсии (Conversions)**.

## Шаг 4: Срок хранения данных

По умолчанию GA4 хранит детальные данные пользователей всего 2 месяца. Перейдите в *Admin > Data Settings > Data Retention* и измените значение на **14 месяцев**.

## Профессиональная аналитика

Если вы вкладываете деньги в рекламу без правильной аналитики, вы работаете вслепую. Агентство White Eagles поможет вам настроить продвинутую аналитику, включая Server-Side Tracking для обхода блокировщиков рекламы.`
    }
  },
  {
    slug: 'cookie-lista-2026-povinnosti',
    date: '2026-05-10',
    sk: {
      title: 'Cookie lišta v roku 2026: Povinnosti a Consent Mode V2',
      description: 'Zistite, aké sú aktuálne zákonné povinnosti pre Cookie lišty na Slovensku a čo znamená zavedenie Google Consent Mode V2 pre váš web.',
      content: `
# Cookie lišta v roku 2026: Povinnosti a Consent Mode V2

Pojem "Cookie lišta" vyvoláva u mnohých majiteľov webstránok bolesť hlavy. Legislatíva sa neustále sprísňuje a navyše od marca 2024 spoločnosť Google zaviedla povinný **Consent Mode V2**. Ak ho nemáte nasadený správne, prichádzate o cenné dáta a Google vám môže zablokovať remarketing.

## Aké sú zákonné požiadavky na Cookie lištu?

Zákon o elektronických komunikáciách (a smernica GDPR) hovorí jasne. Na vašom webe musí lišta spĺňať tieto kritériá:
- **Žiadne predškrtnuté políčka:** Políčka pre analytické a marketingové cookies musia byť v predvolenom stave nezaškrtnuté (OFF).
- **Rovnocenné tlačidlá:** Tlačidlo "Odmietnuť všetko" musí byť rovnako viditeľné a prístupné ako tlačidlo "Prijať všetko". Nesmiete používateľov nútiť prijať cookies tým, že možnosť odmietnutia schováte pod zložité nastavenia.
- **Blokovanie skriptov pred súhlasom:** Váš web nesmie spustiť Google Analytics ani Google Ads pixely PREDTÝM, než používateľ klikne na "Prijať". Toto je najčastejšia chyba na 90% slovenských webov.

[CTA_FORM]

## Čo je Google Consent Mode V2?

Consent Mode V2 je mechanizmus od Google, ktorý zabezpečuje, že sa rešpektuje voľba návštevníka. Ak používateľ odmietne cookies, GTM a GA4 nedostanú povolenie zapísať cookie do jeho prehliadača, ale odošlú len anonymný "ping" o zobrazení stránky (tzv. cookieless tracking).

Vďaka tomu nestratíte informáciu o tom, koľko ľudí celkovo navštívilo váš web, ale zároveň rešpektujete ich súkromie. Consent Mode V2 zaviedol nové parametre: \`ad_user_data\` a \`ad_personalization\`. Ak tieto parametre nie sú nastavené, Google Ads vám neumožní vytvárať publiká na remarketing.

## Ako na implementáciu bez drahých pluginov?

Mnohé firmy platia mesačné poplatky (od 10€ do 50€) za rôzne WordPress moduly na správu cookies (napr. Cookiebot). Naša agentúra White Eagles implementuje pre klientov vlastné, plne legálne a Consent Mode V2 kompatibilné lišty priamo do kódu cez GTM – jednorazovo a bez akýchkoľvek mesačných poplatkov. Ak si nie ste istí, či váš web spĺňa zákony, radi vám vypracujeme technický audit.`
    },
    en: {
      title: 'Cookie banner in 2026: Obligations and Consent Mode V2',
      description: 'Find out the current legal requirements for Cookie banners and what Google Consent Mode V2 means for your website.',
      content: `
# Cookie banner in 2026: Obligations and Consent Mode V2

The term "Cookie banner" causes headaches for many website owners. Legislation is becoming stricter, and since March 2024, Google introduced the mandatory **Consent Mode V2**. If you don't have it set up correctly, you lose valuable data and Google might block your remarketing.

## What are the legal requirements?

GDPR directives are clear. Your banner must meet these criteria:
- **No pre-checked boxes:** Analytical and marketing cookies must be OFF by default.
- **Equal buttons:** The "Reject All" button must be just as visible as "Accept All".
- **Blocking scripts before consent:** Your site must not launch Google Analytics or Ads pixels BEFORE the user clicks "Accept".

[CTA_FORM]

## What is Google Consent Mode V2?

Consent Mode V2 ensures the visitor's choice is respected. If a user rejects cookies, Google tags won't write cookies but will send an anonymous "ping" (cookieless tracking).
Consent Mode V2 introduced new parameters. If not set, Google Ads won't allow you to create remarketing audiences.

## Implementation without expensive plugins

Many companies pay monthly fees for WordPress cookie modules. Our agency White Eagles implements fully legal, Consent Mode V2 compatible banners directly into the code via GTM – as a one-time setup with no monthly fees.`
    },
    ru: {
      title: 'Cookie баннер в 2026 году: Правила и Consent Mode V2',
      description: 'Узнайте актуальные юридические требования к Cookie баннерам и что означает введение Google Consent Mode V2 для вашего сайта.',
      content: `
# Cookie баннер в 2026 году: Правила и Consent Mode V2

Законодательство в сфере данных постоянно ужесточается, а с марта 2024 года Google ввел обязательный **Consent Mode V2**. Если он не настроен, вы теряете данные, а Google заблокирует ваш ремаркетинг.

## Законные требования к баннеру

GDPR говорит четко. Ваш баннер должен соответствовать критериям:
- **Никаких заранее отмеченных галочек:** Аналитические и маркетинговые cookies должны быть выключены по умолчанию.
- **Равноценные кнопки:** Кнопка "Отклонить всё" должна быть такой же заметной, как "Принять всё".
- **Блокировка скриптов до согласия:** Сайт не должен запускать Google Analytics до того, как пользователь нажмет "Принять". Это самая частая ошибка.

[CTA_FORM]

## Что такое Google Consent Mode V2?

Consent Mode V2 — это механизм Google, уважающий выбор посетителя. Если пользователь отказывается от cookies, системы отправляют только анонимный "пинг" (cookieless tracking).
Если параметры Consent Mode V2 не настроены, Google Ads запретит вам собирать аудитории для ремаркетинга.

## Внедрение без дорогих плагинов

Многие компании платят абонентскую плату за плагины управления cookies на WordPress (например, Cookiebot). Агентство White Eagles внедряет легальные, совместимые с Consent Mode V2 баннеры напрямую в код через GTM — единоразово и без абонентских плат.`
    }
  }
];

articles.forEach(article => {
  locales.forEach(locale => {
    const fileName = article.slug + '.md';
    const filePath = path.join(contentDir, locale, fileName);
    
    const localizedData = article[locale];
    
    const fileContent = '---\ntitle: "' + localizedData.title + '"\ndescription: "' + localizedData.description + '"\ndate: "' + article.date + '"\n---\n\n' + localizedData.content + '\n';

    fs.writeFileSync(filePath, fileContent);
  });
});

console.log('✅ Generated 12 markdown articles successfully!');
