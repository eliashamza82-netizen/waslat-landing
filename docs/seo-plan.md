# Waslat.io — SEO Plan to Rank in MENA / Saudi Arabia

**Date:** 2026-06-28
**Market:** MENA, Saudi-Arabia-first. Arabic-first content, bilingual (AR/EN).
**Site:** Static bilingual site on Vercel (`cleanUrls:true`). Product suite of 14 modules.
**Goal:** Rank Waslat for high-intent Arabic commercial keywords across all product lines and
build topical authority as an all-in-one Saudi business platform (CRM, WhatsApp API, HR,
accounting, POS, projects, marketing, AI agents, …).

---

## 0. Where we already win (technical foundation — keep it)

We are already ahead of most local competitors on technical SEO. Maintain these on **every** page:

- Clean URLs (`/crm`, not `/crm.html`) — canonical, hreflang, sitemap and internal links all use them.
- `hreflang` `en` / `ar` / `x-default` on every page + AR twin under `/ar/`.
- JSON-LD on every page: `SoftwareApplication` + `BreadcrumbList` + `FAQPage` (Article/Blog on posts).
- Open Graph + Twitter cards, `og:locale ar_SA` on AR pages.
- `sitemap.xml` with `xhtml:link` alternates; `robots.txt` allows crawl.
- Server-rendered Arabic (no JS needed) — AR twin sets `lang="ar" dir="rtl"`.

**Gap to close (quick wins, Section 5):** site-wide `Organization` schema, `WebSite` + `SearchAction`,
`llms.txt`, deeper internal linking, and an `ItemList` of products on the home page.

---

## 1. Keyword strategy (Arabic-first, by product)

Primary head term per product = the AR page H1 / `<title>`. Each gets 4–8 supporting long-tails woven
into features, FAQ and the blog cluster. All terms are Saudi-dialect/MSA commercial-intent.

| Product (slug) | Primary AR head term | High-intent supporting terms |
|---|---|---|
| HR (`/hr`) | نظام موارد بشرية | مسير الرواتب · نظام حضور وانصراف · نظام موارد بشرية متوافق مع نظام العمل السعودي · GOSI · WPS · مدد · قوى |
| WhatsApp (`/whatsapp`) | واتساب بيزنس API | الواتساب API · حساب واتساب الأعمال · رسائل جماعية واتساب · شات بوت واتساب · العلامة الخضراء |
| Social (`/social`) | إدارة وسائل التواصل الاجتماعي | جدولة المنشورات · أداة إدارة السوشيال ميديا · تحليلات السوشيال ميديا |
| CRM (`/crm`) | نظام إدارة علاقات العملاء | برنامج CRM · أفضل نظام CRM في السعودية · إدارة العملاء · CRM عربي |
| Opportunities (`/opportunities`) | إدارة الفرص والصفقات | خط أنابيب المبيعات (sales pipeline) · متابعة الصفقات · إدارة المبيعات |
| POS (`/pos`) | نظام نقاط البيع | كاشير · نظام كاشير متوافق مع الفاتورة الإلكترونية · POS السعودية · ZATCA |
| Accounting (`/accounting`) | نظام محاسبة | برنامج محاسبة · الفاتورة الإلكترونية · فوترة · متوافق مع هيئة الزكاة والضريبة (ZATCA) |
| Projects (`/projects`) | إدارة المشاريع | برنامج إدارة المشاريع · إدارة المهام · تتبع المشاريع · لوحة كانبان |
| Operations (`/operations`) | إدارة العمليات | أتمتة العمليات · سير العمل · إدارة سير العمل |
| Booking (`/booking`) | نظام حجز المواعيد | نظام حجوزات · حجز المواعيد أونلاين · التقويم والمواعيد |
| Marketing (`/marketing`) | أتمتة التسويق | حملات تسويقية · التسويق عبر الرسائل · marketing automation |
| Automation (`/automation`) | أتمتة الأعمال | سير العمل الآلي · workflow automation · ربط التطبيقات |
| AI Agents (`/ai-agents`) | وكلاء الذكاء الاصطناعي | شات بوت ذكاء اصطناعي · مساعد ذكي للأعمال · AI agents |

**Branded:** وصلات · waslat · منصة وصلات — own these completely (home + Organization schema + GBP).

### Keyword tiers
- **Tier 1 (commercial, buy-now):** "نظام …" / "برنامج …" / "أفضل … في السعودية 2026". Target with product pages + comparison pages.
- **Tier 2 (problem-aware):** "كيف أحسب مكافأة نهاية الخدمة"، "ما هو الواتساب API". Target with blog articles → funnel to product.
- **Tier 3 (tools):** free calculators ("حاسبة مكافأة نهاية الخدمة"، "حاسبة الضريبة"). Lead magnets, strong backlink bait.

---

## 2. Site architecture & internal linking (topical authority)

Build a **hub-and-spoke** per product so Google sees clusters, not orphan pages:

```
Home (/)  ──▶  Product page (hub, e.g. /crm)
                  ├─▶ Blog cluster articles (spokes) ──▶ link back to /crm
                  ├─▶ Comparison page (/crm vs <competitor>) ──▶ /crm
                  └─▶ Related products (cross-links: /crm ↔ /opportunities ↔ /whatsapp)
```

Rules:
1. Every product page links to **3–4 related products** ("works with") — distributes link equity.
2. Every blog article links to its **parent product page** with an exact-match Arabic anchor.
3. Home page lists **all products** (with `ItemList` schema) → every product is ≤1 click from home.
4. Footer carries the full product list (already grouped) on every page.
5. Mega-menu in the header exposes all 14 products site-wide.

