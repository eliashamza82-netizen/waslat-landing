# Waslat HR — Products Nav, HR Product Page & Arabic SEO Blog

**Date:** 2026-06-28
**Status:** Approved (design), Stage 1 in progress
**Repo:** `eliashamza82-netizen/waslat-landing` (static, bilingual, Vercel `cleanUrls:true`)

## Goal

Expand waslat.io from a single-product (social media management) marketing site into a
multi-product company by adding **Waslat HR** (وصلات للموارد البشرية) — a real, launched HR/payroll
SaaS — with a dedicated SEO-optimized product page, a Products navigation menu, and an Arabic-first
HR blog. Target market: **MENA, Saudi-Arabia-first**. Compete with Jisr (jisr.net) and ZenHR
(zenhr.com) on Arabic HR search.

## Competitive SEO findings (applied)

- **Beat both on technical SEO:** ZenHR has hreflang + 4 JSON-LD schema types (Organization,
  SoftwareApplication, FAQPage, BreadcrumbList). **Jisr has neither.** Waslat already does hreflang;
  we add full schema everywhere → ahead of both.
- **Primary Arabic head terms (HR page):** نظام الموارد البشرية · نظام إدارة شؤون الموظفين ·
  مسير الرواتب · نظام حضور وانصراف · نظام موارد بشرية في السعودية ·
  **نظام موارد بشرية متوافق مع نظام العمل السعودي** (compliance-modified, highest intent).
- **Saudi compliance keywords to weave in:** التأمينات الاجتماعية (GOSI) · نظام حماية الأجور (WPS) ·
  منصة مدد · منصة قوى (Qiwa) · مكافأة نهاية الخدمة · السعودة / نطاقات (Nitaqat) · مقيم · ZATCA.
- **Uncontested gaps (future stages):** comparison pages (أفضل نظام موارد بشرية 2026), free
  calculators (حاسبة مكافأة نهاية الخدمة، حاسبة نطاقات), Arabic-slug URLs, Article schema on posts.

## Architecture

Keep the existing static, **bilingual-inline** pattern: every page carries both languages as
`.en-only` / `.ar-only` spans; the `/ar/` twin sets `<html lang="ar" dir="rtl">` + `<body class="ar">`
so Arabic renders server-side without JS. New pages follow the exact head/SEO conventions already in
`index.html` (canonical, hreflang en/ar/x-default, OG, Twitter, JSON-LD).

### New files

| Page | EN | AR twin |
|---|---|---|
| Waslat HR product (bilingual) | `/hr.html` | `/ar/hr.html` |
| Blog index | `/blog.html` | `/ar/blog.html` |
| Articles (Arabic-first) | — | `/ar/blog/<slug>.html` |

Blog articles are **Arabic-first** (per decision). Article pages live under `/ar/blog/`; the EN
`/blog.html` index lists them and links across. hreflang on articles: `ar` self + `x-default` → ar
(no EN twin for article bodies in Stage 1).

## Navigation

### Header (all pages, EN+AR)
Add a **Products ▾** dropdown as the first nav item. CSS-only hover dropdown, tap-friendly on mobile.

- إدارة وسائل التواصل · Social Media Management → `/`
- نظام الموارد البشرية · HR Platform → `/hr.html`

Resulting top bar: **Products ▾ · Features · Pricing · Blog** (Platforms dropped from top bar; still
on home page). Reuse existing `--baby-blue`/`--text-secondary` tokens; dropdown panel uses the dark
surface style already used elsewhere.

### Footer (all pages, EN+AR)
Replace the flat `.foot-links` list with a light **3-column** layout:

- **Products / المنتجات:** Social Media Management, Waslat HR
- **Company / الشركة:** Contact, Docs, Support
- **Legal / القانونية:** Privacy, Terms
- plus Blog · المدونة link

Keep `.foot-logo`, `.foot-copy`, `.foot-powered` (Ecolor) unchanged.

## Waslat HR product page (`/hr.html` + `/ar/hr.html`)

Bilingual. Sections:

1. **Hero** — H1 `نظام موارد بشرية متكامل متوافق مع نظام العمل السعودي` / EN equivalent;
   subhead; CTAs → `https://app.waslat.io/register` (primary) + Book a Demo / `/contact`.
2. **Four feature blocks** (the real product):
   - الرواتب · Payroll — GOSI/التأمينات, WPS/حماية الأجور, مدد, مكافأة نهاية الخدمة, end-of-service.
   - الحضور والإجازات · Attendance & Leaves — حضور وانصراف, shift scheduling/المناوبات, biometric/البصمة, leave tracking.
   - الخدمة الذاتية للموظف · Employee Self-Service — portal, mobile, requests & approvals, documents.
   - التوظيف وإدارة الأداء · Recruitment & Performance — ATS/تتبع المتقدمين, onboarding/التهيئة, تقييم الأداء.
3. **Saudi compliance band** — Qiwa قوى, Mudad مدد, GOSI التأمينات, WPS حماية الأجور,
   نطاقات/السعودة, ZATCA — "متوافق 100% مع الأنظمة الحكومية السعودية".
4. **FAQ** (5–6 Q&A) → drives `FAQPage` schema (rich snippet eligible).
5. **CTA band** → register / demo.

### SEO per page
- `<title>` / meta description / H1 in Arabic-optimized form (AR page) + English (EN page).
- Canonical + hreflang en (`/hr.html`) / ar (`/ar/hr.html`) / x-default (`/hr.html`).
- JSON-LD: `SoftwareApplication` (Waslat HR) + `FAQPage` + `BreadcrumbList`.
- OG/Twitter tags; `og:locale` `ar_SA` on AR page.

## Blog

### Index (`/blog.html`, `/ar/blog.html`)
Card grid of articles with title, excerpt, category tag. `BreadcrumbList` schema. Links to articles.
AR index is primary; EN index lists same Arabic articles (labeled) + links to AR.

### Stage 1 articles (Arabic, `/ar/blog/<slug>.html`)
Each: H1, intro, structured H2/H3 body citing real Saudi labor-law specifics, FAQ, internal link to
`/ar/hr.html`. Schema: `Article` (or `BlogPosting`) + `BreadcrumbList` + `FAQPage` where applicable.
hreflang ar + x-default→ar. ~1000–1500+ Arabic words each, genuinely useful (not thin).

1. **`end-of-service-gratuity`** — `مكافأة نهاية الخدمة في نظام العمل السعودي: طريقة الحساب 2026`
   (calculation rules: <5y = ½ month/yr, ≥5y = 1 month/yr, resignation tiers, examples).
2. **`gosi-wps-guide`** — `دليل التأمينات الاجتماعية (GOSI) ونظام حماية الأجور (WPS) للشركات السعودية`
   (contribution rates, Mudad, employer obligations, penalties).
3. **`best-hr-systems-saudi-2026`** — `أفضل أنظمة الموارد البشرية في السعودية 2026: دليل الاختيار`
   (selection criteria; high commercial intent; funnels to Waslat HR).

## Technical SEO housekeeping
- Add all new URLs to `sitemap.xml` with hreflang alternates.
- `robots.txt` already allows crawl; confirm no blocks on `/blog/`.
- Cross-link: home/footer ↔ HR page ↔ blog ↔ articles ↔ HR page.

## Out of scope (later stages)
15–20+ more articles; UAE/Egypt country pages; HR sub-feature pages; free calculators; comparison
pages; HR glossary. Each later stage = its own batch.

## Stage 1 acceptance
- Products dropdown + 3-col footer live on **all** existing pages (EN + AR), no layout regressions.
- `/hr.html` + `/ar/hr.html` render correctly (LTR/RTL), valid schema, CTAs work.
- `/blog.html` + `/ar/blog.html` + 3 articles render; internal links resolve; sitemap updated.