---

## 3. Content / blog plan (the engine that ranks)

Arabic-first articles, 1,000–1,800 words, genuinely useful, each with `Article` + `FAQPage` schema and
an internal link to its product hub. **Cadence: 2 articles/week.** Publish in clusters so each product
hub gets 3–5 supporting spokes within its first month.

**Existing (9):** 3 HR · 3 Social · 3 WhatsApp. Keep, and interlink to the new hubs.

**Next clusters (priority order — highest commercial intent first):**

1. **CRM / Sales:** "أفضل نظام CRM في السعودية 2026" · "ما هو نظام CRM ولماذا تحتاجه" · "كيف تبني خط أنابيب مبيعات" · "CRM مقابل جداول Excel".
2. **Accounting / ZATCA:** "دليل الفاتورة الإلكترونية في السعودية 2026" · "أفضل برنامج محاسبة للشركات الصغيرة" · "متطلبات هيئة الزكاة والضريبة للفوترة".
3. **POS:** "أفضل نظام كاشير في السعودية" · "نظام نقاط بيع متوافق مع الفاتورة الإلكترونية".
4. **Projects/Operations:** "أفضل برنامج إدارة مشاريع" · "ما هي أتمتة سير العمل".
5. **Booking/Marketing/AI:** "أفضل نظام حجز مواعيد" · "أتمتة التسويق للشركات" · "كيف تستخدم وكلاء الذكاء الاصطناعي في خدمة العملاء".

**Comparison pages (high commercial intent, low competition in Arabic):**
"وصلات مقابل <منافس>" for each major category (HR vs Jisr/ZenHR, WhatsApp vs Wati/Unifonic,
Accounting vs Qoyod/Wafeq, CRM vs Zoho/HubSpot). These convert and earn links.

**Free tools (lead magnets + link bait):**
حاسبة مكافأة نهاية الخدمة · حاسبة نطاقات · حاسبة ضريبة القيمة المضافة · حاسبة تكلفة الموظف.
These rank fast, attract backlinks, and capture Tier-3 traffic.

---

## 4. On-page checklist (apply to every product page)

- [ ] `<title>` ≤ 60 chars, AR head term first on AR page, brand suffix `| وصلات`.
- [ ] Meta description ≤ 155 chars, includes head term + 1 benefit + CTA.
- [ ] One `<h1>` containing the primary AR head term (AR page) / EN term (EN page).
- [ ] H2/H3 use supporting long-tails naturally (feature titles, FAQ questions).
- [ ] 6 FAQs → `FAQPage` schema (rich-result eligible).
- [ ] Canonical + hreflang en/ar/x-default; `og:locale ar_SA` on AR.
- [ ] `SoftwareApplication` + `BreadcrumbList` JSON-LD with correct `url`.
- [ ] 3–4 internal links to related products + 1–2 to blog cluster.
- [ ] Descriptive `alt` text; logo `loading="eager"`, below-fold images `loading="lazy"`.
- [ ] Added to `sitemap.xml` (both EN + AR loc with alternates).

---

## 5. Quick technical wins (do now)

1. **`Organization` schema** site-wide (home) — name وصلات/Waslat, logo, sameAs (social profiles), contactPoint. Establishes brand entity.
2. **`WebSite` + `SearchAction`** schema on home — sitelinks search box eligibility.
3. **`ItemList`/product list** schema on home enumerating all 14 products.
4. **`llms.txt`** at root — AI-crawler roadmap (AEO) pointing to products + blog.
5. **Internal-link sweep** — add "related products" row to every product page.
6. **Image/OG** — ship a real `og-image.png` (1200×630) per product (or branded default).
7. **Performance** — fonts already `preconnect`ed; keep CSS inline, defer non-critical JS (chat widget already `type=module`).

---

## 6. Off-page & local (Saudi/MENA)

- **Google Business Profile** (Saudi address) — ranks برنامد/branded + maps; collect reviews.
- **Local citations / directories:** Saudi & Gulf B2B SaaS directories, Maroof (معروف) registration → trust signal.
- **Backlinks:** guest posts on Saudi business/HR/tech blogs; PR via Ecolor network; link bait = the free calculators.
- **Social signals:** publish AR content on LinkedIn/X/Instagram/TikTok linking back (we sell social mgmt — dogfood it).
- **App stores:** if the mobile app is listed, link site ↔ store (brand + reviews).

---

## 7. Measurement & cadence

- **Google Search Console** — verify domain, submit `sitemap.xml`, monitor AR query impressions/positions, fix coverage errors. (Highest-priority setup task.)
- **Bing Webmaster Tools** — submit sitemap (cheap extra reach).
- **Analytics** — track conversions (register / book demo) per landing page.
- **Monthly review:** rank tracking for the Section-1 head terms (Saudi locale, Arabic); double down on pages reaching positions 5–15 (striking distance) with more internal links + content depth.

### 90-day roadmap
- **Days 1–14:** Ship all product pages + mega-menu + sitemap. Set up GSC/Bing, submit sitemap. Quick wins (Section 5).
- **Days 15–45:** Publish CRM + Accounting + POS blog clusters (Tier-1 commercial). Ship 2–3 comparison pages. Launch first free calculator.
- **Days 46–90:** Remaining clusters + comparison pages + 2 more calculators. Start backlink outreach. Review GSC, optimize striking-distance pages.

---

## 8. Out of scope (later)
Country-specific pages (UAE/Egypt/Kuwait variants), programmatic glossary, video/SEO YouTube,
sub-feature landing pages per module. Each becomes its own stage once the core suite ranks.
